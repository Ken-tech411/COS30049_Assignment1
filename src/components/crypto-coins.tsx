"use client"

import { useState, useEffect } from "react"

// Helper function to format price with commas and two decimal places
const formatPrice = (price: number) => {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function CryptoCoins() {
  // State to hold the list of coins and their details
  const [coins, setCoins] = useState([
    { label: "Highest volume", name: "Bitcoin", price: "95,953.00", icon: "/BTC.svg" },
    { label: "Top gainer", name: "Ethereum", price: "2,609.80", icon: "/ETH.svg" },
    { label: "New listing", name: "Litecoin", price: "102.52", icon: "/Lite.svg" },
    { label: "Most traded", name: "Polkadot", price: "4.59", icon: "/Polka.svg" },
    { label: "Biggest gainers", name: "Solana", price: "194.08", icon: "/Sol.svg" },
    { label: "Trending", name: "Chainlink", price: "18.11", icon: "/Chainlink.svg" },
  ])

  // useEffect hook to update the prices at intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins((prevCoins) =>
        prevCoins.map((coin) => ({
          ...coin,
          // Update the price with a small random variation
          price: formatPrice(Number.parseFloat(coin.price.replace(/,/g, "")) * (1 + (Math.random() - 0.5) * 0.02)),
        })),
      )
    }, 2500) // Update every 2.5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-400 mb-2">
          Featured <span className="text-[#4ade80]">crypto coins</span>
        </p>
        <h2 className="text-3xl font-bold text-center mb-12">Top crypto coins updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coins.map((coin) => (
            <div key={coin.name} className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors">
              <p className="text-gray-400 text-sm mb-4">{coin.label}</p>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center">
                  <img src={coin.icon || "/placeholder.svg"} alt={coin.name} className="w-8 h-8" />
                </div>
                <span className="font-medium">{coin.name}</span>
              </div>
              <p className="text-lg font-semibold">${coin.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
