"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ClientOnly from "@/components/ClientOnly"
import MathDisplay from "@/components/MathDisplay"
import ChatbotIntroPopup from "@/components/ChatbotIntroPopup"
import { pauliX, pauliZ, hadamard, rxRotation, ryRotation, rzRotation } from "@/utils/math"

export default function LandingPage() {
  const handleGetStarted = () => {
    window.location.href = "/playground"
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Chatbot Intro Popup - only shows once */}
      <ChatbotIntroPopup />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur border-b border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-yellow-400">
            VQC <span className="text-white">Portal.</span>
          </div>
          <div className="flex gap-6 items-center text-sm">
            <Link href="/about" className="hover:text-yellow-400 transition">
              About
            </Link>
            <Link href="/docs" className="hover:text-yellow-400 transition">
              Docs
            </Link>
            <Link href="/datasets" className="hover:text-yellow-400 transition">
              Datasets
            </Link>
            <Button onClick={handleGetStarted} className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold">
              Enter Playground
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen pt-24 flex flex-col items-center justify-center text-center space-y-8 px-4 relative overflow-hidden">
        {/* Background video */}
        <ClientOnly>
          <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
            <source src="/explainer.mp4" type="video/mp4" />
          </video>
        </ClientOnly>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 space-y-8">
          <h1 className="text-7xl md:text-8xl font-bold text-yellow-400 tracking-wider">änsatz</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">Variational Quantum Classifier - <span className="text-yellow-400 italic">with AI</span> </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Explore quantum computing through interactive machine learning. Visualize quantum circuits, understand
            parameterized gate operations, and train variational quantum classifiers in real-time.
          </p>

          {/* Key Features */}
          <div className="flex flex-col md:flex-row gap-8 justify-center text-sm pt-8">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">◉</span>
              <span className="bg-white/10 backdrop-blur rounded-lg px-3 py-1.5 border border-white/20">
                Quantum Circuits & Algorithms
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">◉</span>
              <span className="bg-white/10 backdrop-blur rounded-lg px-3 py-1.5 border border-white/20">
                Neural Networks
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">◉</span>
              <span className="bg-white/10 backdrop-blur rounded-lg px-3 py-1.5 border border-white/20">
                Interactive QML
              </span>
            </div>
          </div>

          <Button
            onClick={handleGetStarted}
            className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold text-lg px-8 py-3 mt-8"
          >
            Get Started
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-12 pt-16 relative z-10">
          <div className="text-center">
            <div className="text-5xl font-bold text-yellow-400">3</div>
            <div className="text-gray-400 mt-2">Datasets</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-yellow-400">∞</div>
            <div className="text-gray-400 mt-2">Circuits</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-yellow-400">100%</div>
            <div className="text-gray-400 mt-2">Open Source</div>
          </div>
        </div>
      </section>

      {/* Quantum Circuits Section */}
      <section className="py-20 px-4 border-t border-yellow-400/20">
        <div className="max-w-6xl mx-auto space-y-12">
          <h2 className="text-5xl font-bold text-center">
            <span className="text-white">Prerequisite</span> <span className="text-yellow-400">Mathematics</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Gate Operations */}
            <Card className="border-yellow-400/30 bg-black">
              <CardHeader>
                <CardTitle className="text-yellow-400">Single Qubit Gates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-300">
                <div>
                  <p className="mb-2">Pauli-X (NOT) Gate:</p>
                  <div className="bg-black/50 p-4 rounded border border-yellow-400/20 overflow-x-auto min-h-20 flex items-center justify-center">
                    <MathDisplay expression={pauliX} />
                  </div>
                </div>
                <div>
                  <p className="mb-2">Pauli-Z Gate:</p>
                  <div className="bg-black/50 p-4 rounded border border-yellow-400/20 overflow-x-auto min-h-20 flex items-center justify-center">
                    <MathDisplay expression={pauliZ} />
                  </div>
                </div>
                <div>
                  <p className="mb-2">Hadamard Gate:</p>
                  <div className="bg-black/50 p-4 rounded border border-yellow-400/20 overflow-x-auto min-h-20 flex items-center justify-center">
                    <MathDisplay expression={hadamard} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rotation Gates */}
            <Card className="border-yellow-400/30 bg-black">
              <CardHeader>
                <CardTitle className="text-yellow-400">Parameterized Rotations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-300">
                <div>
                  <p className="mb-2">RX Rotation (X-axis):</p>
                  <div className="bg-black/50 p-4 rounded border border-yellow-400/20 overflow-x-auto min-h-20 flex items-center justify-center">
                    <MathDisplay expression={rxRotation()} />
                  </div>
                </div>
                <div>
                  <p className="mb-2">RY Rotation (Y-axis):</p>
                  <div className="bg-black/50 p-4 rounded border border-yellow-400/20 overflow-x-auto min-h-20 flex items-center justify-center">
                    <MathDisplay expression={ryRotation()} />
                  </div>
                </div>
                <div>
                  <p className="mb-2">RZ Rotation (Z-axis):</p>
                  <div className="bg-black/50 p-4 rounded border border-yellow-400/20 overflow-x-auto min-h-20 flex items-center justify-center">
                    <MathDisplay expression={rzRotation()} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Core Quantum Concepts */}
            <Card className="border-yellow-400/30 bg-black">
              <CardHeader>
                <CardTitle className="text-yellow-400">Core Concepts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-300">
                <div>
                  <p className="mb-2">Bra-Ket Notation:</p>
                  <div className="bg-black/50 p-4 rounded border border-yellow-400/20 overflow-x-auto min-h-20 flex items-center justify-center">
                    <MathDisplay expression={String.raw`|0⟩ = \begin{bmatrix} 1 \\ 0 \end{bmatrix}, |1⟩ = \begin{bmatrix} 0 \\ 1 \end{bmatrix}`} />
                  </div>
                </div>
                <div>
                  <p className="mb-2">Superposition:</p>
                  <div className="bg-black/50 p-4 rounded border border-yellow-400/20 overflow-x-auto min-h-20 flex items-center justify-center">
                    <MathDisplay expression="|ψ⟩ = α|0⟩ + β|1⟩" />
                  </div>
                </div>
                <div>
                  <p className="mb-2">Measurement Probability:</p>
                  <div className="bg-black/50 p-4 rounded border border-yellow-400/20 overflow-x-auto min-h-20 flex items-center justify-center">
                    <MathDisplay expression="P(|0⟩) = |α|², P(|1⟩) = |β|²" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* VQC Cost Function */}
          <Card className="border-yellow-400/30 bg-black">
            <CardHeader>
              <CardTitle className="text-yellow-400">Variational Quantum Classifier Cost Function</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <p className="mb-3">The VQC minimizes the cost function during training:</p>
                <div className="bg-black/50 p-4 rounded border border-yellow-400/20 overflow-x-auto min-h-16 flex items-center justify-center">
                  <MathDisplay
                    expression={String.raw`\begin{gathered} C(\theta) = \sum_i [y_i - \langle0|U^\dagger(\theta)ZU(\theta)|0\rangle]^2 \\ \text{where } C(\theta) \text{ is the cost function, } y_i \text{ is the true label,} \\ U(\theta) \text{ is the quantum circuit, and } Z \text{ is the Pauli-Z operator.} \end{gathered}`}
                  />
                </div>
              </div>
              <div>
                <p className="mb-3">Where the unitary circuit is constructed from parameterized gates:</p>
                <div className="bg-black/50 p-4 rounded border border-yellow-400/20 overflow-x-auto min-h-16 flex items-center justify-center">
                  <MathDisplay
                    expression={String.raw`\begin{gathered} U(\theta) = \prod R_Z(\theta_{l,3}) R_Y(\theta_{l,2}) R_X(\theta_{l,1}) \text{CNOT} \\ \text{where } R_X, R_Y, R_Z \text{ are rotation gates,} \\ \theta_{l,j} \text{ is a rotation angle, and CNOT is the Controlled-NOT gate.} \end{gathered}`}
                  />
                </div>
              </div>
              <div>
                <p className="mb-3">Parameters are updated using gradient descent:</p>
                <div className="bg-black/50 p-4 rounded border border-yellow-400/20 overflow-x-auto min-h-16 flex items-center justify-center">
                  <MathDisplay
                    expression={String.raw`\begin{gathered} \theta^{(t+1)} = \theta^t - \eta \nabla C(\theta^t) \\ \text{where } \theta^t \text{ are parameters at iteration } t, \\ \eta \text{ is the learning rate, and } \nabla C(\theta^t) \text{ is the gradient.} \end{gathered}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why VQC Section */}
      <section className="py-20 px-4 border-t border-yellow-400/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center">
            <span className="text-white">Why</span> <span className="text-yellow-400">änsatz?</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: "⚛️",
                title: "Quantum Advantage",
                desc: "Learn how quantum computing offers potential speedups for machine learning problems.",
              },
              {
                icon: "📊",
                title: "Visual Learning",
                desc: "Understand quantum circuits and decision boundaries through interactive visualization.",
              },
              {
                icon: "🔬",
                title: "Hands-on Education",
                desc: "Experiment with variational quantum algorithms in a guided, interactive environment.",
              },
              {
                icon: "🎛️",
                title: "Qisper AI",
                desc: "Get instant help with quantum computing concepts through our intelligent AI chatbot powered by Gemini.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border border-yellow-400/30 p-6 bg-linear-to-br from-yellow-400/10 to-transparent hover:border-yellow-400/60 transition"
              >
                <div className="text-3xl mb-4 text-yellow-400">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-yellow-400/20 text-center space-y-8">
        <h2 className="text-4xl mt-12 md:text-5xl font-bold">
          Ready to Explore <span className="text-yellow-400">Quantum ML?</span>
        </h2>
        <Button
          onClick={handleGetStarted}
          className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold text-lg px-12 py-4"
        >
          Enter Playground
        </Button>
      </section>
    </div>
  )
}
