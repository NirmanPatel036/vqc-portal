'use client'

import { useDrop } from 'react-dnd'
import PlacedGate from '@/components/composer/PlacedGate'
import { useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

import { GATE_INFO } from '@/lib/composer/gates'

interface Gate {
  id: string
  name: string
  position: number
  qubits?: number[]
}

interface QubitWireProps {
  qubitIndex: number
  gates: Gate[]
  onDropGate: (qubitIndex: number, gateName: string, position: number) => void
  onDeleteGate: (qubitIndex: number, gateId: string) => void
  onShowGateInfo: (gateName: string) => void
  isHighlighted?: boolean
  onGateHover?: (gateId: string | null) => void
  onDragHover?: (state: { wire: number; gateSize: number } | null) => void
}

const QubitWire = ({ 
  qubitIndex, 
  gates, 
  onDropGate, 
  onDeleteGate, 
  onShowGateInfo, 
  isHighlighted, 
  onGateHover,
  onDragHover
}: QubitWireProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isOver, draggedItem }, drop] = useDrop(() => ({
    accept: 'GATE',
    drop: (item: { name: string; size: number }, monitor) => {
      const offset = monitor.getClientOffset()
      const wireRect = ref.current?.getBoundingClientRect()
      if (offset && wireRect) {
        const position = offset.x - wireRect.left
        onDropGate(qubitIndex, item.name, position)
      }
      if (onDragHover) {
        onDragHover(null)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      draggedItem: monitor.getItem() as { name: string; size: number } | null,
    }),
    hover: (item: { name: string; size: number }, monitor) => {
      if (onDragHover && item.size > 1 && monitor.isOver({ shallow: true })) {
        const gateInfo = GATE_INFO[item.name]
        if (gateInfo) {
          onDragHover({ wire: qubitIndex, gateSize: gateInfo.size })
        }
      }
    },
  }))

  drop(ref)

  // Reset drag hover state when drag leaves
  const handleDragLeave = () => {
    if (onDragHover && !isOver) {
      onDragHover(null)
    }
  }

  const getBaseGateId = (gateId: string) => {
    // Extract base ID for multi-qubit gates (e.g., "CNOT-123456-0" -> "CNOT-123456")
    const parts = gateId.split('-')
    if (parts.length >= 2) {
      return `${parts[0]}-${parts[1]}`
    }
    return gateId
  }

  return (
    <div className="relative h-12 flex items-center">
      <span className="w-12 text-yellow-400 font-mono text-sm pr-4">q[{qubitIndex}]</span>
      <div
        ref={ref}
        className="relative flex-1 h-full"
        style={{ backgroundColor: isHighlighted ? 'rgba(255, 255, 255, 0.05)' : 'transparent' }}
        onMouseLeave={handleDragLeave}
      >
        <div className={`absolute top-1/2 w-full border-t ${isHighlighted ? 'border-yellow-400' : 'border-gray-500'}`} />
        {gates
          .filter((gate) => !gate.qubits) // Only render single-qubit gates, multi-qubit gates are rendered by MultiQubitGate component
          .map((gate) => (
          <Popover key={gate.id}>
            <PopoverTrigger asChild>
              <div 
                style={{ position: 'absolute', left: `${gate.position}px`, top: '50%', transform: 'translateY(-50%)' }}
                onMouseEnter={() => {
                  if (gate.qubits && onGateHover) {
                    onGateHover(getBaseGateId(gate.id))
                  }
                }}
                onMouseLeave={() => {
                  if (gate.qubits && onGateHover) {
                    onGateHover(null)
                  }
                }}
              >
                <PlacedGate gate={gate} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-40 bg-gray-800 border-gray-700 text-white">
              <div className="grid gap-2">
                <Button variant="ghost" className="w-full justify-start bg-gray-700 hover:bg-gray-600" onClick={() => onShowGateInfo(gate.name)}>
                  Show Info
                </Button>
                <Button variant="destructive" className="w-full justify-start" onClick={() => onDeleteGate(qubitIndex, gate.id)}>
                  Delete Gate
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  )
}

export default QubitWire
