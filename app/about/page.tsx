"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function About() {

  const router = useRouter()
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur border-b border-yellow-400/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-yellow-400">
            VQC <span className="text-white">Portal.</span>
          </Link>
          <div className="flex gap-6 items-center text-sm">
            <Link href="/playground" className="hover:text-yellow-400 transition">
              Playground
            </Link>
            <Link href="/about" className="text-yellow-400">
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

      <div className="pt-24 px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold text-yellow-400">About <span className="text-white">The Portal</span></h1>
            <p className="text-xl text-gray-300">Learn QML through interactive visualization</p>
          </div>

          <div className="space-y-8">
            <div className="border border-yellow-400/30 p-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4">What is VQC?</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The Variational Quantum Classifier (VQC) Playground is an interactive educational tool designed to help
                students and researchers understand quantum machine learning. Train quantum models on classic datasets
                and visualize decision boundaries in real-time.
              </p>
              <p className="text-gray-300 leading-relaxed">
                This playground bridges the gap between quantum computing theory and practical machine learning, making
                quantum algorithms accessible to everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-yellow-400/30 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">Why Should You Use?</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>✓ Interactive quantum circuit composer with drag-and-drop gates</li>
                  <li>✓ Real-time visualization of quantum states and probabilities</li>
                  <li>✓ Hands-on VQC training with instant feedback</li>
                  <li>✓ AI-powered chatbot (Qisper AI) for quantum computing help</li>
                  <li>✓ No setup required - run everything in your browser</li>
                </ul>
              </div>
              <div className="border border-yellow-400/30 p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-3">What You'll Learn</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>✓ Quantum circuit design</li>
                  <li>✓ Variational algorithms</li>
                  <li>✓ Classification techniques</li>
                  <li>✓ Parameter optimization</li>
                  <li>✓ Decision boundary analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
