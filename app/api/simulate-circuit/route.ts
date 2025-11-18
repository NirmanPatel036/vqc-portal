import { NextRequest, NextResponse } from 'next/server'

interface Gate {
  id: string
  name: string
  position: number
  qubits?: number[]
}

interface Circuit {
  [qubitIndex: number]: Gate[]
}

interface MultiQubitGateData {
  id: string
  name: string
  position: number
  qubits: number[]
}

export async function POST(request: NextRequest) {
  try {
    const { circuit, multiQubitGates } = await request.json() as {
      circuit: Circuit
      multiQubitGates: MultiQubitGateData[]
    }

    // Get number of qubits
    const numQubits = Object.keys(circuit).length

    // Build gate sequence sorted by position
    const allGates: Array<{ type: string; qubits: number[]; position: number }> = []

    // Add single-qubit gates
    Object.entries(circuit).forEach(([qubitIdx, gates]) => {
    (gates as Gate[]).forEach((gate: Gate) => {
      if (!gate.qubits) {
        const qubitIndex: number = parseInt(qubitIdx, 10)
        allGates.push({
        type: gate.name,
        qubits: [qubitIndex],
        position: gate.position
        })
      }
    })
    })

    // Add multi-qubit gates
    multiQubitGates.forEach(gate => {
      allGates.push({
        type: gate.name,
        qubits: gate.qubits,
        position: gate.position
      })
    })

    // Sort by position
    allGates.sort((a, b) => a.position - b.position)

    // Simulate the circuit (simplified - without actual Qiskit)
    // In production, you'd call a Python backend with Qiskit here
    const probabilities = simulateCircuit(numQubits, allGates)
    const calculations = generateCalculations(numQubits, allGates)

    return NextResponse.json({
      success: true,
      probabilities,
      calculations,
      numQubits,
      gateCount: allGates.length
    })
  } catch (error) {
    console.error('Circuit simulation error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to simulate circuit' },
      { status: 500 }
    )
  }
}

// Complex number operations
interface Complex {
  real: number
  imag: number
}

function complexAdd(a: Complex, b: Complex): Complex {
  return { real: a.real + b.real, imag: a.imag + b.imag }
}

function complexMul(a: Complex, b: Complex): Complex {
  return {
    real: a.real * b.real - a.imag * b.imag,
    imag: a.real * b.imag + a.imag * b.real
  }
}

function complexMagnitudeSquared(c: Complex): number {
  return c.real * c.real + c.imag * c.imag
}

// Gate matrices (as complex numbers)
const GATES: { [key: string]: Complex[][] } = {
  H: [
    [{ real: 1/Math.sqrt(2), imag: 0 }, { real: 1/Math.sqrt(2), imag: 0 }],
    [{ real: 1/Math.sqrt(2), imag: 0 }, { real: -1/Math.sqrt(2), imag: 0 }]
  ],
  X: [
    [{ real: 0, imag: 0 }, { real: 1, imag: 0 }],
    [{ real: 1, imag: 0 }, { real: 0, imag: 0 }]
  ],
  Y: [
    [{ real: 0, imag: 0 }, { real: 0, imag: -1 }],
    [{ real: 0, imag: 1 }, { real: 0, imag: 0 }]
  ],
  Z: [
    [{ real: 1, imag: 0 }, { real: 0, imag: 0 }],
    [{ real: 0, imag: 0 }, { real: -1, imag: 0 }]
  ],
  S: [
    [{ real: 1, imag: 0 }, { real: 0, imag: 0 }],
    [{ real: 0, imag: 0 }, { real: 0, imag: 1 }]
  ],
  T: [
    [{ real: 1, imag: 0 }, { real: 0, imag: 0 }],
    [{ real: 0, imag: 0 }, { real: 1/Math.sqrt(2), imag: 1/Math.sqrt(2) }]
  ],
  // RX(π/2) = [[cos(π/4), -i*sin(π/4)], [-i*sin(π/4), cos(π/4)]]
  RX: [
    [{ real: 1/Math.sqrt(2), imag: 0 }, { real: 0, imag: -1/Math.sqrt(2) }],
    [{ real: 0, imag: -1/Math.sqrt(2) }, { real: 1/Math.sqrt(2), imag: 0 }]
  ],
  // RY(π/2) = [[cos(π/4), -sin(π/4)], [sin(π/4), cos(π/4)]]
  RY: [
    [{ real: 1/Math.sqrt(2), imag: 0 }, { real: -1/Math.sqrt(2), imag: 0 }],
    [{ real: 1/Math.sqrt(2), imag: 0 }, { real: 1/Math.sqrt(2), imag: 0 }]
  ],
  // RZ(π/2) = [[e^(-iπ/4), 0], [0, e^(iπ/4)]] = [[cos(-π/4) + i*sin(-π/4), 0], [0, cos(π/4) + i*sin(π/4)]]
  RZ: [
    [{ real: 1/Math.sqrt(2), imag: -1/Math.sqrt(2) }, { real: 0, imag: 0 }],
    [{ real: 0, imag: 0 }, { real: 1/Math.sqrt(2), imag: 1/Math.sqrt(2) }]
  ],
  I: [
    [{ real: 1, imag: 0 }, { real: 0, imag: 0 }],
    [{ real: 0, imag: 0 }, { real: 1, imag: 0 }]
  ]
}

