'use client'

import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface MathTextProps {
  children: string
}

export default function MathText({ children }: MathTextProps) {
  // Split text by $ delimiters to find inline math
  const parts = children.split(/(\$[^$]+\$)/g)
  
  return (
    <span>
      {parts.map((part, idx) => {
        // Check if this part is math (enclosed in $)
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1)
          return <InlineMath key={idx} math={math} />
        }
        return <span key={idx}>{part}</span>
      })}
    </span>
  )
}
