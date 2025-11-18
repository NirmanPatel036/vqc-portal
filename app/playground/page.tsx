"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useRef, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import QuantumPlot from "@/components/QuantumPlot"

// Backend URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface ScatterPoint {
  x: number
  y: number
  label: number
}

interface DecisionMesh {
  x: number[][]
  y: number[][]
  z: number[][]
}

function PlaygroundContent({ initialDataset }: { initialDataset: string }) {
  const [selectedDataset, setSelectedDataset] = useState(initialDataset)
  const [status, setStatus] = useState("Idle. Select a dataset and train.")
  const [trainingData, setTrainingData] = useState<ScatterPoint[]>([])
  const [decisionMesh, setDecisionMesh] = useState<DecisionMesh | null>(null)
  const [newClassifiedPoints, setNewClassifiedPoints] = useState<ScatterPoint[]>([])
  const [isTraining, setIsTraining] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const controlPanelRef = useRef<HTMLDivElement>(null)

  // Set dataset from URL parameter on mount
  useEffect(() => {
    if (initialDataset && ['iris', 'moons', 'spirals'].includes(initialDataset)) {
      setSelectedDataset(initialDataset)
    }
  }, [initialDataset])

  const handleTrain = async () => {
    setIsTraining(true)
    setStatus(`Training on '${selectedDataset}'... This may take a moment.`)
    setNewClassifiedPoints([]) // Clear old predictions
    
    try {
      const res = await fetch(`${API_URL}/api/train`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataset: selectedDataset }),
      })

      if (!res.ok) {
        throw new Error(`Training failed: ${res.statusText}`)
      }
      const data = await res.json()
      
      // Parse accuracy from message string
      let accuracyValue = null;
      if (data.message && typeof data.message === 'string') {
        const match = data.message.match(/with accuracy: (\d+\.\d+)/);
        if (match && match[1]) {
          accuracyValue = parseFloat(match[1]);
        }
      }

      setTrainingData(data.scatter_points || [])
      setDecisionMesh(data.decision_mesh)
      setAccuracy(accuracyValue)
      
      setStatus("Model trained successfully! Click on the plot to classify.")
    } catch (error) {
      console.error(error)
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}. Is the backend running?`)
    }
    setIsTraining(false)
  }

  const handleReset = () => {
    setIsResetting(true);
    setStatus("Resetting playground...");
    setTrainingData([]);
    setDecisionMesh(null);
    setNewClassifiedPoints([]);
    setAccuracy(null);
    setTimeout(() => {
      setStatus("Idle. Select a dataset and train.");
      setIsResetting(false);
    }, 500);
  };

  const handlePlotClick = async (event: any) => {
    if (!decisionMesh) {
      setStatus('Please train the model before classifying.')
      return
    }
    
    if (!event.points || event.points.length === 0) {
      return
    }
    
    const clickPoint = event.points[0]
    
    // Handle different possible data structures
    const x = typeof clickPoint.x === 'number' ? clickPoint.x : parseFloat(clickPoint.x) || 0
    const y = typeof clickPoint.y === 'number' ? clickPoint.y : parseFloat(clickPoint.y) || 0
    
    const point = { x, y }
    
    if (point.x < 0 || point.x > 1 || point.y < 0 || point.y > 1) {
      return // Ignore clicks outside the plot area
    }
    
    setStatus(`Classifying point (${point.x.toFixed(2)}, ${point.y.toFixed(2)})...`)

    try {
      const res = await fetch(`${API_URL}/api/classify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(point),
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Classification failed: ${res.status} ${res.statusText} - ${errorText}`)
      }

      const data = await res.json()
      
      setNewClassifiedPoints([
        { x: point.x, y: point.y, label: data.predicted_class },
        ...newClassifiedPoints,
      ])
      setStatus(`Classified as: ${data.class_name}! Click another point.`)
    } catch (error) {
      console.error('Classify error details:', error)
      setStatus(`Error: ${error instanceof Error ? error.message : 'Classification failed'}`)
    }
  }

  const scrollToPlayground = () => {
    controlPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur border-b border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-yellow-400">
            VQC <span className="text-white">Portal.</span>
          </Link>
          <div className="flex gap-6 items-center text-sm">
            <Link href="/playground" className="text-yellow-400">
              Playground
            </Link>
            <Link href="/about" className="hover:text-yellow-400 transition">
              About
            </Link>
            <Link href="/datasets" className="hover:text-yellow-400 transition">
              Datasets
            </Link>
            <Link href="/composer" className="hover:text-yellow-400 transition">
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

      {/* Main Content - Playground */}
      <section ref={controlPanelRef} className="py-20 px-4 border-t border-yellow-400/20">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* User Guide Card - Full Width */}
          <Card className="border-yellow-400/30 bg-black">
            <CardHeader className="cursor-pointer" onClick={() => setIsGuideOpen(!isGuideOpen)}>
              <div className="flex justify-between items-center">
                <CardTitle className="text-yellow-400">📖 User Guide - Interactive Plot Controls</CardTitle>
                <span className="text-yellow-400 text-2xl">{isGuideOpen ? '−' : '+'}</span>
              </div>
            </CardHeader>
            {isGuideOpen && (
              <CardContent className="space-y-4 text-gray-300 text-sm">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-2">🖱️ Click</h3>
                    <p>Click anywhere on the plot to classify a new point. The model will predict which class it belongs to.</p>
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-2">🔍 Zoom Controls</h3>
                    <p>Use the <span className="text-yellow-400 font-bold">+</span> and <span className="text-yellow-400 font-bold">−</span> buttons in the bottom-right corner to zoom in and out of the plot.</p>
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-2">👆 Hover</h3>
                    <p>Hover over data points to see their exact coordinates and class information in a tooltip.</p>
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-2">🎨 Legend Filtering</h3>
                    <p>Click on legend items to show/hide specific classes. Double-click to isolate a single class.</p>
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-2">📦 Area Selection</h3>
                    <p>Click and drag to select a rectangular area on the plot for closer inspection (box zoom).</p>
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-bold mb-2">🔄 Double-Click</h3>
                    <p>Double-click anywhere on the plot to reset the zoom to the default view showing all data.</p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Control Panel Card */}
            <Card className="border-yellow-400/30 bg-black mt-2">
              <CardHeader>
                <CardTitle className="text-yellow-400">Control Panel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-end">
                  <div className="flex-1">
                    <label className="text-gray-300 text-sm mb-2 block">Select Dataset</label>
                    <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                      <SelectTrigger className="bg-black border-yellow-400/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black text-white border-yellow-400/30">
                        <SelectItem value="iris">Iris (Easy)</SelectItem>
                        <SelectItem value="moons">Moons (Medium)</SelectItem>
                        <SelectItem value="spirals">Spirals (Hard)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={handleTrain} 
                    disabled={isTraining}
                    className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold"
                  >
                    {isTraining ? 'Training...' : 'Train Model'}
                  </Button>
                  <Button 
                    onClick={handleReset} 
                    disabled={isResetting}
                    className="bg-white text-black hover:bg-yellow-300 font-bold"
                  >
                    {isResetting ? 'Resetting...' : 'Reset'}
                  </Button>
                </div>
                {/* Debug Display */}
                <div className="mt-4 p-3 text-zinc-300 bg-gray-800 rounded text-xs">
                  <div>Training Data Length: {trainingData.length}</div>
                  <div>Has Decision Mesh: {decisionMesh ? 'Yes' : 'No'}</div>
                  <div>New Points: {newClassifiedPoints.length}</div>
                  {trainingData.length > 0 && (
                    <div className="mt-1">
                      Sample Point: x={trainingData[0]?.x?.toFixed(3)}, y={trainingData[0]?.y?.toFixed(3)}, label={trainingData[0]?.label}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Visualization Card */}
            <Card className="border-yellow-400/30 bg-black">
              <CardHeader>
                <CardTitle className="text-yellow-400">VQC Decision Boundary</CardTitle>
                <CardDescription className="text-gray-400">
                  Click on the plot to classify a new point.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuantumPlot
                  plotData={trainingData}
                  meshData={decisionMesh}
                  newPoints={newClassifiedPoints}
                  onPlotClick={handlePlotClick}
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Status Card */}
          <div className="lg:col-span-1">
            <Card className="border-yellow-400/30 bg-black h-full sticky mt-2 top-24">
              <CardHeader>
                <CardTitle className="text-yellow-400">Live Status</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <p className="text-gray-400 text-sm mb-6">{status}</p>

                {accuracy !== null && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">Training Accuracy</h3>
                    <div className="text-3xl text-white">
                      {(accuracy * 100).toFixed(2)}%
                    </div>
                  </div>
                )}
                
                <div className="grow">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-4">New Classified Points</h3>
                  {newClassifiedPoints.length > 0 ? (
                    <ul className="space-y-3 text-sm max-h-[600px] overflow-y-auto pr-2">
                      {newClassifiedPoints.map((point, index) => (
                        <li 
                          key={index} 
                          className={`p-3 rounded-lg border ${point.label === 0 ? 'bg-red-900/20 border-red-500/30' : 'bg-blue-900/20 border-blue-500/30'}`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold">Point {index + 1}</span>
                            <span className={`font-bold px-2 py-1 rounded-md text-xs ${point.label === 0 ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                              Class {point.label}
                            </span>
                          </div>
                          <div className="text-gray-300 mt-1">
                            (x: {point.x.toFixed(3)}, y: {point.y.toFixed(3)})
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center justify-center h-48 border-2 border-dashed border-gray-700 rounded-lg">
                      <p className="text-gray-500 text-center">No new points classified yet.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </section>
    </div>
  )
}

// Wrapper component to handle search params
function DatasetParamHandler() {
  const searchParams = useSearchParams()
  const datasetParam = searchParams.get('dataset')
  return <PlaygroundContent initialDataset={datasetParam || "iris"} />
}

// Main export with Suspense boundary
export default function Playground() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <DatasetParamHandler />
    </Suspense>
  )
}
