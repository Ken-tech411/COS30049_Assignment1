"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Headphones, Users, Gift, Layout, Shield, BarChart3, FileCode } from "lucide-react"

interface FadeInSectionProps {
  children: React.ReactNode
  direction?: "up" | "down"
}

/**
 * FadeInSection Component
 * 
 * Wrapper component that animates its children when they come into view
 * using IntersectionObserver. Supports fade-in from up or down directions.
 */
export function FadeInSection({ children, direction = "up" }: FadeInSectionProps) {
  const [isVisible, setVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting))
    })

    const currentElement = domRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [])

  const fadeClass = direction === "up" ? "translate-y-10" : "-translate-y-10"

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : `opacity-0 ${fadeClass}`
      }`}
      ref={domRef}
    >
      {children}
    </div>
  )
}

/**
 * Features Component
 * 
 * Displays the main features of the application in a responsive grid layout.
 * Includes animated sections that fade in when scrolled into view.
 */
export function Features() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <p className="text-gray-400">
              Why choose <span className="text-[#4ade80]">coinvest</span>
            </p>
            <h2 className="text-3xl font-bold mt-2">Features of the crypto framer mobile application</h2>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="bg-white/5 rounded-2xl pt-8 relative overflow-hidden">
            {/* Top row of features with icons */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-4">
                  <Headphones className="w-8 h-8 text-[#4ade80]" />
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-400 text-sm">Need help? Get your requests solved quickly via support team.</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#4ade80]" />
                </div>
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-gray-400 text-sm">Join the conversations on our worldwide Coinvest communities</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-[#4ade80]" />
                </div>
                <h3 className="font-semibold mb-2">Academy</h3>
                <p className="text-gray-400 text-sm">Learn blockchain and crypto for free with our templates.</p>
              </div>
            </div>

            <img src="/Graph.svg" alt="Activity Graph" className="w-full mt-auto" />
          </div>
        </FadeInSection>

        <div className="mt-24 mb-24">
          <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
            {/* Grid of main benefits with gradient backgrounds */}
            {[
              {
                icon: Layout,
                title: "User-Friendly Interface",
                description:
                  "Navigate our intuitive platform with ease, whether you're a seasoned trader or a newcomer",
                gradient: "from-purple-900/50 to-indigo-900/50",
              },
              {
                icon: Shield,
                title: "Advanced Security",
                description:
                  "Your assets are protected with top-tier security protocols, including multi-factor authentication and cold storage",
                gradient: "from-blue-900/50 to-cyan-900/50",
              },
              {
                icon: BarChart3,
                title: "Real-Time Market Data",
                description:
                  "Your assets are protected with top-tier security protocols, including multi-factor authentication and cold storage",
                gradient: "from-amber-900/50 to-red-900/50",
              },
              {
                icon: FileCode,
                title: "Smart Contract Integration",
                description: "Leverage the power of smart contracts for secure and transparent transactions",
                gradient: "from-emerald-900/50 to-teal-900/50",
              },
            ].map((benefit, index) => (
              <FadeInSection key={index}>
                <div
                  className={`bg-gradient-to-br ${benefit.gradient} p-8 rounded-xl transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90 flex flex-col h-full`}
                >
                  <benefit.icon className="w-10 h-10 text-[#4ade80] mb-4 flex-shrink-0" />
                  <h3 className="text-xl font-semibold mb-2 flex-shrink-0">{benefit.title}</h3>
                  <p className="text-gray-400 flex-grow">{benefit.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
