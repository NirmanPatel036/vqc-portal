"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Datasets() {
  const datasets = [
    {
      name: "Iris Dataset",
      difficulty: "Easy",
      description: "Classic iris flower classification with 4 features and 3 classes namely Setosa, Versicolor and Virginica.",
      samples: 150,
      features: 4,
      href: "/datasets/iris",
    },
    {
      name: "Moons Dataset",
      difficulty: "Medium",
      description: "Two interleaving half circles, perfect for understanding decision boundaries.",
      samples: 300,
      features: 2,
      href: "/datasets/moons",
    },
    {
      name: "Spirals Dataset",
      difficulty: "Hard",
      description: "Two intertwined spirals, a challenging non-linear classification problem.",
      samples: 300,
      features: 2,
      href: "/datasets/spirals",
    },
  ]

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
            <Link href="/about" className="hover:text-yellow-400 transition">
              About
            </Link>
            <Link href="/datasets" className="text-yellow-400">
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
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold">
              <span className="text-white">Available</span> <span className="text-yellow-400">Datasets</span>
            </h1>
            <p className="text-xl text-gray-300">Choose your dataset and complexity level. Time taken by a model to converge depends on the dataset and its complexity level.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {datasets.map((dataset, idx) => (
              <Link key={idx} href={dataset.href}>
                <div
                  className="border border-yellow-400/30 p-6 bg-linear-to-br from-yellow-400/10 to-transparent hover:border-yellow-400/60 transition cursor-pointer h-full"
                >
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">{dataset.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded">
                      {dataset.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">{dataset.description}</p>
                  <div className="space-y-2 text-sm text-gray-400 mb-4">
                    <p>Samples: {dataset.samples}</p>
                    <p>Features: {dataset.features}</p>
                  </div>
                  <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold">
                    Explore Dataset
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
