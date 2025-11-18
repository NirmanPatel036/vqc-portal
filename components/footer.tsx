import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-yellow-400/20 bg-black/50 backdrop-blur mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-yellow-400">VQC Playground</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Interactive quantum machine learning platform for exploring variational quantum classifiers.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Navigation</h4>
            <nav className="space-y-2 text-sm">
              <Link href="/playground" className="text-gray-400 hover:text-yellow-400 transition block">
                Playground
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-yellow-400 transition block">
                About
              </Link>
              <Link href="/datasets" className="text-gray-400 hover:text-yellow-400 transition block">
                Datasets
              </Link>
              <Link href="/docs" className="text-gray-400 hover:text-yellow-400 transition block">
                Docs
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Resources</h4>
            <nav className="space-y-2 text-sm">
              <Link href="/docs" className="text-gray-400 hover:text-yellow-400 transition block">
                Documentation
              </Link>
              <a 
                href="https://github.com/NirmanPatel036"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition block"
              >
                GitHub
              </a>
              <Link href="/docs" className="text-gray-400 hover:text-yellow-400 transition block">
                API Reference
              </Link>
              <a 
                href="mailto:nirman0511@gmail.com"
                className="text-gray-400 hover:text-yellow-400 transition block"
              >
                Support
              </a>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Connect</h4>
            <nav className="space-y-2 text-sm">
              <a 
                href="https://x.com/Nirman_Patel_09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition block"
              >
                Twitter
              </a>
              <a 
                href="https://linkedin.com/in/nirmanpatel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition block"
              >
                LinkedIn
              </a>
              <a 
                href="https://discord.gg/28rQAbGR"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition block"
              >
                Discord
              </a>
              <a 
                href="mailto:nirman0511@gmail.com"
                className="text-gray-400 hover:text-yellow-400 transition block"
              >
                Email
              </a>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-yellow-400/10 py-6">
          {/* Bottom section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>Made with ❤️ by Nirman Patel. VQC Playground {currentYear}.</p>
            <div className="flex gap-6 text-xs">
              <a 
                href="https://nirmanhere.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-yellow-400 transition"
              >
                Portfolio
              </a>
              <a 
                href="https://qiskit.org/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-yellow-400 transition"
              >
                Qiskit
              </a>
              <a 
                href="https://qpiai.tech/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-yellow-400 transition"
              >
                Explore <i>Q</i><sub>π</sub>AI
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
