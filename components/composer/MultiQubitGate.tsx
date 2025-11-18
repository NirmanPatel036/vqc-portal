'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

interface MultiQubitGateProps {
  gate: {
    id: string
    name: string
    position: number
    qubits: number[]
  }
  onShowGateInfo?: (gateName: string) => void
  onDeleteGate?: (gateId: string) => void
}

const MultiQubitGate = ({ gate, onShowGateInfo, onDeleteGate }: MultiQubitGateProps) => {
  const minWire = Math.min(...gate.qubits)
  const maxWire = Math.max(...gate.qubits)
  
  // Each wire: h-12 (48px) + space-y-2 (8px between) = 56px total per wire
  const wireRowHeight = 56
  const wireCenterOffset = 24 // Center of wire (half of 48px)
  
  // Calculate the absolute position for the entire gate group
  const containerPadding = 16 // p-4 on parent CardContent
  const topPosition = minWire * wireRowHeight + wireCenterOffset + containerPadding
  const labelWidth = 64 // w-12 (48px) + pr-4 (16px)
  const leftPosition = labelWidth + gate.position + containerPadding

  // Determine colors based on gate type
  const lineColor = gate.name === 'CNOT' ? 'bg-blue-400' : 'bg-purple-400'
  const controlColor = gate.name === 'CNOT' ? 'bg-blue-400 border-blue-600' : 'bg-purple-400 border-purple-600'
  const targetColor = gate.name === 'CNOT' ? 'bg-blue-500 border-blue-700' : 'bg-purple-500 border-purple-700'

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="absolute cursor-pointer"
          style={{
            left: `${leftPosition}px`,
            top: `${topPosition}px`,
            width: '32px', // w-8 to match gate width
            height: `${(maxWire - minWire) * wireRowHeight}px`,
          }}
        >
          {/* Vertical connecting line */}
          <div
            className={`absolute ${lineColor}`}
            style={{
              left: '50%',
              top: 0,
              width: '2px',
              height: '100%',
              transform: 'translateX(-50%)',
              zIndex: 0,
            }}
          />
          
          {/* Render markers for each qubit */}
          {gate.qubits.map((qubitIndex, idx) => {
            const isTarget = idx === gate.qubits.length - 1
            const relativeTop = (qubitIndex - minWire) * wireRowHeight
            
            if (isTarget) {
              // Target marker (larger circle with ⊕)
              return (
                <div
                  key={qubitIndex}
                  className={`absolute w-8 h-8 ${targetColor} border-2 rounded-full flex items-center justify-center text-white font-bold text-lg`}
                  style={{
                    left: '50%',
                    top: `${relativeTop}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                >
                  ⊕
                </div>
              )
            } else {
              // Control marker (small filled circle)
              return (
                <div
                  key={qubitIndex}
                  className={`absolute w-3 h-3 ${controlColor} border-2 rounded-full`}
                  style={{
                    left: '50%',
                    top: `${relativeTop}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                />
              )
            }
          })}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-40 bg-gray-800 border-gray-700 text-white">
        <div className="grid gap-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start bg-gray-700 hover:bg-gray-600" 
            onClick={() => onShowGateInfo?.(gate.name)}
          >
            Show Info
          </Button>
          <Button 
            variant="destructive" 
            className="w-full justify-start" 
            onClick={() => onDeleteGate?.(gate.id)}
          >
            Delete Gate
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default MultiQubitGate
