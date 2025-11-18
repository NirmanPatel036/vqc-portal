"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import MathDisplay from "@/components/MathDisplay"

export default function IrisDataset() {
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
                <span className="text-yellow-400">Iris</span> Dataset
              </h1>
              <span className="bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded text-sm font-bold">
                Easy
              </span>
            </div>
            <p className="text-xl text-gray-300">
              The classic Iris flower dataset for quantum classification
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
                  <p className="text-2xl text-white">150</p>
                </div>
                <div className="bg-black/40 p-4 rounded border border-yellow-400/20">
                  <p className="text-yellow-400 font-bold mb-2">Features</p>
                  <p className="text-2xl text-white">4 (Sepal, Petal)</p>
                </div>
                <div className="bg-black/40 p-4 rounded border border-yellow-400/20">
                  <p className="text-yellow-400 font-bold mb-2">Classes</p>
                  <p className="text-2xl text-white">3 (Iris Species)</p>
                </div>
                <div className="bg-black/40 p-4 rounded border border-yellow-400/20">
                  <p className="text-yellow-400 font-bold mb-2">Difficulty</p>
                  <p className="text-2xl text-white">Easy</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-4">
                This dataset contains measurements of iris flowers from three different species. Each flower is described by four features: sepal length, sepal width, petal length, and petal width. This is an ideal starting point for quantum machine learning as the feature space is moderate and the classification task is well-understood.
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
                  src="/iris.jpg"
                  alt="Iris dataset scatter plot showing three species clusters"
                  className="w-full h-full object-contain"
                />
              </div>
            </CardContent>
          </Card>

          {/* Binary Classification Explanation */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">Why Only 2 Classes?</CardTitle>
              <CardDescription>Understanding the binary classification approach</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-yellow-400/10 border-yellow-400/30">
                <AlertTitle className="text-yellow-400">Binary VQC Simplification</AlertTitle>
                <AlertDescription className="text-gray-300">
                  While the standard Iris dataset contains 3 species (Setosa, Versicolor, and Virginica), 
                  Variational Quantum Classifiers are often introduced as binary classifiers for simplicity 
                  and easier visualization of quantum decision boundaries.
                </AlertDescription>
              </Alert>
              <div className="bg-black/40 p-4 rounded border border-yellow-400/20 space-y-3">
                <p className="text-yellow-400 font-bold">Classes Used in This VQC:</p>
                <div className="space-y-2 text-gray-300 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <div>
                      <span className="font-bold text-white">Class 0: Setosa</span>
                      <span className="text-gray-400 ml-2">(First iris species)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400">•</span>
                    <div>
                      <span className="font-bold text-white">Class 1: Versicolor</span>
                      <span className="text-gray-400 ml-2">(Second iris species)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <div>
                      <span className="font-bold text-gray-500 line-through">Class 2: Virginica</span>
                      <span className="text-gray-500 ml-2">(Excluded for binary classification)</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-xs pt-2 border-t border-yellow-400/20">
                  The backend filters the dataset to keep only the first two classes using: 
                  <code className="text-yellow-300 mx-1">mask = (y == 0) | (y == 1)</code>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quantum Encoding */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">Quantum Encoding</CardTitle>
              <CardDescription>How features are encoded into quantum states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-yellow-400/10 border-yellow-400/30">
                <AlertTitle className="text-yellow-400">Amplitude Encoding</AlertTitle>
                <AlertDescription className="text-gray-300">
                  The four Iris features are normalized and encoded as amplitudes in a quantum state with 3 qubits (for 3 classes).
                </AlertDescription>
              </Alert>
              <div className="bg-black/40 p-4 rounded border border-yellow-400/20 overflow-x-auto flex items-center justify-center">
                <div className="text-gray-300 space-y-2">
                  <p className="text-center mb-2">Encoded state representation:</p>
                  <MathDisplay expression={String.raw`|\psi\rangle = \sum_{i} \alpha_i |i\rangle`} />
                  <div className="text-yellow-400 mt-2 text-center flex items-center justify-center gap-2">
                    <span>where</span>
                    <MathDisplay expression={String.raw`\alpha_i \propto \text{feature value}`} />
                  </div>
                </div>
              </div>
              <div className="text-gray-300 text-sm flex items-center gap-2 flex-wrap">
                <span>Each of the four features undergoes normalization:</span>
                <MathDisplay expression={String.raw`x_{\text{norm}} = \frac{x - \mu}{\sigma}`} />
                <span>where</span>
                <MathDisplay expression={String.raw`\mu`} />
                <span>is the mean and</span>
                <MathDisplay expression={String.raw`\sigma`} />
                <span>is the standard deviation of the feature across all samples.</span>
              </div>
            </CardContent>
          </Card>

          {/* Mathematical Framework */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">VQC Cost Function</CardTitle>
              <CardDescription>Quantum optimization objective</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-yellow-400/10 border-yellow-400/30">
                <AlertTitle className="text-yellow-400">Binary Cross-Entropy Loss</AlertTitle>
                <AlertDescription className="text-gray-300">
                  For multi-class classification, the VQC uses the one-vs-rest strategy with binary classifiers.
                </AlertDescription>
              </Alert>
              <div className="bg-black/40 p-4 rounded border border-yellow-400/20 overflow-x-auto flex items-center justify-center">
                <div className="text-gray-300 space-y-3">
                  <div className="flex justify-center">
                    <MathDisplay expression={String.raw`C(\theta) = -\frac{1}{N} \sum_{n} \left[ y_n \log(f(x_n, \theta)) + (1-y_n) \log(1-f(x_n, \theta)) \right]`} />
                  </div>
                  <p className="text-yellow-400 text-center mt-3">where:</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <span>•</span>
                      <MathDisplay expression={String.raw`N`} /> <span>= number of training samples (150)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>•</span>
                      <MathDisplay expression={String.raw`f(x_n, \theta)`} /> <span>= VQC prediction for sample n</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>•</span>
                      <MathDisplay expression={String.raw`y_n`} /> <span>= true label (0 or 1)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>•</span>
                      <MathDisplay expression={String.raw`\theta`} /> <span>= trainable parameters</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Statistics */}
          <Card className="border-yellow-400/30 bg-yellow-400/5">
            <CardHeader>
              <CardTitle className="text-yellow-400">Feature Statistics</CardTitle>
              <CardDescription>Statistical properties of each feature</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Sepal Length", mean: "5.84 cm", std: "0.83 cm" },
                  { name: "Sepal Width", mean: "3.06 cm", std: "0.43 cm" },
                  { name: "Petal Length", mean: "3.76 cm", std: "1.76 cm" },
                  { name: "Petal Width", mean: "1.20 cm", std: "0.76 cm" },
                ].map((feature, idx) => (
                  <div key={idx} className="bg-black/40 p-3 rounded border border-yellow-400/20">
                    <p className="text-yellow-400 font-bold">{feature.name}</p>
                    <p className="text-sm text-gray-300">Mean: {feature.mean} | Std Dev: {feature.std}</p>
                  </div>
                ))}
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
            <Link href="/playground?dataset=iris" className="flex-1">
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold">
                Try with Iris
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
