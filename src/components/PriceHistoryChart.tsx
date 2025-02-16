"use client"

import type React from "react"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Functional component to render the price history chart
const PriceHistoryChart: React.FC = () => {
  // Initialize the state with static data
  const [data] = useState([
    { date: "2023-01-01", price: 1200 },
    { date: "2023-02-01", price: 1500 },
    { date: "2023-03-01", price: 1800 },
    { date: "2023-04-01", price: 2000 },
    { date: "2023-05-01", price: 1900 },
    { date: "2023-06-01", price: 2200 },
    { date: "2023-07-01", price: 2100 },
    { date: "2023-08-01", price: 2300 },
    { date: "2023-09-01", price: 2400 },
    { date: "2023-10-01", price: 2250 },
  ])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        {/* Grid lines */}
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2631" vertical={false} />
        {/* X-Axis configuration */}
        <XAxis dataKey="date" stroke="#4B5563" tick={{ fill: "#4B5563" }} tickLine={{ stroke: "#1E2631" }} />
        {/* Y-Axis configuration */}
        <YAxis stroke="#4B5563" tick={{ fill: "#4B5563" }} tickLine={{ stroke: "#1E2631" }} />
        {/* Line configuration */}
        <Line type="monotone" dataKey="price" stroke="#4ADE80" strokeWidth={2} dot={{ fill: "#4ADE80", r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PriceHistoryChart
