'use client'

import { useDrag } from 'react-dnd'
import { GATE_INFO } from '@/lib/composer/gates'
import { Button } from '@/components/ui/button'

interface DraggableGateProps {
  name: string
}

const DraggableGate = ({ name }: DraggableGateProps) => {
  const gateInfo = GATE_INFO[name]
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'GATE',
    item: { name, size: gateInfo.size },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  // Display label with proper formatting
  const displayLabel = gateInfo.name.includes('[') ? gateInfo.name : name

  return (
    <div
      ref={drag as unknown as (instance: HTMLDivElement | null) => void}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-grab"
    >
      <Button
        variant="outline"
        className={`w-full h-10 text-xs font-semibold rounded-none border-2 ${gateInfo.color}`}
      >
        {displayLabel}
      </Button>
    </div>
  )
}

export default DraggableGate
