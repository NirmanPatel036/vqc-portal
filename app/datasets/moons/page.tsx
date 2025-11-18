"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import MathDisplay from "@/components/MathDisplay"

export default function MoonsDataset() {
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
                <span className="text-yellow-400">Moons</span> Dataset
              </h1>
              <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded text-sm font-bold">
                Medium
              </span>
            </div>
            <p className="text-xl text-gray-300">
              Two interleaving half circles for non-linear classification
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
                  <p className="text-2xl text-white">Medium</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-4">
                The Moons dataset consists of two interleaving half circles in a 2D space. It's a classic synthetic dataset for testing non-linear classifiers. The linearly inseparable nature of this data makes it an excellent benchmark for quantum machine learning algorithms that can exploit quantum superposition to learn non-linear decision boundaries.
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
                  src="/moons.jpg"
                  alt="Moons dataset showing two interleaving half circles"
                  className="w-full h-full object-contain"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quantum Features */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">Quantum Circuit Design</CardTitle>
              <CardDescription>VQC architecture for non-linear separation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-yellow-400/10 border-yellow-400/30">
                <AlertTitle className="text-yellow-400">Feature Map Layer</AlertTitle>
                <AlertDescription className="text-gray-300">
                  Data encoding into quantum state using rotation gates parametrized by input features
                </AlertDescription>
              </Alert>
              <div className="bg-black/40 p-4 rounded border border-yellow-400/20 overflow-x-auto flex items-center justify-center">
                <div className="text-gray-300 space-y-2">
                  <MathDisplay expression={String.raw`|\psi(x)\rangle = U_{\text{feature}}(x) |0\rangle`} />
                  <p className="text-yellow-400 mt-2 text-center">Feature encoding gates:</p>
                  <MathDisplay expression={String.raw`RY(\arcsin(x_0)) \cdot RZ(x_1)`} />
                  <p className="text-gray-400 text-xs mt-2 text-center">Applied to each qubit in the circuit</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ansatz */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">Variational Ansatz</CardTitle>
              <CardDescription>Trainable quantum circuit structure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-yellow-400/10 border-yellow-400/30">
                <AlertTitle className="text-yellow-400">Two-Layer Ansatz</AlertTitle>
                <AlertDescription className="text-gray-300">
                  Consists of parametrized rotation gates followed by entangling layers to capture non-linear patterns
                </AlertDescription>
              </Alert>
              <div className="bg-black/40 p-4 rounded border border-yellow-400/20 overflow-x-auto flex items-center justify-center">
                <div className="text-gray-300 space-y-2">
                  <MathDisplay expression={String.raw`U_{\text{ansatz}}(\theta) = V^\dagger(\theta_2) \cdot CX \cdot V(\theta_1)`} />
                  <p className="text-yellow-400 mt-2 text-center">where</p>
                  <MathDisplay expression={String.raw`V(\theta) = \prod_i RY(\theta_i)`} />
                  <MathDisplay expression={String.raw`\text{and } CX = \text{CNOT gates (entanglement)}`} />
                  <p className="text-gray-400 text-xs mt-2 text-center">Total parameters: 2 × n_qubits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mathematical Analysis */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">Decision Boundary Analysis</CardTitle>
              <CardDescription>Quantum advantage in non-linear separation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">
                The Moons dataset cannot be linearly separated in the original 2D space. A quantum classifier can project the data into a higher-dimensional Hilbert space where linear separation becomes possible.
              </p>
              <div className="bg-black/40 p-4 rounded border border-yellow-400/20 overflow-x-auto flex items-center justify-center">
                <div className="text-gray-300 space-y-2">
                  <p className="text-center">Kernel function:</p>
                  <MathDisplay expression={String.raw`K(x, x') = |\langle\psi(x)|\psi(x')\rangle|^2`} />
                  <p className="text-yellow-400 mt-2 text-center">Effective dimensionality:</p>
                  <MathDisplay expression={String.raw`2^{n_{\text{qubits}}}`} />
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
            <Link href="/playground?dataset=moons" className="flex-1">
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold">
                Try with Moons
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
