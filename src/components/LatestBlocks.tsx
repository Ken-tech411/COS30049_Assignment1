import type React from "react"

/**
 * Block interface defining the structure of block data
 */
interface Block {
  number: number
  time: string
  transactions: number
}

/**
 * LatestBlocks Component
 * 
 * Displays a list of recent blockchain blocks with details
 * including block number, time, and transaction count.
 */
const LatestBlocks: React.FC = () => {
  // Sample block data (would typically come from an API)
  const latestBlocks: Block[] = [
    { number: 19376754, time: "5 secs ago", transactions: 8 },
    { number: 19376753, time: "17 secs ago", transactions: 12 },
    { number: 19376752, time: "29 secs ago", transactions: 5 },
    { number: 19376751, time: "41 secs ago", transactions: 10 },
    { number: 19376750, time: "53 secs ago", transactions: 7 },
  ]

  return (
    <div className="bg-[#0B1017] rounded-lg p-6">
      <h2 className="text-xl font-medium text-white mb-6">Latest Blocks</h2>
      {/* Block list container */}
      <div className="space-y-4">
        {/* Map through blocks and render each one */}
        {latestBlocks.map((block, index) => (
          <div key={index} className="flex justify-between items-start py-3 border-b border-[#1E2631] last:border-0">
            <div className="space-y-1">
              <div className="text-white font-medium">{block.number}</div>
              <div className="text-sm text-gray-400">{block.time}</div>
            </div>
            <div className="text-sm text-gray-400">Transactions: {block.transactions}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestBlocks
