import type React from "react"

interface ChartContainerProps {
  config: {
    [key: string]: {
      label: string
      color: string
    }
  }
  children: React.ReactNode
}

const ChartContainer: React.FC<ChartContainerProps> = ({ children }) => {
  return <div className="w-full h-full text-gray-400">{children}</div>
}

export default ChartContainer

