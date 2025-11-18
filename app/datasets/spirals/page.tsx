"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import MathDisplay from "@/components/MathDisplay"

export default function SpiralsDataset() {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur border-b border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-yellow-400">
            VQC <span className="text-white">Playground</span>
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
            <Link href="/docs" className="hover:text-yellow-400 transition">
              Docs
            </Link>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold">Start</Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h1 className="text-5xl font-bold">
                <span className="text-yellow-400">Spirals</span> Dataset
              </h1>
              <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded text-sm font-bold">
                Hard
              </span>
            </div>
            <p className="text-xl text-gray-300">
              Two intertwined spirals - the ultimate quantum ML challenge
            </p>
          </div>

          {/* Overview Card */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">Dataset Overview</CardTitle>
              <CardDescription>Key characteristics and specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded border border-yellow-400/20">
                  <p className="text-yellow-400 font-bold mb-2">Samples</p>
                  <p className="text-2xl text-white">300</p>
                </div>
                <div className="bg-black/40 p-4 rounded border border-yellow-400/20">
                  <p className="text-yellow-400 font-bold mb-2">Features</p>
                  <p className="text-2xl text-white">2 (X, Y coordinates)</p>
                </div>
                <div className="bg-black/40 p-4 rounded border border-yellow-400/20">
                  <p className="text-yellow-400 font-bold mb-2">Classes</p>
                  <p className="text-2xl text-white">2 (Binary)</p>
                </div>
                <div className="bg-black/40 p-4 rounded border border-yellow-400/20">
                  <p className="text-yellow-400 font-bold mb-2">Difficulty</p>
                  <p className="text-2xl text-white">Hard</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-4">
                The Spirals dataset is one of the most challenging binary classification problems. Two intertwined spirals rotate around a common center with different angular velocities. This dataset severely tests the expressiveness of any machine learning model and is an excellent testbed for demonstrating quantum advantage in learning complex, highly non-linear patterns.
              </p>
            </CardContent>
          </Card>

          {/* Dataset Visualization */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">Dataset Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/60 rounded border border-yellow-400/20 overflow-hidden">
                <img
                  src="/spirals.jpg"
                  alt="Spirals dataset showing two intertwined spirals"
                  className="w-full h-full object-contain"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quantum Challenge */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">Quantum Advantage</CardTitle>
              <CardDescription>Why quantum is needed for spirals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-yellow-400/10 border-yellow-400/30">
                <AlertTitle className="text-yellow-400">Classical Limitation</AlertTitle>
                <AlertDescription className="text-gray-300">
                  Classical neural networks need exponentially many hidden units to separate spirals, while quantum circuits can achieve this with polynomial resources using quantum superposition and entanglement.
                </AlertDescription>
              </Alert>
              <div className="bg-black/40 p-4 rounded border border-yellow-400/20 overflow-x-auto flex items-center justify-center">
                <div className="text-gray-300 space-y-2">
                  <MathDisplay expression={String.raw`\text{Classical: } O(2^n) \text{ parameters needed}`} />
                  <MathDisplay expression={String.raw`\text{Quantum: } O(n) \text{ parameters sufficient}`} />
                  <p className="text-gray-400 text-xs mt-2 text-center">where n = feature dimension</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Ansatz */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">Deep Variational Circuit</CardTitle>
              <CardDescription>Advanced quantum architecture for complex patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-yellow-400/10 border-yellow-400/30">
                <AlertTitle className="text-yellow-400">Multi-Layer Ansatz</AlertTitle>
                <AlertDescription className="text-gray-300">
                  Deep quantum circuits with multiple entangling layers to learn intricate spiral boundaries
                </AlertDescription>
              </Alert>
              <div className="bg-black/40 p-4 rounded border border-yellow-400/20 overflow-x-auto flex items-center justify-center">
                <div className="text-gray-300 space-y-2">
                  <MathDisplay expression={String.raw`U(\theta) = \prod_{l=1}^{L} [U_{\text{ent}} \cdot U_{\text{rot}}(\theta_l)]`} />
                  <p className="text-yellow-400 mt-2 text-center">where:</p>
                  <MathDisplay expression={String.raw`L = \text{number of layers (typically 3-5)}`} />
                  <MathDisplay expression={String.raw`U_{\text{rot}}(\theta) = \prod_i RY(\theta_i) \cdot RZ(\theta_i')`} />
                  <MathDisplay expression={String.raw`U_{\text{ent}} = \text{full entanglement pattern}`} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mathematical Framework */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">Spiral Geometry</CardTitle>
              <CardDescription>Mathematical properties of spiral patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                Each spiral can be parameterized in polar coordinates as a curve where the distance from origin increases with angle.
              </p>
              <div className="bg-black/40 p-4 rounded border border-yellow-400/20 overflow-x-auto flex items-center justify-center">
                <div className="text-gray-300 space-y-2">
                  <p className="text-center">Spiral parameterization:</p>
                  <MathDisplay expression={String.raw`r(\theta) = a + b \cdot \theta`} />
                  <p className="text-yellow-400 mt-2 text-center">Cartesian conversion:</p>
                  <MathDisplay expression={String.raw`x = r(\theta) \cdot \cos(\theta)`} />
                  <MathDisplay expression={String.raw`y = r(\theta) \cdot \sin(\theta)`} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Training Complexity */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">Training Characteristics</CardTitle>
              <CardDescription>Expected convergence behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="bg-black/40 p-3 rounded border border-yellow-400/20">
                  <p className="text-yellow-400 font-bold mb-1">Epochs Recommended</p>
                  <p className="text-sm text-gray-300">500-1000 (significantly more than simpler datasets)</p>
                </div>
                <div className="bg-black/40 p-3 rounded border border-yellow-400/20">
                  <p className="text-yellow-400 font-bold mb-1">Learning Rate</p>
                  <p className="text-sm text-gray-300">0.01 - 0.05 (may require careful tuning)</p>
                </div>
                <div className="bg-black/40 p-3 rounded border border-yellow-400/20">
                  <p className="text-yellow-400 font-bold mb-1">Convergence Time</p>
                  <p className="text-sm text-gray-300">Slower than other datasets - barren plateaus possible</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="flex gap-4 pt-8">
            <Link href="/datasets" className="flex-1">
              <Button variant="outline" className="w-full text-black border-yellow-400/30 hover:bg-white/80">
                Back to Datasets
              </Button>
            </Link>
            <Link href="/playground?dataset=spirals" className="flex-1">
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold">
                Try with Spirals
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
