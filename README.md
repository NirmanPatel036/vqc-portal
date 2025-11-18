# 🎛️ änsatz - Quantum Computing Playground

[![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Qiskit](https://img.shields.io/badge/Qiskit-1.0+-6929C4?style=for-the-badge&logo=qiskit&logoColor=white)](https://qiskit.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Plotly](https://img.shields.io/badge/Plotly-3.2.0-3F4F75?style=for-the-badge&logo=plotly&logoColor=white)](https://plotly.com/)
[![KaTeX](https://img.shields.io/badge/KaTeX-0.16.25-228B22?style=for-the-badge)](https://katex.org/)
[![Pydantic](https://img.shields.io/badge/Pydantic-2.0+-E92063?style=for-the-badge&logo=pydantic&logoColor=white)](https://docs.pydantic.dev/)
[![QML](https://img.shields.io/badge/Quantum_ML-Enabled-blueviolet?style=for-the-badge)](https://qiskit.org/ecosystem/machine-learning/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> A comprehensive interactive platform for exploring quantum computing, variational quantum classifiers (VQC), and quantum circuit design with real-time simulation and visualization.

## Overview

-   **Interactive Visualization**: Click-to-classify on Plotly charts
-   **Multiple Datasets**: Iris (Easy), Moons (Medium), Spirals (Hard)
-   **Real-time Training**: Train quantum models and see decision boundaries
-   **Modern UI**: Dark theme with quantum-inspired design

## 🧬 Variational Quantum Classifier (VQC)

-   **Interactive Training**: Train quantum models on classical datasets
-   **Multiple Datasets**:
    -   **Iris** (Easy): Binary classification of Iris flowers
    -   **Moons** (Medium): Two interleaving half circles
    -   **Spirals** (Hard): Two intertwining spirals
-   **Real-Time Visualization**: Plotly-powered interactive decision boundaries
-   **Click-to-Classify**: Test model predictions on custom points
-   **Performance Metrics**: Training accuracy and iteration tracking

## 🎛️ Quantum Circuit Composer

-   **Drag & Drop Interface**: Intuitive gate placement with visual feedback
-   **Multi-Qubit Gates**: Support for CNOT, Toffoli (CCNOT) with automatic wire connections
-   **Comprehensive Gate Library**:
    -   **Single-Qubit Gates**: Hadamard (H), Pauli-X/Y/Z, Phase (S), T-gate
    -   **Parametric Rotations**: RX[π/2], RY[π/2], RZ[π/2]
    -   **Multi-Qubit Gates**: CNOT, CCNOT (Toffoli)
    -   **Measurement**: Computational basis measurement (M)
-   **Real-Time Simulation**: Client-side quantum state vector simulation
-   **Interactive Visualization**:
    -   Probability histograms for all quantum states
    -   Step-by-step mathematical calculations with LaTeX rendering
    -   Live circuit state updates

## 📚 Educational Resources

-   **Interactive Math Display**: KaTeX-rendered quantum gate matrices
-   **Prerequisite Mathematics**: Core quantum concepts explained
-   **Gate Operations**: Visual representations of quantum transformations
-   **Cost Function Visualization**: VQC optimization mathematics
-   **Qisper AI Assistant**: AI-powered chatbot for instant quantum computing help and explanations

## 🚀 Getting Started

### Prerequisites

-   **Node.js** 18+ and npm/pnpm
-   **Python** 3.9+ (for VQC backend)
-   **Git**

### Frontend Setup

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/yourusername/vqc-playground.git](https://github.com/yourusername/vqc-playground.git)
    cd vqc-playground
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Set up environment variables**

    ```bash
    cp .env.example .env.local
    ```

    Edit `.env.local`:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000
    
    # Gemini API Configuration (optional - for AI chatbot)
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    # or
    pnpm dev
    ```

    The application will be available at **http://localhost:3000**

### Backend Setup (for VQC Training)

1.  **Navigate to backend directory** (create if doesn't exist)

    ```bash
    mkdir vqc-backend && cd vqc-backend
    ```

2.  **Create virtual environment**

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install Python dependencies**

    ```bash
    pip install fastapi uvicorn qiskit qiskit-aer qiskit-machine-learning scikit-learn numpy pydantic python-dotenv google-generativeai
    ```

4.  **Create `main.py`** with FastAPI endpoints (see backend documentation).

5.  **Start the FastAPI server**

    ```bash
    uvicorn main:app --reload --port 8000
    ```

    The backend API will be available at **http://localhost:8000**

## 📖 Usage Guide

### Quantum Circuit Composer

1.  Navigate to **Circuit Composer** from the main menu
2.  **Drag gates** from the operations panel onto qubit wires
3.  **Multi-qubit gates** automatically span multiple qubits
4.  Click on any gate to view its **mathematical description**
5.  Click **"Finalize Circuit"** to simulate and see:
    -   Probability distribution histogram
    -   Step-by-step quantum state evolution
    -   Mathematical calculations with LaTeX

**Supported Gates:**

-   `H` - Hadamard (superposition)
-   `X, Y, Z` - Pauli gates
-   `S, T` - Phase gates
-   `RX[π/2], RY[π/2], RZ[π/2]` - Rotation gates
-   `CNOT` - Controlled-NOT (2 qubits)
-   `CCNOT` - Toffoli gate (3 qubits)
-   `M` - Measurement

### VQC Playground

1.  Navigate to **Playground**
2.  **Select a dataset** (Iris, Moons, or Spirals)
3.  Click **"Train Model"** and wait for convergence
4.  Once trained:
    -   View the decision boundary overlay
    -   Click anywhere on the plot to classify new points
    -   Observe probability scores and predictions
5.  Click **"Reset"** to clear and start over

### Mathematical Concepts

Explore the landing page to understand:

-   Bra-ket notation and quantum states
-   Gate matrix representations
-   VQC cost function and optimization
-   Quantum circuit parameterization

## 🎨 Features in Detail

### Quantum Simulation Engine

The circuit composer includes a **full quantum state vector simulator** with:

-   Complex number arithmetic
-   Proper gate matrix application
-   Multi-qubit gate tensor products
-   Measurement probability calculation

**Example: Hadamard + CNOT (Bell State)**

```typescript
|ψ₀⟩ = |00⟩
     ↓ H on qubit 0
|ψ₁⟩ = (|0⟩ + |1⟩)/√2 ⊗ |0⟩
     ↓ CNOT (control: 0, target: 1)
|ψ₂⟩ = (|00⟩ + |11⟩)/√2  // Bell state!
````

### VQC Cost Function

The variational classifier minimizes:

$$C(\theta) = \sum_i [y_i - \langle 0|U^\dagger(\theta)ZU(\theta)|0 \rangle]^2$$

Where:

  - $U(\theta)$ is the parameterized quantum circuit
  - $y_i$ are true labels
  - $Z$ is the Pauli-Z expectation value

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Frontend (Next.js 16)                       │
├─────────────────────────────────────────────────────────────┤
│  • Quantum Circuit Composer (TypeScript + React DnD)        │
│  • VQC Playground (Plotly.js + Interactive ML)              │
│  • Real-time Quantum Simulation (Complex State Vectors)     │
│  • Mathematical Rendering (KaTeX + LaTeX)                   │
└─────────────────────────────────────────────────────────────┘
                                ↕
┌─────────────────────────────────────────────────────────────┐
│                 Backend API (FastAPI + Qiskit)              │
├─────────────────────────────────────────────────────────────┤
│  • VQC Training Pipeline (Qiskit Machine Learning)          │
│  • Dataset Generation (Scikit-learn)                        │
│  • Model Persistence & Prediction                           │
│  • Decision Boundary Computation                            │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| [Next.js](https://nextjs.org/) | 16.0.0 | React framework with App Router |
| [React](https://reactjs.org/) | 19.2.0 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1.9 | Utility-first styling |
| [Radix UI](https://www.radix-ui.com/) | Various | Accessible UI components |
| [react-dnd](https://react-dnd.github.io/react-dnd/) | 16.0.1 | Drag and drop functionality |
| [Recharts](https://recharts.org/) | 2.15.4 | Probability histogram charts |
| [Plotly.js](https://plotly.com/javascript/) | 3.2.0 | Interactive VQC visualizations |
| [KaTeX](https://katex.org/) | 0.16.25 | Mathematical notation rendering |
| [react-katex](https://github.com/talyssonoc/react-katex) | 3.1.0 | React wrapper for KaTeX |
| [Google Gemini API](https://ai.google.dev/) | Latest | AI chatbot for quantum computing assistance |
| [EmailJS](https://www.emailjs.com/) | Latest | Newsletter subscription service |

### Backend (Optional - for VQC)

| Technology | Purpose |
| :--- | :--- |
| [FastAPI](https://fastapi.tiangolo.com/) | Python web framework |
| [Qiskit](https://qiskit.org/) | Quantum computing framework |
| [Qiskit Machine Learning](https://qiskit.org/ecosystem/machine-learning/) | VQC implementation |
| [Scikit-learn](https://scikit-learn.org/) | Classical ML utilities |
| [NumPy](https://numpy.org/) | Numerical computing |
| [Pydantic](https://pydantic-docs.helpmanual.io/) | Data validation |
| [Google Generative AI](https://pypi.org/project/google-generativeai/) | Gemini API for chatbot backend |

## 📁 Project Structure

```
vqc-playground/
├── app/
│   ├── api/
│   │   └── simulate-circuit/     # Quantum simulation endpoint
│   ├── about/                    # About page
│   ├── composer/                 # Circuit composer page
│   ├── docs/                     # Documentation
│   ├── playground/               # VQC training interface
│   ├── research/                 # Research resources
│   └── layout.tsx                # Root layout with navigation
├── components/
│   ├── composer/
│   │   ├── DraggableGate.tsx     # Drag source for gates
│   │   ├── QubitWire.tsx         # Drop target for gates
│   │   ├── PlacedGate.tsx        # Rendered gate on wire
│   │   ├── MultiQubitGate.tsx    # Multi-qubit gate renderer
│   │   └── ProbabilityHistogram.tsx  # Results visualization
│   ├── ui/                       # Shadcn UI components
│   ├── ChatWidget.tsx            # Qisper AI chatbot component
│   ├── KaTeX.tsx                 # Math rendering wrapper
│   ├── MathDisplay.tsx           # LaTeX display component
│   └── QuantumPlot.tsx           # Plotly VQC visualization
├── lib/
│   └── composer/
│       └── gates.ts              # Gate definitions and metadata
├── utils/
│   └── math.ts                   # Mathematical expressions
├── styles/
│   └── globals.css               # Global styles
└── public/
    └── explainer.mp4             # Hero background video
```

## 🔧 Development

### Available Scripts

```bash
npm run dev     # Start development server (localhost:3000)
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint
```

### Environment Variables

```env
# Frontend API endpoint
NEXT_PUBLIC_API_URL=http://localhost:8000

# Gemini API Configuration (optional - for Qisper AI chatbot)
GEMINI_API_KEY=your_gemini_api_key
```

## 🤝 Contributing

Contributions are welcome\! Please feel free to submit a Pull Request.

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

## 🙏 Acknowledgments

  - [Qiskit](https://qiskit.org/) for quantum computing framework
  - [Radix UI](https://www.radix-ui.com/) for accessible components
  - [Shadcn UI](https://ui.shadcn.com/) for beautiful component designs
  - [Plotly](https://plotly.com/) for interactive visualizations
  - [KaTeX](https://katex.org/) for mathematical rendering

## 📧 Contact

For questions, issues, or collaborations, please open an issue or reach out through the repository.

-----

<div align="center">

**Built with ⚛️ for quantum computing education and research**

🌐 [Website](https://your-deployment-url.vercel.app) • 📖 [Docs](https://your-deployment-url.vercel.app/docs) • 🚀 [Playground](https://your-deployment-url.vercel.app/playground)

</div>

```
```
