import type React from "react"

/**
 * Transaction interface defining the structure of transaction data
 */
interface Transaction {
  hash: string
  time: string
  amount: string
  type: string
}

/**
 * LatestTransactions Component
 * 
 * Displays a list of recent cryptocurrency transactions with details
 * including hash, time, amount, and transaction type.
 */
const LatestTransactions: React.FC = () => {
  // Sample transaction data (would typically come from an API)
  const latestTransactions: Transaction[] = [
    { hash: "0x6152...0a39db", time: "2m ago", amount: "0.25542 ETH", type: "Coin transfer" },
    { hash: "0x7263...1b40ec", time: "3m ago", amount: "0.1 ETH", type: "Contract call" },
    { hash: "0x8374...2c51fd", time: "5m ago", amount: "1.5 ETH", type: "Coin transfer" },
    { hash: "0x9485...3d62ge", time: "7m ago", amount: "0.05 ETH", type: "Token transfer" },
    { hash: "0xa596...4e73hf", time: "10m ago", amount: "0.75 ETH", type: "Coin transfer" },
  ]

  return (
    <div className="bg-[#0B1017] rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-white">Latest Transactions</h2>
        <button className="text-sm text-[#4ADE80] hover:text-[#3FCF70] transition-colors">View all</button>
      </div>
      {/* Transaction list container */}
      <div className="space-y-4">
        {/* Map through transactions and render each one */}
        {latestTransactions.map((transaction, index) => (
          <div key={index} className="flex justify-between items-start py-3 border-b border-[#1E2631] last:border-0">
            <div className="space-y-1">
              <div className="text-white font-medium">{transaction.hash}</div>
              <div className="text-sm text-gray-400">{transaction.time}</div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-white">{transaction.amount}</div>
              <div className="text-sm text-gray-400">{transaction.type}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestTransactions
