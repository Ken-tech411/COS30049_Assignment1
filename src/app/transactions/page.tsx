/**
 * Transactions Page Component
 *
 * This component renders the Transactions page, which includes a search functionality
 * for wallet addresses, displays transaction history, and visualizes transaction data
 * using various charts and graphs.
 */

"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Head from "next/head"
import PriceHistoryChart from "../../components/PriceHistoryChart"
import DailyTransactionsChart from "../../components/DailyTransactionChart"
import LatestBlocks from "../../components/LatestBlocks"
import LatestTransactions from "../../components/LatestTransactions"
import TransactionGraph from "../../components/TransactionGraph"
import { Search } from "lucide-react"

// Dummy data for crypto wallet addresses
const dummyWallets = [
  { address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", balance: "15.23 ETH" },
  { address: "0x123f681646d4a755815f9cb19e1acc8565a0c2ac", balance: "8.7 ETH" },
  { address: "0x8938d1f65154d7ae7785a179d5af0aee2d4114eb", balance: "5.87 ETH" },
  { address: "0x2b1c7b41f6a8f2b2bc45c3233a5d5fb3cd6dc238", balance: "12.45 ETH" },
  { address: "0x9e8f732b70a0a47d7433e3ad2c77c9a8ef26781c", balance: "3.12 ETH" },
  { address: "0x63a9975ba31b0b9626b34300f7f627147df1f526", balance: "7.98 ETH" },
  { address: "0x4b71d7b148558a3d83b780a4d3d15e3b0d1b31ee", balance: "9.54 ETH" },
  { address: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326", balance: "6.34 ETH" },
  { address: "0x7be8076f4ea4a4ad08075c2508e481d6c946d12b", balance: "11.67 ETH" },
  { address: "0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3", balance: "4.45 ETH" },
]

// Dummy transaction data
const dummyTransactions = [
  {
    source: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    target: "0x123f681646d4a755815f9cb19e1acc8565a0c2ac",
    amount: 1.5,
    date: "2024-02-16 10:30:15",
    transactionId: "0x1a2b3c4d5e6f7g8h9i0j",
  },
  {
    source: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    target: "0x8938d1f65154d7ae7785a179d5af0aee2d4114eb",
    amount: 0.5,
    date: "2024-02-16 10:25:30",
    transactionId: "0x2b3c4d5e6f7g8h9i0j1a",
  },
  {
    source: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    target: "0x2b1c7b41f6a8f2b2bc45c3233a5d5fb3cd6dc238",
    amount: 2.0,
    date: "2024-02-16 10:20:45",
    transactionId: "0x3c4d5e6f7g8h9i0j1a2b",
  },
  {
    source: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    target: "0x9e8f732b70a0a47d7433e3ad2c77c9a8ef26781c",
    amount: 1.0,
    date: "2024-02-16 10:15:00",
    transactionId: "0x4d5e6f7g8h9i0j1a2b3c",
  },
  {
    source: "0x123f681646d4a755815f9cb19e1acc8565a0c2ac",
    target: "0x63a9975ba31b0b9626b34300f7f627147df1f526",
    amount: 0.8,
    date: "2024-02-16 10:10:15",
    transactionId: "0x5e6f7g8h9i0j1a2b3c4d",
  },
  {
    source: "0x123f681646d4a755815f9cb19e1acc8565a0c2ac",
    target: "0x4b71d7b148558a3d83b780a4d3d15e3b0d1b31ee",
    amount: 1.2,
    date: "2024-02-16 10:05:30",
    transactionId: "0x6f7g8h9i0j1a2b3c4d5e",
  },
  {
    source: "0x8938d1f65154d7ae7785a179d5af0aee2d4114eb",
    target: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
    amount: 0.3,
    date: "2024-02-16 10:00:45",
    transactionId: "0x7g8h9i0j1a2b3c4d5e6f",
  },
  {
    source: "0x8938d1f65154d7ae7785a179d5af0aee2d4114eb",
    target: "0x7be8076f4ea4a4ad08075c2508e481d6c946d12b",
    amount: 0.7,
    date: "2024-02-16 09:55:00",
    transactionId: "0x8h9i0j1a2b3c4d5e6f7g",
  },
  {
    source: "0x2b1c7b41f6a8f2b2bc45c3233a5d5fb3cd6dc238",
    target: "0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3",
    amount: 1.5,
    date: "2024-02-16 09:50:15",
    transactionId: "0x9i0j1a2b3c4d5e6f7g8h",
  },
  {
    source: "0x9e8f732b70a0a47d7433e3ad2c77c9a8ef26781c",
    target: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    amount: 0.5,
    date: "2024-02-16 09:45:30",
    transactionId: "0x0j1a2b3c4d5e6f7g8h9i",
  },
  {
    source: "0x63a9975ba31b0b9626b34300f7f627147df1f526",
    target: "0x123f681646d4a755815f9cb19e1acc8565a0c2ac",
    amount: 1.0,
    date: "2024-02-16 09:40:45",
    transactionId: "0xj1a2b3c4d5e6f7g8h9i0",
  },
  {
    source: "0x4b71d7b148558a3d83b780a4d3d15e3b0d1b31ee",
    target: "0x8938d1f65154d7ae7785a179d5af0aee2d4114eb",
    amount: 0.9,
    date: "2024-02-16 09:35:00",
    transactionId: "0x1a2b3c4d5e6f7g8h9i0k",
  },
  {
    source: "0x1f9090aaE28b8a3dCeaDf281B0F12828e676c326",
    target: "0x2b1c7b41f6a8f2b2bc45c3233a5d5fb3cd6dc238",
    amount: 1.1,
    date: "2024-02-16 09:30:15",
    transactionId: "0x2b3c4d5e6f7g8h9i0k1a",
  },
  {
    source: "0x7be8076f4ea4a4ad08075c2508e481d6c946d12b",
    target: "0x9e8f732b70a0a47d7433e3ad2c77c9a8ef26781c",
    amount: 0.6,
    date: "2024-02-16 09:25:30",
    transactionId: "0x3c4d5e6f7g8h9i0k1a2b",
  },
  {
    source: "0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3",
    target: "0x63a9975ba31b0b9626b34300f7f627147df1f526",
    amount: 0.4,
    date: "2024-02-16 09:20:45",
    transactionId: "0x4d5e6f7g8h9i0k1a2b3c",
  },
]

const fadeOutClass = "opacity-0 transition-opacity duration-300 ease-in-out"

/**
 * Transactions function component
 * Manages the state and rendering of the Transactions page
 * @returns JSX.Element
 */
export default function Transactions() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [validAddress, setValidAddress] = useState<string | null>(null)
  const [addressDetails, setAddressDetails] = useState<(typeof dummyWallets)[0] | null>(null)
  const [focusedTransactions, setFocusedTransactions] = useState<typeof dummyTransactions>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<Array<{ address: string; balance: string }>>([])
  const prevSearchTermRef = useRef("")
  const [isVisible, setIsVisible] = useState(false)

  const handleNodeClick = useCallback((address: string) => {
    setSearchTerm(address)
    handleSearch(address)
  }, [])

  useEffect(() => {
    const results = dummyWallets.filter((wallet) => wallet.address.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(results)
  }, [searchTerm])

  useEffect(() => {
    const address = searchParams.get("address")
    if (address) {
      setSearchTerm(address)
      handleSearch(address)
    }
    setIsVisible(true)
  }, [searchParams])

  // Handle search submission
  const handleSearch = useCallback((address: string) => {
    setIsLoading(true)

    setTimeout(() => {
      const wallet = dummyWallets.find((w) => w.address.toLowerCase() === address.toLowerCase())
      if (wallet) {
        setValidAddress(wallet.address)
        setAddressDetails(wallet)
        const relatedTransactions = dummyTransactions.filter(
          (t) => t.source === wallet.address || t.target === wallet.address,
        )
        setFocusedTransactions(relatedTransactions)
      } else {
        setValidAddress(null)
        setAddressDetails(null)
        setFocusedTransactions([])
      }
      setIsLoading(false)
    }, 300)
  }, [])

  // Clear search results and reset state
  const handleClear = () => {
    if (searchTerm) {
      setIsVisible(false)
      setTimeout(() => {
        setSearchTerm("")
        setValidAddress(null)
        setAddressDetails(null)
        setFocusedTransactions([])
        setIsVisible(true)
      }, 300)
    }
  }

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm)
    }
  }, [searchTerm, handleSearch])

  const buttonStyle = {
    "--button-width": "120px",
    "--button-height": "40px",
  } as React.CSSProperties

  return (
    <>
      <Head>
        <title>Transactions - Crypto Explorer</title>
        <meta name="description" content="View cryptocurrency transactions and data" />
      </Head>
      <div
        className={`min-h-screen text-white transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="container mx-auto px-4 py-8">
          {/* Search functionality */}
          <div className="mb-8">
            {/* Search input and buttons */}
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <div className="relative flex items-center bg-gray-900 rounded-md">
                  <Search className="absolute left-3 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search wallet address..."
                    className="flex-1 bg-transparent pl-9 pr-3 py-2 h-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                  />
                </div>
                {isSearchFocused && searchTerm && (
                  <div className="absolute mt-2 w-full bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-10">
                    {searchResults.length > 0 ? (
                      <ul className="py-2">
                        {searchResults.map((wallet, index) => (
                          <li
                            key={index}
                            className="px-4 py-3 hover:bg-gray-800 cursor-pointer"
                            onClick={() => {
                              setSearchTerm(wallet.address)
                              handleSearch(wallet.address)
                              setIsSearchFocused(false)
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-mono text-sm">{wallet.address}</div>
                              <div className="text-[#4ade80] text-sm">{wallet.balance}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="px-4 py-3 text-gray-400">No matching wallets found</div>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  className="w-24 h-10 bg-green-700 text-white rounded-md hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
                  onClick={() => handleSearch(searchTerm)}
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
                <button
                  className={`w-24 h-10 bg-red-700 text-white rounded-md hover:bg-red-600 transition-all duration-300 flex items-center justify-center ${
                    searchTerm ? "opacity-100" : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={handleClear}
                  disabled={!searchTerm}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Transaction details and graph */}
          {validAddress && addressDetails && (
            <div className="space-y-6 mb-8">
              {/* Address details */}
              <div className="bg-gray-900 border-gray-800 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Address Details</h3>
                    <p className="font-mono text-gray-400">{addressDetails.address}</p>
                    <p className="text-[#4ade80] mt-2">Balance: {addressDetails.balance}</p>
                  </div>
                </div>
              </div>

              {/* Transaction graph */}
              <div className="bg-gray-900 border-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Transaction Graph</h3>
                <div className="h-[600px]">
                  <TransactionGraph
                    transactions={dummyTransactions}
                    focusAddress={validAddress}
                    onNodeClick={handleNodeClick}
                  />
                </div>
              </div>

              {/* Transaction history table */}
              <div className="bg-gray-900 border-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-800">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Transaction ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          From
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          To
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {focusedTransactions.map((tx, index) => (
                        <tr key={index} className="hover:bg-gray-800/50">
                          <td className="px-4 py-3 text-sm">{tx.date}</td>
                          <td className="px-4 py-3 text-sm font-mono">{tx.transactionId}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={tx.source === validAddress ? "text-[#4ade80]" : ""}>
                              {tx.source.substring(0, 6)}...{tx.source.slice(-4)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className={tx.target === validAddress ? "text-[#4ade80]" : ""}>
                              {tx.target.substring(0, 6)}...{tx.target.slice(-4)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{tx.amount} ETH</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Crypto statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Crypto statistics cards */}
            <div className="bg-gray-900 border-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Total blocks</div>
              <div className="text-2xl font-bold mt-1">19,369,534</div>
            </div>
            <div className="bg-gray-900 border-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Total transactions</div>
              <div className="text-2xl font-bold mt-1">2,285.09 M</div>
            </div>
            <div className="bg-gray-900 border-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Market cap</div>
              <div className="text-2xl font-bold mt-1">$465.90B</div>
            </div>
            <div className="bg-gray-900 border-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-400">Total accounts</div>
              <div className="text-2xl font-bold mt-1">322,758,486</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Price History and Daily Transactions charts */}
            <div className="bg-gray-900 border-gray-800 p-4 rounded-lg lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Price History</h3>
              <div className="h-[300px]">
                <PriceHistoryChart />
              </div>
            </div>
            <div className="bg-gray-900 border-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Daily Transactions</h3>
              <div className="h-[300px]">
                <DailyTransactionsChart />
              </div>
            </div>
          </div>

          {/* Latest blocks and transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LatestBlocks and LatestTransactions components */}
            <LatestBlocks />
            <LatestTransactions />
          </div>
        </div>
      </div>
    </>
  )
}

