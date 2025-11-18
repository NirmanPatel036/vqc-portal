'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Bot, Send } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface Message {
  role: 'user' | 'model'
  content: string
  isStreaming?: boolean
}

// Function to parse markdown-style formatting to HTML (avoiding $ symbols which are for math)
const parseMarkdown = (text: string) => {
  let parsed = text
  
  // Code blocks first: ```code```
  parsed = parsed.replace(/```([^`]+)```/g, '<code class="block bg-zinc-700 px-2 py-1 rounded text-yellow-300 my-1 font-mono text-sm whitespace-pre-wrap">$1</code>')
  
  // Bold: **text** - must match across newlines using [\s\S] instead of . with s flag
  parsed = parsed.replace(/\*\*([\s\S]+?)\*\*/g, '<strong class="font-bold">$1</strong>')
  parsed = parsed.replace(/(__([\s\S]+?)__)/g, '<strong class="font-bold">$2</strong>')
  
  // Bullet lists: * item or - item (do this AFTER bold so ** doesn't interfere)
  parsed = parsed.replace(/^[\*\-]\s+/gm, '• ')
  
  // Italic: *text* (single * only, not part of **)
  parsed = parsed.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>')
  
  // Inline code: `code` - but SKIP if it contains $ (which means it's math notation that should be rendered)
  parsed = parsed.replace(/`([^`]+)`/g, (match, content) => {
    // If the content has dollar signs, don't convert to code tag - it's math that will be rendered
    if (content.includes('$')) {
      return match; // Return original backtick text unchanged
    }
    return `<code class="bg-zinc-700 px-1.5 py-0.5 rounded text-yellow-300 font-mono text-xs">${content}</code>`;
  })
  
  // Line breaks
  parsed = parsed.replace(/\n/g, '<br />')
  
  return parsed
}

