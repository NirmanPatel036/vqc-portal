'use client'

import React, { useState, useEffect } from 'react'
import { X, Sparkles } from 'lucide-react'

export default function ChatbotIntroPopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show popup after a short delay every time
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <>
      {/* Backdrop with fade animation */}
      <div 
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Popup pointing to chatbot button (bottom-right) */}
      <div
        className={`fixed bottom-24 right-6 z-50 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="relative bg-white/80 backdrop-blur-lg text-black rounded-lg shadow-2xl p-4 pr-12 max-w-xs border-2 border-white/40">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 hover:bg-black/10 rounded-full p-1 transition-colors"
            aria-label="Close popup"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 mt-1 shrink-0" />
            <div>
              <h3 className="font-bold text-base mb-1">Hey there! 👋</h3>
              <p className="text-sm leading-relaxed">
                I'm <span className="font-bold">Qisper</span>, your AI assistant for your silly or serious doubts!
              </p>
            </div>
          </div>

          {/* Arrow pointing down to chatbot button */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white/80 backdrop-blur-lg rotate-45 border-r-2 border-b-2 border-white/40" />
        </div>
      </div>
    </>
  )
}
