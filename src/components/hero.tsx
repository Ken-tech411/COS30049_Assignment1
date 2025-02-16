"use client"

import { useEffect, useRef } from "react"

/**
 * Hero Component
 * 
 * Displays the main hero section with a title, description, and animated image.
 * Includes a call-to-action button and smooth image entrance animation.
 */
export function Hero() {
  const imageRef = useRef<HTMLImageElement>(null)

  // Animate image entrance from right to left
  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.transform = "translateX(100%)"
      imageRef.current.style.opacity = "0"
      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.transition = "transform 1s ease-out, opacity 1s ease-out"
          imageRef.current.style.transform = "translateX(0)"
          imageRef.current.style.opacity = "1"
        }
      }, 100)
    }
  }, [])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main content with title, description and CTA */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">Fast & Secure Cryptocurrency Exchange</h1>
            <p className="text-gray-400 text-lg">
              Trade cryptocurrencies with ease, security, and advanced features on our cutting-edge platform.
            </p>
            <button className="bg-[#4ade80] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#4ade80]/90 transition-colors">
              Explore More
            </button>
          </div>
          {/* Animated image container */}
          <div className="relative overflow-hidden">
            <img
              ref={imageRef}
              src="/Phone Entrance.svg"
              alt="Crypto trading app interface"
              className="w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