// Function to render text with LaTeX math and HTML formatting
const renderMathContent = (text: string) => {
  const parts: React.ReactNode[] = []
  let currentIndex = 0
  let key = 0

  // First, remove backticks that wrap math expressions (like `$...$` or `$$...$$`)
  let cleanedText = text.replace(/`(\$\$?[^`]+\$\$?)`/g, '$1')
  
  // IMPORTANT: Apply bold formatting BEFORE extracting math, so ** works across the whole text
  // Bold: **text**
  cleanedText = cleanedText.replace(/\*\*([\s\S]*?)\*\*/g, '<strong class="font-bold">$1</strong>')
  cleanedText = cleanedText.replace(/__([\s\S]*?)__/g, '<strong class="font-bold">$1</strong>')
  
  // Headings: #, ##, ###, ####
  cleanedText = cleanedText.replace(/^####\s+(.+)$/gm, '<h4 class="text-xs font-bold mt-2 mb-1">$1</h4>')
  cleanedText = cleanedText.replace(/^###\s+(.+)$/gm, '<h3 class="text-sm font-bold mt-3 mb-1">$1</h3>')
  cleanedText = cleanedText.replace(/^##\s+(.+)$/gm, '<h2 class="text-base font-bold mt-3 mb-2">$1</h2>')
  cleanedText = cleanedText.replace(/^#\s+(.+)$/gm, '<h1 class="text-lg font-bold mt-4 mb-2">$1</h1>')
  
  // Bullet lists: * item or - item
  cleanedText = cleanedText.replace(/^[\*\-]\s+/gm, '• ')
  
  // Italic: *text* (single * only)
  cleanedText = cleanedText.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>')

  // Extract math expressions and their positions (prioritize $$ over $)
  const mathExpressions: Array<{ start: number; end: number; content: string; isBlock: boolean }> = []
  
  // Extract block math first ($$...$$)
  const blockMathRegex = /\$\$([^$]+)\$\$/g
  let match: RegExpExecArray | null
  
  while ((match = blockMathRegex.exec(cleanedText)) !== null) {
    mathExpressions.push({
      start: match.index,
      end: match.index + match[0].length,
      content: match[1],
      isBlock: true
    })
  }
  
  // Then extract inline math ($...$), avoiding already matched block math regions
  const inlineMathRegex = /\$([^$\n]+)\$/g
  let inlineMatch: RegExpExecArray | null
  while ((inlineMatch = inlineMathRegex.exec(cleanedText)) !== null) {
    // Check if this match is within a block math expression
    const isInsideBlockMath = mathExpressions.some(
      expr => expr.isBlock && inlineMatch!.index >= expr.start && inlineMatch!.index < expr.end
    )
    
    if (!isInsideBlockMath) {
      mathExpressions.push({
        start: inlineMatch.index,
        end: inlineMatch.index + inlineMatch[0].length,
        content: inlineMatch[1],
        isBlock: false
      })
    }
  }
  
  // Sort by start position
  mathExpressions.sort((a, b) => a.start - b.start)

  // Process text between math expressions
  mathExpressions.forEach((mathExpr) => {
    // Add text before this math expression
    if (mathExpr.start > currentIndex) {
      const textContent = cleanedText.substring(currentIndex, mathExpr.start)
      // Apply remaining formatting (code blocks, inline code, line breaks)
      let formatted = textContent
      formatted = formatted.replace(/```([^`]+)```/g, '<code class="block bg-zinc-700 px-2 py-1 rounded text-yellow-300 my-1 font-mono text-sm whitespace-pre-wrap">$1</code>')
      formatted = formatted.replace(/`([^`]+)`/g, (match, content) => {
        if (content.includes('$')) return match
        return `<code class="bg-zinc-700 px-1.5 py-0.5 rounded text-yellow-300 font-mono text-xs">${content}</code>`
      })
      formatted = formatted.replace(/\n/g, '<br />')
      
      parts.push(
        <span
          key={`text-${key++}`}
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      )
    }

    // Add math expression
    if (mathExpr.isBlock) {
      parts.push(
        <span key={`math-${key++}`} className="block my-2">
          <BlockMath math={mathExpr.content} />
        </span>
      )
    } else {
      parts.push(
        <span key={`math-${key++}`}>
          <InlineMath math={mathExpr.content} />
        </span>
      )
    }

    currentIndex = mathExpr.end
  })

  // Add remaining text
  if (currentIndex < cleanedText.length) {
    const textContent = cleanedText.substring(currentIndex)
    // Apply remaining formatting (code blocks, inline code, line breaks)
    let formatted = textContent
    formatted = formatted.replace(/```([^`]+)```/g, '<code class="block bg-zinc-700 px-2 py-1 rounded text-yellow-300 my-1 font-mono text-sm whitespace-pre-wrap">$1</code>')
    formatted = formatted.replace(/`([^`]+)`/g, (match, content) => {
      if (content.includes('$')) return match
      return `<code class="bg-zinc-700 px-1.5 py-0.5 rounded text-yellow-300 font-mono text-xs">${content}</code>`
    })
    formatted = formatted.replace(/\n/g, '<br />')
    
    parts.push(
      <span
        key={`text-${key++}`}
        dangerouslySetInnerHTML={{ __html: formatted }}
      />
    )
  }

  return parts.length > 0 ? parts : text
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content:
        "Hello! I'm your QC Assistant. Ask me anything about quantum computing or QML!",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, isLoading])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    const userInput = input
    setInput('')
    setIsLoading(true)

    try {
      // Call backend Gemini API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from QC Assistant')
      }

      const data = await response.json()
      const fullResponse = data.response
      
      // Create streaming bot response
      const botMessageIndex = messages.length + 1
      setIsLoading(false)
      
      // Add empty message that will be filled with streaming effect
      setMessages((prev) => [...prev, { role: 'model', content: '', isStreaming: true }])
      
      // Stream the response character by character
      let currentContent = ''
      const words = fullResponse.split(' ')
      
      for (let i = 0; i < words.length; i++) {
        currentContent += (i > 0 ? ' ' : '') + words[i]
        
        setMessages((prev) => {
          const newMessages = [...prev]
          newMessages[botMessageIndex] = {
            role: 'model',
            content: currentContent,
            isStreaming: i < words.length - 1
          }
          return newMessages
        })
        
        // Delay between words for streaming effect
        await new Promise(resolve => setTimeout(resolve, 30))
      }
      
    } catch (error) {
      console.error('Chat error:', error)
      setIsLoading(false)
      const errorResponse: Message = {
        role: 'model',
        content: 'Sorry, I encountered an error. Please make sure the backend is running and try again.',
      }
      setMessages((prev) => [...prev, errorResponse])
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Backdrop overlay to close chat on click outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-35"
          onClick={() => setIsOpen(false)}
          aria-label="Close chat overlay"
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-6 w-96 h-[500px] z-40 bg-zinc-950 border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300 flex flex-col">
          {/* Header */}
          <CardHeader className="border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Bot className="text-yellow-400" size={20} />
              <CardTitle className="text-white text-lg">Qisper AI</CardTitle>
            </div>
          </CardHeader>

          {/* Messages Area */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea ref={scrollAreaRef} className="h-full p-4">
              <div className="space-y-4 pr-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg overflow-hidden ${
                        msg.role === 'user'
                          ? 'bg-yellow-400 text-black text-xs'
                          : 'bg-zinc-800 text-zinc-100 text-xs'
                      }`}
                    >
                      <div className="leading-relaxed select-text cursor-text wrap-break-word overflow-x-auto">
                        {renderMathContent(msg.content)}
                        {msg.isStreaming && (
                          <span className="inline-block w-1.5 h-3 bg-yellow-400 ml-0.5 animate-pulse" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 text-zinc-100 px-3 py-2 rounded-lg">
                      <p className="text-xs animate-pulse">Thinking...</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Input Area */}
          <CardContent className="border-t border-zinc-800 p-3 mt-auto">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask me out 😛..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSend()
                }}
                disabled={isLoading}
                className="flex-1 bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-yellow-400 hover:bg-yellow-500 text-black"
                size="icon"
              >
                <Send size={18} />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
