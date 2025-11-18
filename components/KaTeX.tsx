'use client'

import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface KaTeXProps {
  children: string
  block?: boolean
}

export default function KaTeX({ children, block = false }: KaTeXProps) {
  // Remove the $ delimiters if present
  const math = children.replace(/^\$+|\$+$/g, '')
  
  return block ? (
    <BlockMath math={math} />
  ) : (
    <InlineMath math={math} />
  )
}
