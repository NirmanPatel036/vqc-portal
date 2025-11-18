'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import DraggableGate from '@/components/composer/DraggableGate'
import QubitWire from '@/components/composer/QubitWire'
import MultiQubitGate from '@/components/composer/MultiQubitGate'
import ProbabilityHistogram from '@/components/composer/ProbabilityHistogram'
import { ALL_GATES, GATE_INFO } from '@/lib/composer/gates'
import KaTeX from '@/components/KaTeX'
import MathText from '@/components/MathText'
import 'katex/dist/katex.min.css'

interface Gate {
  id: string
  name: string
  position: number
  qubits?: number[] // For multi-qubit gates
}

interface Circuit {
  [qubitIndex: number]: Gate[]
}

interface MultiQubitGateData {
  id: string
  name: string
  position: number
  qubits: number[]
}

interface SimulationResult {
  probabilities: { [state: string]: number }
  calculations: Array<{ title: string; math?: string; description?: string }> | string
  numQubits: number
  gateCount: number
}

export default function ComposerPage() {
  const [circuit, setCircuit] = useState<Circuit>({ 0: [], 1: [], 2: [], 3: [] })
  const [multiQubitGates, setMultiQubitGates] = useState<MultiQubitGateData[]>([])
  const [selectedGateInfo, setSelectedGateInfo] = useState<{ name: string; description: string; matrix: string } | null>(null)
  const [hoveredMultiQubitGate, setHoveredMultiQubitGate] = useState<string | null>(null)
  const [dragHoverState, setDragHoverState] = useState<{ wire: number; gateSize: number } | null>(null)
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)

  const handleDropGate = (qubitIndex: number, gateName: string, position: number) => {
    const gateInfo = GATE_INFO[gateName]
    const newGateId = `${gateName}-${Date.now()}`

    if (gateInfo.size > 1) {
      // Handle multi-qubit gates (CNOT, CCNOT)
      const targetQubits = Array.from({ length: gateInfo.size }, (_, i) => qubitIndex + i)
      
      // Check if gate fits within available qubits
      const maxQubit = Math.max(...Object.keys(circuit).map(k => parseInt(k)))
      if (Math.max(...targetQubits) > maxQubit) {
        console.warn('Multi-qubit gate extends beyond available qubits')
        return
      }

      // Add the multi-qubit gate to tracking
      setMultiQubitGates(prev => [...prev, {
        id: newGateId,
        name: gateName,
        position,
        qubits: targetQubits
      }])

      // Add markers on each affected wire
      setCircuit(prev => {
        const newCircuit = { ...prev }
        targetQubits.forEach((q, idx) => {
          const isControl = idx < targetQubits.length - 1
          const marker: Gate = {
            id: `${newGateId}-${q}`,
            name: isControl ? 'CONTROL' : gateName,
            position,
            qubits: targetQubits
          }
          newCircuit[q] = [...(newCircuit[q] || []), marker]
        })
        return newCircuit
      })
    } else {
      // Handle single-qubit gates
      const newGate: Gate = { id: newGateId, name: gateName, position }
      setCircuit(prev => ({
        ...prev,
        [qubitIndex]: [...(prev[qubitIndex] || []), newGate]
      }))
    }
  }

  const handleDeleteGate = (qubitIndex: number, gateId: string) => {
    // Check if it's part of a multi-qubit gate
    const gate = circuit[qubitIndex]?.find(g => g.id === gateId)
    
    if (gate?.qubits) {
      // It's a multi-qubit gate - remove from all qubits
      const baseId = gateId.split('-').slice(0, -1).join('-')
      
      setCircuit(prev => {
        const newCircuit = { ...prev }
        gate.qubits!.forEach(q => {
          newCircuit[q] = newCircuit[q]?.filter(g => !g.id.startsWith(baseId))
        })
        return newCircuit
      })
      
      setMultiQubitGates(prev => prev.filter(g => g.id !== baseId))
    } else {
      // Single-qubit gate
      setCircuit(prev => ({
        ...prev,
        [qubitIndex]: prev[qubitIndex]?.filter(g => g.id !== gateId)
      }))
    }
  }

  const handleShowGateInfo = (gateName: string) => {
    setSelectedGateInfo(GATE_INFO[gateName])
  }

  const handleFinalizeCircuit = async () => {
    setIsSimulating(true)
    try {
      const response = await fetch('/api/simulate-circuit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ circuit, multiQubitGates })
      })

      const data = await response.json()
      
      if (data.success) {
        setSimulationResult(data)
      } else {
        console.error('Simulation failed:', data.error)
      }
    } catch (error) {
      console.error('Error simulating circuit:', error)
    } finally {
      setIsSimulating(false)
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-black text-white">
        {/* Header */}
        <nav className="relative top-0 w-full z-50 bg-black/80 backdrop-blur border-b border-yellow-400/20">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-yellow-400">
              VQC <span className="text-white">Portal.</span>
            </Link>
            <div className="flex gap-6 items-center text-sm">
              <Link href="/playground" className="hover:text-yellow-400 transition">
                Playground
              </Link>
              <Link href="/about" className="hover:text-yellow-400 transition">
                About
              </Link>
              <Link href="/datasets" className="hover:text-yellow-400 transition">
                Datasets
              </Link>
              <Link href="/composer" className="text-yellow-400">
                Composer
              </Link>
              <Link href="/docs" className="hover:text-yellow-400 transition">
                Docs
              </Link>
              <Link href="/research" className="hover:text-yellow-400 transition">
                Research
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Layout - Fixed Grid */}
        <div className="flex-1 grid grid-cols-[300px_1fr] -mb-20 gap-0 overflow-hidden min-h-0">
          {/* Left Panel: Operations */}
          <Card className="h-full rounded-none border-0 border-r border-gray-700 bg-gray-950 flex flex-col overflow-hidden">
            <CardHeader className="border-b border-gray-700 py-3">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <span className="text-yellow-400">◉</span> Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 flex-1 overflow-hidden flex flex-col">
              <div className="grid grid-cols-3 gap-2">
                {ALL_GATES.map((gate) => (
                  <DraggableGate key={gate} name={gate} />
                ))}
              </div>
              <div className="mt-4 p-3 bg-gray-900 rounded text-xs text-gray-400 flex-1">
                <h3 className="font-bold text-yellow-400 mb-2">Gate Info</h3>
                {selectedGateInfo ? (
                  <div className="space-y-2">
                    <p><span className="font-semibold text-white">Name:</span> {selectedGateInfo.name}</p>
                    <p><span className="font-semibold text-white">Description:</span> {selectedGateInfo.description}</p>
                    <div>
                      <span className="font-semibold text-white">Matrix:</span>
                      <div className="mt-2 flex justify-center">
                        <KaTeX block>{selectedGateInfo.matrix}</KaTeX>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Drop a gate on a wire and click it to see details.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Panel: Grid Layout for Editor and Charts */}
          <div className="h-full flex flex-col overflow-hidden min-h-0">
            {/* Top: Circuit Editor - 50% of available height */}
            <Card className="rounded-none border-0 border-b border-gray-700 bg-gray-950 flex flex-col overflow-hidden" style={{ height: '60%' }}>
              <div className="border-b border-gray-700 py-3 px-6 flex flex-row justify-between items-center shrink-0">
                <div className="text-sm text-white flex items-center gap-2">
                  <span className="text-yellow-400">◉</span> Circuit Editor
                </div>
                <Button 
                  size="sm" 
                  className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold mb-2"
                  onClick={handleFinalizeCircuit}
                  disabled={isSimulating}
                >
                  {isSimulating ? 'Simulating...' : 'Finalize Circuit'}
                </Button>
              </div>
              <CardContent className="p-4 flex-1 bg-gray-900 overflow-auto relative">
                <div className="space-y-2">
                  {Object.keys(circuit).map((key) => {
                    const qubitIndex = parseInt(key)
                    const shouldHighlight = hoveredMultiQubitGate 
                      ? multiQubitGates.find(g => g.id === hoveredMultiQubitGate)?.qubits.includes(qubitIndex)
                      : false
                    
                    const shouldHighlightDuringDrag = dragHoverState 
                      ? qubitIndex >= dragHoverState.wire && qubitIndex < dragHoverState.wire + dragHoverState.gateSize
                      : false
                    
                    return (
                      <QubitWire
                        key={qubitIndex}
                        qubitIndex={qubitIndex}
                        gates={circuit[qubitIndex]}
                        onDropGate={handleDropGate}
                        onDeleteGate={handleDeleteGate}
                        onShowGateInfo={handleShowGateInfo}
                        isHighlighted={shouldHighlight || shouldHighlightDuringDrag || false}
                        onGateHover={setHoveredMultiQubitGate}
                        onDragHover={setDragHoverState}
                      />
                    )
                  })}
                </div>
                {/* Render multi-qubit gate connections */}
                {multiQubitGates.map(gate => (
                  <MultiQubitGate 
                    key={gate.id} 
                    gate={gate}
                    onShowGateInfo={handleShowGateInfo}
                    onDeleteGate={(gateId) => {
                      // Find the first qubit that has this gate and call handleDeleteGate
                      const firstQubit = gate.qubits[0]
                      const gateOnWire = circuit[firstQubit]?.find(g => g.id.startsWith(gateId))
                      if (gateOnWire) {
                        handleDeleteGate(firstQubit, gateOnWire.id)
                      }
                    }}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Bottom: Probabilities and Calculations - Split 50/50 - Fixed at 50% */}
            <div className="flex flex-row gap-0 overflow-hidden" style={{ height: '70%' }}>
              {/* Probabilities Panel */}
              <Card className="rounded-none border-0 border-r border-gray-700 bg-gray-950 flex flex-col overflow-hidden h-full" style={{ width: '50%' }}>
                <CardHeader className="border-b border-gray-700 py-3">
                  <CardTitle className="text-sm text-white flex items-center gap-2">
                    <span className="text-yellow-400">◉</span> Probabilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 flex-1 flex flex-col overflow-hidden min-h-0">
                  {simulationResult ? (
                    <div className="space-y-3 h-full flex flex-col min-h-0">
                      <div className="text-xs text-gray-400 shrink-0">
                        <span className="font-semibold text-white">Qubits:</span> {simulationResult.numQubits} | <span className="font-semibold text-white">Gates:</span> {simulationResult.gateCount}
                      </div>
                      
                      {/* Histogram - takes full available space */}
                      <div className="flex-1 min-h-0 w-full">
                        <ProbabilityHistogram 
                          probabilities={simulationResult.probabilities} 
                          numQubits={simulationResult.numQubits}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500 text-xs">Circuit not finalized.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Circuit Calculations Panel */}
              <Card className="rounded-none border-0 bg-gray-950 flex flex-col overflow-hidden h-full" style={{ width: '50%' }}>
                <CardHeader className="border-b border-gray-700 py-3">
                  <CardTitle className="text-sm text-white flex items-center gap-2">
                    <span className="text-yellow-400">◉</span> Circuit Calculations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-1 overflow-hidden">
                  <ScrollArea className="h-full w-full">
                    {simulationResult ? (
                      <div className="p-6 space-y-6">
                        {Array.isArray(simulationResult.calculations) ? (
                          simulationResult.calculations.map((step, idx) => (
                            <div key={idx} className="space-y-2">
                              <h4 className="text-base font-semibold text-yellow-400">{step.title}</h4>
                              {step.description && (
                                <p className="text-sm text-white leading-relaxed">{step.description}</p>
                              )}
                              {step.math && (
                                <div className="text-white py-2 overflow-x-auto">
                                  <KaTeX block>{step.math}</KaTeX>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-400">
                            <p>Calculations format error. Please try again.</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-6 text-sm text-gray-500">
                        Click "Finalize Circuit" to see calculations.
                      </div>
                    )}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}
