"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState, useEffect, useRef } from "react"

export default function Docs() {
  const [activeSection, setActiveSection] = useState("what-is-vqc")
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const sections = [
    { id: "what-is-vqc", label: "What is a VQC?" },
    { id: "decision-boundary", label: "The Decision Boundary" },
    { id: "quantum-plot", label: "Reading the Quantum Plot" },
    { id: "legend", label: "Understanding the Legend" },
    { id: "classification", label: "How Classification Works" },
    { id: "implications", label: "Practical Implications" },
    { id: "bibliography", label: "Bibliography" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Calculate vertical scroll progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(progress)

      // Find active section based on scroll position
      for (const section of sections) {
        const element = sectionRefs.current[section.id]
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setActiveSection(sectionId)
    }
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
            <Link href="/research" className="hover:text-yellow-400 transition">
              Research
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
            <Link href="/docs" className="text-yellow-400">
              Docs
            </Link>
            <Button
                className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold"
                onClick={() => window.location.href = "/playground"}
              >
              Start
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 px-4 py-8 flex gap-6">
        <div className="max-w-7xl w-full mx-auto flex gap-24">
          <div className="hidden md:flex flex-col gap-3 w-48 shrink-0 sticky top-24 h-fit">
            <div className="text-sm font-bold text-yellow-400 mb-2">NOTEBOOK SECTIONS</div>
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="link"
                onClick={() => scrollToSection(section.id)}
                className={`justify-start text-sm transition-colors ${
                  activeSection === section.id
                    ? "text-yellow-400 font-bold"
                    : "text-gray-400 hover:text-yellow-400"
                }`}
              >
                {section.label}
              </Button>
            ))}
          </div>

          <div className="flex-1 max-w-3xl">
            {/* Main Documentation Card */}
            <Card className="border-yellow-400/30 bg-black/50 mb-8">
              <CardHeader>
                <CardTitle className="text-yellow-400">Documentation</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <p>This guide explains the key concepts behind the VQC Playground, from the quantum circuit to the final plot.</p>
              </CardContent>
            </Card>

            {sections.map((section) => (
              <div
                key={section.id}
                ref={(el: HTMLDivElement | null) => {
                  sectionRefs.current[section.id] = el
                }}
                className="mb-16"
              >
                {section.id === "what-is-vqc" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-yellow-400 mb-4">1. What is a VQC exactly?</h2>
                      <div className="space-y-4 text-gray-300">
                        <p>A VQC stands for <strong>Variational Quantum Classifier</strong>.</p>
                        <p>Think of it as a hybrid AI model that uses both a classical computer and a quantum computer (or, in our case, a simulator).</p>
                        
                        <div className="border-l-4 border-yellow-400 pl-4 space-y-3">
                          <div>
                            <p className="text-yellow-400 font-bold">Classical Part:</p>
                            <p>A standard computer optimizer (like COBYLA in our code) is the "teacher." Its job is to find the best settings for the quantum circuit.</p>
                          </div>
                          <div>
                            <p className="text-yellow-400 font-bold">Quantum Part:</p>
                            <p>The quantum circuit (our ZZFeatureMap + RealAmplitudes ansatz) is the "student." It's a special circuit with tunable knobs (parameters).</p>
                          </div>
                          <div>
                            <p className="text-yellow-400 font-bold">"Variational":</p>
                            <p>This term means the classical "teacher" varies the "student's" quantum knobs, checks the results, and "teaches" it to get better, just like a classical neural network learns by adjusting its weights.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center my-6">
                      <img
                        src="/vqc-circuit.png"
                        alt="Diagram showing a hybrid classical-quantum loop with data input, feature map, ansatz, measurement, and classical optimizer feedback."
                        width={600}
                        height={300}
                        className="rounded-lg shadow-lg border border-yellow-400/20"
                      />
                    </div>

                    <Alert className="border-yellow-400/30 bg-yellow-400/5">
                      <AlertDescription className="text-yellow-400">
                        The power of VQCs lies in their ability to learn non-linear decision boundaries efficiently by leveraging quantum superposition and entanglement.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {section.id === "decision-boundary" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-yellow-400 mb-4">2. How do you map a VQC circuit to decision boundaries?</h2>
                      <div className="space-y-4 text-gray-300">
                        <p>This is the core of the project. We don't draw the boundary directly. Instead, we sample the entire space and let the VQC's predictions create the boundary.</p>
                        <p className="font-bold">Here's the process:</p>
                        
                        <ol className="list-decimal list-inside space-y-3 ml-2">
                          <li><strong>Create a Grid:</strong> We create a 20x20 grid of invisible points covering the entire plot.</li>
                          <li><strong>Encode Data:</strong> For each grid point [x, y], we "imprint" it onto a quantum state using the Feature Map (ZZFeatureMap).</li>
                          <li><strong>Process with Ansatz:</strong> We run that quantum state through our trained Ansatz (RealAmplitudes). This is the part of the circuit that has "learned" the pattern.</li>
                          <li><strong>Measure:</strong> We measure the final quantum state. The VQC is trained to output 0 (for Class 0) or 1 (for Class 1).</li>
                          <li><strong>Visualize:</strong> We color the area around that grid point based on the VQC's prediction (e.g., Red for 0, Blue for 1).</li>
                        </ol>
                        
                        <p className="italic">The decision boundary is the "coastline" that emerges where the red and blue regions meet. It's the exact line where the VQC's prediction flips from one class to the other.</p>
                      </div>
                    </div>

                    <div className="flex justify-center my-6">
                      <img
                        src="/vqc-illustration.png"
                        alt="Conceptual diagram of a 2D grid with points, showing a curved line separating two colored regions."
                        width={600}
                        height={300}
                        className="rounded-lg shadow-lg border border-yellow-400/20"
                      />
                    </div>

                    <Alert className="border-yellow-400/30 bg-yellow-400/5">
                      <AlertDescription className="text-yellow-400">
                        The complexity of the decision boundary depends on the depth of your quantum circuit and the training iterations.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {section.id === "quantum-plot" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-yellow-400 mb-4">3. What does the quantum plot display?</h2>
                      <div className="space-y-4 text-gray-300">
                        <p>The plot shows three layers of information:</p>
                        
                        <div className="space-y-3 ml-4">
                          <div>
                            <p className="text-yellow-400 font-bold">The Data (The "Problem"):</p>
                            <p>The individual circular points (Setosa, Moons, etc.) are the actual data we used to train the model. This is the "ground truth."</p>
                          </div>
                          <div>
                            <p className="text-yellow-400 font-bold">The Model's "Mind" (The "Solution"):</p>
                            <p>The light red and blue shaded background regions are the decision boundaries the VQC learned. The red area is the region where the VQC thinks all points should be "Class 0." The blue area is where it thinks all points should be "Class 1."</p>
                          </div>
                          <div>
                            <p className="text-yellow-400 font-bold">Your Test Points (The "Test"):</p>
                            <p>The star-shaped points are the new, "unseen" data points you create by clicking. They show you how the already-trained model classifies a new point in real-time.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center my-6">
                      <img
                        src="/quantum-plots.png"
                        alt="Annotated screenshot of the quantum plot showing distinct layers for original data, decision boundary, and new classified points."
                        width={600}
                        height={400}
                        className="rounded-lg shadow-lg border border-yellow-400/20"
                      />
                    </div>

                    <Alert className="border-yellow-400/30 bg-yellow-400/5">
                      <AlertDescription className="text-yellow-400">
                        Pay attention to how the model performs on data far from the training points—this reveals overfitting or generalization.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {section.id === "legend" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-yellow-400 mb-4">4. Understanding the Legend</h2>
                      <div className="space-y-4 text-gray-300">
                        <p>The legend is simple:</p>
                        
                        <div className="space-y-4 ml-4">
                          <div className="border-l-4 border-red-500 pl-4">
                            <p className="text-red-400 font-bold flex items-center gap-2">
                              <span className="text-2xl">●</span> Red Points / Red Region (Class 0)
                            </p>
                            <p className="text-sm mt-2">Represents the first class in the dataset.</p>
                            <ul className="list-disc list-inside text-sm mt-1 ml-2">
                              <li>For Iris, this is "Setosa."</li>
                              <li>For Moons & Spirals, this is "Class 0."</li>
                            </ul>
                          </div>

                          <div className="border-l-4 border-blue-500 pl-4">
                            <p className="text-blue-400 font-bold flex items-center gap-2">
                              <span className="text-2xl">●</span> Blue Points / Blue Region (Class 1)
                            </p>
                            <p className="text-sm mt-2">Represents the second class in the dataset.</p>
                            <ul className="list-disc list-inside text-sm mt-1 ml-2">
                              <li>For Iris, this is "Versicolor."</li>
                              <li>For Moons & Spirals, this is "Class 1."</li>
                            </ul>
                          </div>

                          <div className="border-l-4 border-yellow-400 pl-4">
                            <p className="text-yellow-400 font-bold flex items-center gap-2">
                              <span className="text-2xl">⭐</span> Star (New Prediction)
                            </p>
                            <p className="text-sm mt-2">This is a point you just added. Its color (red or blue) shows the class the VQC assigned to it.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Alert className="border-yellow-400/30 bg-yellow-400/5">
                      <AlertDescription className="text-yellow-400">
                        The visual color coding makes it easy to spot how well the quantum model generalizes to new regions of the feature space.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {section.id === "classification" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-yellow-400 mb-4">5. How do new points get classified and what do the new classes signify?</h2>
                      <div className="space-y-4 text-gray-300">
                        <p>When you click on the plot, a simple 3-step process happens:</p>
                        
                        <ol className="list-decimal list-inside space-y-3 ml-2">
                          <li><strong>Click Event:</strong> Your browser gets the [x, y] coordinate of your click.</li>
                          <li><strong>API Call:</strong> The frontend sends this [x, y] point to the /api/classify endpoint on our FastAPI backend.</li>
                          <li><strong>Quantum Prediction:</strong> The backend takes your point, scales it (very important!), and feeds it into the already-trained trained_vqc model. The model runs the quantum circuit once (no training, just a fast prediction) and returns the predicted class (0 or 1).</li>
                        </ol>
                        
                        <p className="mt-4">The new class (Setosa, Versicolor, etc.) signifies which category the quantum model believes your new point belongs to, based on the patterns it learned from the original data.</p>
                      </div>
                    </div>

                    <div className="flex justify-center my-6">
                      <img
                        src="/architecture.jpg"
                        alt="Flowchart showing user click -> frontend -> API call -> backend (scaling, VQC prediction) -> result back to frontend."
                        width={600}
                        height={250}
                        className="rounded-lg shadow-lg border border-yellow-400/20"
                      />
                    </div>

                    <Alert className="border-yellow-400/30 bg-yellow-400/5">
                      <AlertDescription className="text-yellow-400">
                        Data scaling is crucial! The backend must scale new points using the same scaler that was applied during training to ensure consistent predictions.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {section.id === "implications" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-yellow-400 mb-4">6. Practical Implications</h2>
                      <div className="space-y-4 text-gray-300">
                        <p>This project is a hands-on introduction to Quantum Machine Learning (QML).</p>
                        
                        <div className="space-y-4 ml-4">
                          <div>
                            <p className="text-yellow-400 font-bold">Why it's helpful:</p>
                            <p>It proves that we can use quantum circuits as powerful classification models. The make_moons and make_spirals datasets are impossible to solve with a simple straight line (a linear classifier). This project shows that a VQC can learn complex, non-linear boundaries.</p>
                          </div>
                          
                          <div>
                            <p className="text-yellow-400 font-bold">Real-Life Implications:</p>
                            <p>For 2D problems like this, a classical AI model is faster and cheaper. However, the true power of QML is theorized to be in problems with massive, high-dimensional data—problems so complex that classical computers can't even begin to find patterns.</p>
                          </div>
                          
                          <div>
                            <p className="text-yellow-400 font-bold">Future of Quantum Computing:</p>
                            <p>This playground is a "toy" version of the same technology that might one day solve some of the world's most complex problems in drug discovery, materials science, optimization, and finance.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center my-6">
                      <img
                        src="/ansatz-hardware.jpg"
                        alt="Futuristic illustration of quantum computing applications in various fields like medicine, finance, and materials science."
                        width={600}
                        height={350}
                        className="rounded-lg shadow-lg border border-yellow-400/20"
                      />
                    </div>

                    <Alert className="border-yellow-400/30 bg-yellow-400/5">
                      <AlertDescription className="text-yellow-400">
                        Quantum advantage may emerge in specific problem domains over the next 5-10 years as quantum hardware matures and becomes more reliable.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {section.id === "bibliography" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-yellow-400 mb-4">7. Bibliography</h2>
                      <div className="space-y-4 text-gray-300">
                        <ul className="list-disc list-inside space-y-3 ml-2">
                          <li>
                            <a
                              href="https://quantaggle.com/algorithms/ansatz/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:underline"
                            >
                              An Overview of Quantum Computing Ansatz
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.researchgate.net/figure/a-Data-points-and-prediction-boundaries-from-the-full-quantum-kernel-SVM-b-c-and_fig6_354140515"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:underline"
                            >
                              Data points and prediction boundaries from the full quantum kernel SVM
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.researchgate.net/figure/Illustration-of-VQC-algorithm_fig4_388439026"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:underline"
                            >
                              Illustration of VQC Algorithm
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://www.nature.com/articles/nature23879"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white hover:underline"
                            >
                              Applications of Ansatz Circuits 
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex w-12 shrink-0 sticky top-24 h-screen items-start pt-8">
            <div className="w-1.5 bg-gray-700 rounded-full h-full flex flex-col overflow-hidden">
              <div
                className="bg-yellow-400 rounded-full transition-all duration-300 ease-out"
                style={{
                  height: `${scrollProgress}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
