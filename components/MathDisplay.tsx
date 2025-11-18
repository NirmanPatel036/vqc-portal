"use client"

import React, { useEffect, useRef } from 'react'

interface MathDisplayProps {
  expression: string
  className?: string
  displayMode?: boolean
}

export default function MathDisplay({ expression, className = "", displayMode = true }: MathDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadKaTeX = async () => {
      if (!containerRef.current) return
      
      try {
        // Dynamically import KaTeX
        const katex = await import('katex')
        
        // Clean the LaTeX expression for better compatibility
        const cleanExpression = expression
          .replace(/·/g, '\\cdot ')  // Convert · to \cdot
          .replace(/√/g, '\\sqrt')   // Convert √ to \sqrt
        
        // Render the math expression
        katex.render(cleanExpression, containerRef.current, {
          displayMode: displayMode,
          throwOnError: false,
          colorIsTextColor: true,
          strict: false,
          trust: true,
          macros: {
            "\\R": "\\mathbb{R}",
            "\\C": "\\mathbb{C}",
            "\\N": "\\mathbb{N}",
            "\\Z": "\\mathbb{Z}",
          }
        })
        
        // Apply custom styling for yellow color
        if (containerRef.current) {
          containerRef.current.style.color = '#fbbf24' // yellow-400
          
          // Custom KaTeX styling for the theme
          const katexElements = containerRef.current.querySelectorAll('.katex')
          katexElements.forEach(el => {
            (el as HTMLElement).style.color = '#fbbf24'
          })
        }
        
      } catch (error) {
        // Fallback to displaying raw LaTeX if KaTeX fails
        console.warn('KaTeX failed to load, showing raw LaTeX:', error)
        if (containerRef.current) {
          containerRef.current.innerHTML = `<code class="text-yellow-300 font-mono text-center">${expression}</code>`
        }
      }
    }

    loadKaTeX()
  }, [expression, displayMode])

  return (
    <div 
      ref={containerRef} 
      className={`math-display flex justify-center items-center ${className}`}
      style={{ color: '#fbbf24' }} // yellow-400 color as fallback
    />
  )
}