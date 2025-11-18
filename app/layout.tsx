import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Footer from "@/components/footer"
import ChatWidget from '@/components/ChatWidget'

const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VQC Playground - Quantum Machine Learning",
  description:
    "Interactive Variational Quantum Classifier playground. Explore quantum computing and machine learning with real-time visualization.",
  generator: "qc.app",
  icons: {
    icon: "/icon_dark.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-mono bg-black">
        {children}
        <ChatWidget />
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
