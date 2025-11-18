// Utility functions for quantum mathematics and LaTeX formatting

// imaginary unit representation
export const i = "i"

// Function to format a 2D matrix as LaTeX bmatrix (square brackets)
export const bmatrix = (matrix: (number | string)[][]): string => {
  const rows = matrix
    .map((row) =>
      row
        .map((val) => {
          if (typeof val === "number") {
            // Format numbers nicely (round to avoid floating point errors)
            if (Math.abs(val) < 0.0001) return "0"
            if (val === Math.floor(val)) return val.toString()
            return val.toFixed(3).replace(/\.?0+$/, "")
          }
          return val
        })
        .join(" & "),
    )
    .join(" \\\\ ")

  return `\\begin{bmatrix} ${rows} \\end{bmatrix}`
}

// Keep pmatrix for backward compatibility, but use bmatrix
export const pmatrix = bmatrix

// Pauli X gate matrix
export const pauliX = pmatrix([
  [0, 1],
  [1, 0],
])

// Pauli Y gate matrix
export const pauliY = pmatrix([
  [0, `-${i}`],
  [i, 0],
])

// Pauli Z gate matrix
export const pauliZ = pmatrix([
  [1, 0],
  [0, -1],
])

// Hadamard gate matrix
export const hadamard = pmatrix([
  [`1/√2`, `1/√2`],
  [`1/√2`, `-1/√2`],
])

// RX rotation gate (parameterized by theta)
export const rxRotation = (theta = "θ") =>
  pmatrix([
    [`cos(${theta}/2)`, `-i·sin(${theta}/2)`],
    [`-i·sin(${theta}/2)`, `cos(${theta}/2)`],
  ])

// RY rotation gate (parameterized by theta)
export const ryRotation = (theta = "θ") =>
  pmatrix([
    [`cos(${theta}/2)`, `-sin(${theta}/2)`],
    [`sin(${theta}/2)`, `cos(${theta}/2)`],
  ])

// RZ rotation gate (parameterized by theta)
export const rzRotation = (theta = "θ") =>
  pmatrix([
    [`e^{-i·${theta}/2}`, 0],
    [0, `e^{i·${theta}/2}`],
  ])
