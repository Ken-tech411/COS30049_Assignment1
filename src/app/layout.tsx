import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
  fallback: ["Inter Fallback"]
})

import { Navigation } from "../components/navigation"
import { Footer } from "../components/footer"


export const metadata: Metadata = {
  title: "Crypto Explorer",
  description: "Explore cryptocurrency transactions and data",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>

      <body className={inter.className}>
        <div className="min-h-screen bg-[#000410]">
          <Navigation />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
