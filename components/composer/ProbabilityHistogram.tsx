'use client'

import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts'

interface ProbabilityHistogramProps {
  probabilities: { [state: string]: number }
  numQubits: number
}

export default function ProbabilityHistogram({ probabilities, numQubits }: ProbabilityHistogramProps) {
  const data = useMemo(() => {
    // Generate all possible states
    const numStates = Math.pow(2, numQubits)
    const allStates: Array<{ state: string; probability: number; rawProb: number }> = []
    
    for (let i = 0; i < numStates; i++) {
      const binaryState = i.toString(2).padStart(numQubits, '0')
      const prob = probabilities[binaryState] || 0
      allStates.push({
        state: `|${binaryState}⟩`,
        probability: prob * 100,
        rawProb: prob
      })
    }
    
    return allStates
  }, [probabilities, numQubits])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 p-2 rounded text-xs">
          <p className="text-yellow-400 font-mono">{payload[0].payload.state}</p>
          <p className="text-white font-bold">{payload[0].value.toFixed(2)}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={300}>
      <BarChart data={data} margin={{ top: 30, right: 10, left: 20, bottom: 60 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="state" 
          stroke="#9ca3af"
          tick={{ fill: '#ffffff', fontSize: 10, fontFamily: 'monospace' }}
          angle={-45}
          textAnchor="end"
          height={60}
          label={{ 
            value: 'Computational basis states', 
            position: 'insideBottom', 
            offset: -10, 
            fill: '#ffffff', 
            fontSize: 11 
          }}
        />
        <YAxis 
          stroke="#9ca3af"
          tick={{ fill: '#ffffff', fontSize: 10 }}
          domain={[0, 100]}
          label={{ 
            value: 'Probability (%)', 
            angle: -90, 
            position: 'insideLeft', 
            fill: '#ffffff', 
            fontSize: 11,
            offset: 5
          }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(250, 204, 21, 0.1)' }} />
        <Bar dataKey="probability" fill="#3b82f6" radius={[4, 4, 0, 0]}>
          <LabelList 
            dataKey="probability" 
            position="top" 
            formatter={(value: number) => value > 0 ? `${value.toFixed(1)}%` : ''}
            style={{ fill: '#ffffff', fontSize: 9, fontWeight: 'bold' }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