function simulateCircuit(numQubits: number, gates: Array<{ type: string; qubits: number[]; position: number }>) {
  const numStates = Math.pow(2, numQubits)
  
  // Initialize state vector - all qubits in |0⟩
  const stateVector: Complex[] = Array(numStates).fill(null).map((_, i) => ({
    real: i === 0 ? 1 : 0,
    imag: 0
  }))

  // Apply each gate
  gates.forEach(gate => {
    if (gate.type === 'M') {
      // Skip measurement gates (measurement is implicit at the end)
      return
    }
    
    if (gate.qubits.length === 1) {
      // Single-qubit gate
      const qubit = gate.qubits[0]
      const gateMatrix = GATES[gate.type] || GATES.I
      
      applySingleQubitGate(stateVector, numQubits, qubit, gateMatrix)
    } else if (gate.type === 'CNOT' && gate.qubits.length === 2) {
      // CNOT gate
      const control = gate.qubits[0]
      const target = gate.qubits[1]
      applyCNOT(stateVector, numQubits, control, target)
    } else if (gate.type === 'CCNOT' && gate.qubits.length === 3) {
      // Toffoli gate
      const control1 = gate.qubits[0]
      const control2 = gate.qubits[1]
      const target = gate.qubits[2]
      applyToffoli(stateVector, numQubits, control1, control2, target)
    }
  })

  // Convert state vector to probabilities using Born rule: p(x) = |α_x|²
  const probabilities: { [state: string]: number } = {}
  for (let i = 0; i < numStates; i++) {
    // Convert index to binary string (qubit 0 is rightmost bit - little-endian)
    const binaryState = i.toString(2).padStart(numQubits, '0')
    const prob = complexMagnitudeSquared(stateVector[i])
    probabilities[binaryState] = prob
  }

  return probabilities
}

function applySingleQubitGate(
  stateVector: Complex[],
  numQubits: number,
  targetQubit: number,
  gateMatrix: Complex[][]
) {
  const numStates = stateVector.length
  const newStateVector: Complex[] = new Array(numStates)
  
  // Initialize all to zero
  for (let i = 0; i < numStates; i++) {
    newStateVector[i] = { real: 0, imag: 0 }
  }

  // For each basis state in the state vector
  for (let i = 0; i < numStates; i++) {
    // Extract the bit value of the target qubit in this basis state
    const targetBit = (i >> targetQubit) & 1
    
    // The state with the target qubit as |0⟩
    const state0 = i & ~(1 << targetQubit)
    // The state with the target qubit as |1⟩
    const state1 = i | (1 << targetQubit)
    
    // Apply the gate matrix
    // If target qubit is |0⟩: newState[i] += gateMatrix[targetBit][0] * stateVector[state0]
    // If target qubit is |1⟩: newState[i] += gateMatrix[targetBit][1] * stateVector[state1]
    
    const contrib0 = complexMul(gateMatrix[targetBit][0], stateVector[state0])
    const contrib1 = complexMul(gateMatrix[targetBit][1], stateVector[state1])
    
    newStateVector[i] = complexAdd(contrib0, contrib1)
  }

  // Update state vector
  for (let i = 0; i < numStates; i++) {
    stateVector[i] = newStateVector[i]
  }
}

function applyCNOT(
  stateVector: Complex[],
  numQubits: number,
  control: number,
  target: number
) {
  const numStates = stateVector.length
  const controlMask = 1 << control
  const targetMask = 1 << target

  for (let state = 0; state < numStates; state++) {
    // Only apply X to target if control is 1
    if ((state & controlMask) !== 0) {
      const flippedState = state ^ targetMask
      if (state < flippedState) {
        // Swap amplitudes
        const temp = stateVector[state]
        stateVector[state] = stateVector[flippedState]
        stateVector[flippedState] = temp
      }
    }
  }
}

function applyToffoli(
  stateVector: Complex[],
  numQubits: number,
  control1: number,
  control2: number,
  target: number
) {
  const numStates = stateVector.length
  const control1Mask = 1 << control1
  const control2Mask = 1 << control2
  const targetMask = 1 << target

  for (let state = 0; state < numStates; state++) {
    // Only apply X to target if both controls are 1
    if ((state & control1Mask) !== 0 && (state & control2Mask) !== 0) {
      const flippedState = state ^ targetMask
      if (state < flippedState) {
        // Swap amplitudes
        const temp = stateVector[state]
        stateVector[state] = stateVector[flippedState]
        stateVector[flippedState] = temp
      }
    }
  }
}

