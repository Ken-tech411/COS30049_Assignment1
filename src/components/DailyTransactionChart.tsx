"use client"

import type React from "react"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const DailyTransactionsChart: React.FC = () => {
  const [data] = useState([
    { date: "2023-06-01", transactions: 100000 },
    { date: "2023-06-02", transactions: 120000 },
    { date: "2023-06-03", transactions: 110000 },
    { date: "2023-06-04", transactions: 130000 },
    { date: "2023-06-05", transactions: 140000 },
    { date: "2023-06-06", transactions: 125000 },
    { date: "2023-06-07", transactions: 135000 },
    { date: "2023-06-08", transactions: 145000 },
    { date: "2023-06-09", transactions: 138000 },
    { date: "2023-06-10", transactions: 150000 },
  ])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setData((prevData) => {
  //       const newData = [...prevData]
  //       const lastTransactions = newData[newData.length - 1].transactions
  //       const newTransactions = Math.max(0, lastTransactions + (Math.random() - 0.5) * 20000)
  //       const newDate = new Date(new Date(newData[newData.length - 1].date).getTime() + 24 * 60 * 60 * 1000)
  //       newData.push({
  //         date: newDate.toISOString().split("T")[0],
  //         transactions: Math.round(newTransactions),
  //       })
  //       if (newData.length > 7) newData.shift()
  //       return newData
  //     })
  //   }, 5000)
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E2631" vertical={false} />
        <XAxis dataKey="date" stroke="#4B5563" tick={{ fill: "#4B5563" }} tickLine={{ stroke: "#1E2631" }} />
        <YAxis stroke="#4B5563" tick={{ fill: "#4B5563" }} tickLine={{ stroke: "#1E2631" }} />
        <Line type="monotone" dataKey="transactions" stroke="#4ADE80" strokeWidth={2} dot={{ fill: "#4ADE80", r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default DailyTransactionsChart

