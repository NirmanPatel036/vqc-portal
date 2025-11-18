'use client'

import { GATE_INFO } from '@/lib/composer/gates'

interface Gate {
  id: string
  name: string
  position: number
  qubits?: number[]
}

interface PlacedGateProps {
  gate: Gate
}

const PlacedGate = ({ gate }: PlacedGateProps) => {
  // Handle control points for multi-qubit gates
  if (gate.name === 'CONTROL') {
    return (
      <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-blue-600 relative z-10" />
    )
  }

  // Handle CNOT target
  if (gate.name === 'CNOT') {
    return (
      <div className="w-8 h-8 bg-blue-500 border-2 border-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10">
        ⊕
      </div>
    )
  }

  // Handle CCNOT (Toffoli) target
  if (gate.name === 'CCNOT') {
    return (
      <div className="w-8 h-8 bg-purple-500 border-2 border-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10">
        ⊕
      </div>
    )
  }

  // Handle Measurement
  if (gate.name === 'M') {
    return (
      <div className="min-w-12 h-8 px-1 bg-green-500 border-2 border-white flex items-center justify-center text-white font-bold text-[10px] relative z-10 whitespace-nowrap">
        M
      </div>
    )
  }

  // Regular single-qubit gates
  const gateInfo = GATE_INFO[gate.name]
  if (!gateInfo) return null

  // Display label - use gateInfo.name if it contains brackets (for parametric gates), otherwise use gate.name
  const displayLabel = gateInfo.name.includes('[') ? gateInfo.name : gate.name

  return (
    <div
      className={`min-w-12 h-8 px-1 flex items-center justify-center text-[10px] font-bold rounded-none cursor-pointer border-2 relative z-10 whitespace-nowrap ${gateInfo.color}`}
    >
      {displayLabel}
    </div>
  )
}

export default PlacedGate