function generateCalculations(numQubits: number, gates: Array<{ type: string; qubits: number[]; position: number }>) {
  const steps: Array<{ title: string; math?: string; description?: string }> = []

  steps.push({
    title: 'Initial State',
    description: `All ${numQubits} qubits initialized to ground state`,
    math: `|\\psi_0\\rangle = |${'0'.repeat(numQubits)}\\rangle`
  })

  gates.forEach((gate, idx) => {
    const qubitIndices = gate.qubits.join(', ')
    
    switch (gate.type) {
      case 'H':
        steps.push({
          title: `Step ${idx + 1}: Hadamard on Qubit ${qubitIndices}`,
          description: `Creates equal superposition of |0⟩ and |1⟩`,
          math: `H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix}1 & 1\\\\1 & -1\\end{pmatrix}, \\quad H|0\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}}`
        })
        break
      case 'X':
        steps.push({
          title: `Step ${idx + 1}: Pauli-X on Qubit ${qubitIndices}`,
          description: `Quantum NOT gate - flips |0⟩ ↔ |1⟩`,
          math: `X = \\begin{pmatrix}0 & 1\\\\1 & 0\\end{pmatrix}, \\quad X|0\\rangle = |1\\rangle, \\quad X|1\\rangle = |0\\rangle`
        })
        break
      case 'Y':
        steps.push({
          title: `Step ${idx + 1}: Pauli-Y on Qubit ${qubitIndices}`,
          description: `Rotation around Y-axis by π radians`,
          math: `Y = \\begin{pmatrix}0 & -i\\\\i & 0\\end{pmatrix}, \\quad Y|0\\rangle = i|1\\rangle`
        })
        break
      case 'Z':
        steps.push({
          title: `Step ${idx + 1}: Pauli-Z on Qubit ${qubitIndices}`,
          description: `Phase flip - adds -1 phase to |1⟩`,
          math: `Z = \\begin{pmatrix}1 & 0\\\\0 & -1\\end{pmatrix}, \\quad Z|0\\rangle = |0\\rangle, \\quad Z|1\\rangle = -|1\\rangle`
        })
        break
      case 'S':
        steps.push({
          title: `Step ${idx + 1}: S Gate on Qubit ${qubitIndices}`,
          description: `Phase gate - adds π/2 phase to |1⟩`,
          math: `S = \\begin{pmatrix}1 & 0\\\\0 & i\\end{pmatrix}, \\quad S|1\\rangle = i|1\\rangle`
        })
        break
      case 'T':
        steps.push({
          title: `Step ${idx + 1}: T Gate on Qubit ${qubitIndices}`,
          description: `π/8 gate - adds π/4 phase to |1⟩`,
          math: `T = \\begin{pmatrix}1 & 0\\\\0 & e^{i\\pi/4}\\end{pmatrix}`
        })
        break
      case 'CNOT':
        steps.push({
          title: `Step ${idx + 1}: CNOT Gate`,
          description: `Control: qubit ${gate.qubits[0]}, Target: qubit ${gate.qubits[1]}`,
          math: `\\text{CNOT}|c,t\\rangle = |c, c \\oplus t\\rangle`
        })
        break
      case 'CCNOT':
        steps.push({
          title: `Step ${idx + 1}: Toffoli Gate`,
          description: `Controls: qubits ${gate.qubits[0]}, ${gate.qubits[1]}, Target: qubit ${gate.qubits[2]}`,
          math: `\\text{CCNOT}|c_1, c_2, t\\rangle = |c_1, c_2, (c_1 \\land c_2) \\oplus t\\rangle`
        })
        break
      case 'M':
        steps.push({
          title: `Step ${idx + 1}: Measurement on Qubit ${qubitIndices}`,
          description: `Collapses quantum state to classical bit`,
          math: `P(|0\\rangle) = |\\alpha|^2, \\quad P(|1\\rangle) = |\\beta|^2`
        })
        break
      case 'RX':
        steps.push({
          title: `Step ${idx + 1}: RX[π/2] on Qubit ${qubitIndices}`,
          description: `Rotation around X-axis by π/2 radians`,
          math: `R_X(\\frac{\\pi}{2}) = \\frac{1}{\\sqrt{2}}\\begin{pmatrix}1 & -i\\\\-i & 1\\end{pmatrix}`
        })
        break
      case 'RY':
        steps.push({
          title: `Step ${idx + 1}: RY[π/2] on Qubit ${qubitIndices}`,
          description: `Rotation around Y-axis by π/2 radians`,
          math: `R_Y(\\frac{\\pi}{2}) = \\frac{1}{\\sqrt{2}}\\begin{pmatrix}1 & -1\\\\1 & 1\\end{pmatrix}`
        })
        break
      case 'RZ':
        steps.push({
          title: `Step ${idx + 1}: RZ[π/2] on Qubit ${qubitIndices}`,
          description: `Rotation around Z-axis by π/2 radians`,
          math: `R_Z(\\frac{\\pi}{2}) = \\begin{pmatrix}e^{-i\\pi/4} & 0\\\\0 & e^{i\\pi/4}\\end{pmatrix}`
        })
        break
      default:
        steps.push({
          title: `Step ${idx + 1}: ${gate.type} on Qubit ${qubitIndices}`,
          description: `Apply ${gate.type} gate`
        })
    }
  })

  steps.push({
    title: 'Final Measurement',
    description: `Measurement collapses superposition to classical outcomes`,
    math: `P(|x\\rangle) = |\\langle x|\\psi_{\\text{final}}\\rangle|^2`
  })

  return steps
}
