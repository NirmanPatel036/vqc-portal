"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ResearchStation() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      alert("Please enter your email address")
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      // Insert email into Supabase
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, subscribed_at: new Date().toISOString() }])

      if (error) {
        // Check if email already exists
        if (error.code === '23505') {
          alert("📧 This email is already subscribed!")
        } else {
          throw error
        }
      } else {
        // Send welcome email via Edge Function
        try {
          await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-welcome-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ email }),
          })
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError)
          // Don't show error to user since subscription was successful
        }
        
        alert("✅ Subscription successful! Check your email for a welcome message.")
        setEmail("")
      }
    } catch (error) {
      console.error("Supabase Error:", error)
      alert("❌ Subscription failed. Please try again later or contact us directly at nirman0511@gmail.com")
    } finally {
      setIsSubmitting(false)
    }
  }

  const researchArticles = [
    {
      id: 1,
      title: "Quantum Error Correction Below the Surface Code Threshold",
      authors: "Hartmut Neven et al., Google Quantum AI",
      date: "December 2024",
      category: "Error Correction",
      preview: "Google's Willow chip demonstrates exponential error suppression below threshold, achieving a historic milestone in quantum error correction that was first proposed by Peter Shor in 1995.",
      thumbnail: "/error-correction.png",
      readTime: "18 min read",
      link: "https://www.nature.com/articles/s41586-024-08449-y",
    },
    {
      id: 2,
      title: "Observation of Constructive Interference at the Edge of Quantum Ergodicity",
      authors: "Google Quantum AI Team",
      date: "October 2025",
      category: "Quantum Advantage",
      preview: "First-ever verifiable quantum advantage using Quantum Echoes algorithm on Willow chip, running 13,000x faster than classical supercomputers with applications in molecular chemistry and materials science.",
      thumbnail: "/constructive-interference.png",
      readTime: "20 min read",
      link: "https://www.nature.com/articles/s41586-025-09526-6",
    },
    {
      id: 3,
      title: "Continuous Operation of a Coherent 3,000-Qubit System",
      authors: "Neng-Chun Chiu, Mikhail Lukin et al., Harvard University",
      date: "September 2025",
      category: "Neutral Atoms",
      preview: "Revolutionary neutral atom array system operating continuously for over 2 hours with 3,000+ qubits, using optical lattice conveyor belts to reload atoms at 300,000 atoms per second while maintaining quantum coherence.",
      thumbnail: "/coherent-system.png",
      readTime: "16 min read",
      link: "https://www.nature.com/articles/s41586-025-09596-6",
    },
    {
      id: 4,
      title: "Light-Cone Feature Selection for Quantum Machine Learning",
      authors: "Yudai Suzuki, Rei Sakuma, Hideaki Kawaguchi",
      date: "March 2025",
      category: "QML",
      preview: "Novel algorithm enabling feature selection for quantum machine learning on quantum data itself, not just classically encoded data, unlocking new possibilities for quantum-enhanced ML applications.",
      thumbnail: "/light-cone-feature-selection.png",
      readTime: "14 min read",
      link: "https://arxiv.org/abs/2403.18733",
    },
    {
      id: 5,
      title: "Quantum Machine Learning: A Comprehensive Review of Integrating AI with Quantum Computing",
      authors: "Multiple Authors",
      date: "April 2025",
      category: "QML Survey",
      preview: "Comprehensive survey categorizing quantum machine learning contributions, covering quantum feature mapping, circuit design, and applications in medicine, finance, and image classification with focus on noise-tolerant implementations.",
      thumbnail: "/ai-integrated-qc.jpg",
      readTime: "22 min read",
      link: "https://www.sciencedirect.com/science/article/pii/S2215016125001645",
    },
    {
      id: 6,
      title: "A Tweezer Array with 6,100 Highly Coherent Atomic Qubits",
      authors: "Hannah J. Manetsch et al., Caltech",
      date: "September 2025",
      category: "Hardware",
      preview: "Record-breaking 6,100 neutral-atom qubit array demonstrating exceptional coherence and ability to move atoms while maintaining superposition, a critical step toward error-corrected quantum computers with thousands of qubits.",
      thumbnail: "/tweezer-array.png",
      readTime: "15 min read",
      link: "https://www.nature.com/articles/s41586-025-09641-4",
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
            <Link href="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-yellow-400 transition">
              About
            </Link>
            <Link href="/playground" className="hover:text-yellow-400 transition">
              Playground
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
            <Link href="/prizes" className="text-yellow-400">
              Research
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 px-4 py-20">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold">
              <span className="text-white">Research</span> <span className="text-yellow-400">Archive</span>
            </h1>
            <p className="text-xl text-gray-300">Latest articles and research papers on quantum computing</p>
          </div>

          {/* Research Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchArticles.map((article) => (
              <div
                key={article.id}
                className="border border-yellow-400/30 bg-black/50 hover:border-yellow-400 hover:bg-black/80 transition overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-linear-to-br from-yellow-400/20 to-transparent overflow-hidden">
                  <img
                    src={article.thumbnail || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">{article.authors}</p>
                  </div>

                  <p className="text-gray-300 text-sm line-clamp-3">{article.preview}</p>

                  <div className="flex justify-between items-center pt-4 border-t border-yellow-400/20">
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-gray-500">{article.date}</p>
                      <p className="text-xs text-yellow-400">{article.readTime}</p>
                    </div>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-yellow-400 text-black hover:bg-yellow-300 font-bold text-sm transition"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="border border-yellow-400/30 p-8 bg-linear-to-r from-yellow-400/10 to-transparent">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-6">
              Subscribe to get the latest quantum computing research and articles delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-black border border-yellow-400/30 text-white focus:border-yellow-400 outline-none"
                required
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                className="bg-yellow-400 text-black hover:bg-yellow-300 font-bold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
