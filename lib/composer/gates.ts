export const GATE_COLORS = {
  SINGLE_QUBIT: 'bg-blue-400 text-black',
  PARAMETRIC: 'bg-pink-500 text-white',
  CONTROL: 'bg-red-500 text-white',
  SPECIAL: 'bg-indigo-500 text-white',
  MEASUREMENT: 'bg-green-500 text-white',
}

export const GATE_INFO: { [key: string]: { name: string; description: string; matrix: string; color: string; size: number } } = {
  H: {
    name: 'Hadamard Gate',
    description: 'Creates a superposition of |0⟩ and |1⟩. A fundamental gate for quantum computing.',
    matrix: '\\frac{1}{\\sqrt{2}}\\begin{bmatrix}1 & 1\\\\1 & -1\\end{bmatrix}',
    color: GATE_COLORS.SPECIAL,
    size: 1,
  },
  X: {
    name: 'Pauli-X Gate',
    description: 'A quantum NOT gate. It flips the state of a qubit from |0⟩ to |1⟩ and vice-versa.',
    matrix: '\\begin{bmatrix}0 & 1\\\\1 & 0\\end{bmatrix}',
    color: GATE_COLORS.SINGLE_QUBIT,
    size: 1,
  },
  Y: {
    name: 'Pauli-Y Gate',
    description: 'Rotates the qubit state around the Y-axis of the Bloch sphere by π radians.',
    matrix: '\\begin{bmatrix}0 & -i\\\\i & 0\\end{bmatrix}',
    color: GATE_COLORS.SINGLE_QUBIT,
    size: 1,
  },
  Z: {
    name: 'Pauli-Z Gate',
    description: 'Introduces a phase shift. Flips the phase of |1⟩ but leaves |0⟩ unchanged.',
    matrix: '\\begin{bmatrix}1 & 0\\\\0 & -1\\end{bmatrix}',
    color: GATE_COLORS.SINGLE_QUBIT,
    size: 1,
  },
  S: {
    name: 'S Gate (Phase Gate)',
    description: 'A √Z gate. It applies a π/2 phase shift to the |1⟩ state.',
    matrix: '\\begin{bmatrix}1 & 0\\\\0 & i\\end{bmatrix}',
    color: GATE_COLORS.SINGLE_QUBIT,
    size: 1,
  },
  T: {
    name: 'T Gate (π/8 Gate)',
    description: 'A √S gate. It applies a π/4 phase shift to the |1⟩ state. Not a Clifford gate.',
    matrix: '\\begin{bmatrix}1 & 0\\\\0 & e^{i\\pi/4}\\end{bmatrix}',
    color: GATE_COLORS.SINGLE_QUBIT,
    size: 1,
  },
  CNOT: {
    name: 'Controlled-NOT Gate',
    description: 'A two-qubit gate. Flips the target qubit if the control qubit is |1⟩. Creates entanglement.',
    matrix: '\\begin{bmatrix}1 & 0 & 0 & 0\\\\0 & 1 & 0 & 0\\\\0 & 0 & 0 & 1\\\\0 & 0 & 1 & 0\\end{bmatrix}',
    color: GATE_COLORS.CONTROL,
    size: 2,
  },
  CCNOT: {
    name: 'Toffoli Gate (CCX)',
    description: 'A three-qubit gate. Flips the target qubit if both control qubits are |1⟩. Universal for classical computation.',
    matrix: '\\begin{bmatrix}1&0&0&0&0&0&0&0\\\\0&1&0&0&0&0&0&0\\\\0&0&1&0&0&0&0&0\\\\0&0&0&1&0&0&0&0\\\\0&0&0&0&1&0&0&0\\\\0&0&0&0&0&1&0&0\\\\0&0&0&0&0&0&0&1\\\\0&0&0&0&0&0&1&0\\end{bmatrix}',
    color: GATE_COLORS.CONTROL,
    size: 3,
  },
  // Rotation gates with π/2 angle
  RZ: {
    name: 'RZ[π/2]',
    description: 'Rotation around the Z-axis by π/2 radians.',
    matrix: '\\begin{bmatrix}e^{-i\\pi/4} & 0\\\\0 & e^{i\\pi/4}\\end{bmatrix}',
    color: GATE_COLORS.PARAMETRIC,
    size: 1,
  },
  RX: {
    name: 'RX[π/2]',
    description: 'Rotation around the X-axis by π/2 radians.',
    matrix: '\\begin{bmatrix}\\cos(\\pi/4) & -i\\sin(\\pi/4)\\\\-i\\sin(\\pi/4) & \\cos(\\pi/4)\\end{bmatrix}',
    color: GATE_COLORS.PARAMETRIC,
    size: 1,
  },
  RY: {
    name: 'RY[π/2]',
    description: 'Rotation around the Y-axis by π/2 radians.',
    matrix: '\\begin{bmatrix}\\cos(\\pi/4) & -\\sin(\\pi/4)\\\\\\sin(\\pi/4) & \\cos(\\pi/4)\\end{bmatrix}',
    color: GATE_COLORS.PARAMETRIC,
    size: 1,
  },
  M: {
    name: 'Measurement',
    description: 'Measures the qubit in the computational basis, collapsing it to |0⟩ or |1⟩.',
    matrix: 'Projection operator',
    color: GATE_COLORS.MEASUREMENT,
    size: 1,
  },
}

export const ALL_GATES = Object.keys(GATE_INFO)
