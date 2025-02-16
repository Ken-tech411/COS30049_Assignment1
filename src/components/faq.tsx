/**
 * FAQ Component
 *
 * This component renders a Frequently Asked Questions (FAQ) section with expandable question-answer pairs
 * and a set of tutorial videos. It uses the FadeInSection component for smooth animations.
 */

"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { FadeInSection } from "./fade-in-section"

/**
 * FAQ function component
 * @returns JSX.Element
 */
export function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  // Define an array of FAQ items
  const questions = [
    {
      question: "What is Coinvest?",
      answer:
        "Coinvest is a comprehensive cryptocurrency trading platform that offers secure and efficient digital asset exchange services.",
    },
    {
      question: "Is Coinvest available worldwide?",
      answer:
        "Yes, Coinvest services are available in over 160 countries, providing global access to cryptocurrency trading.",
    },
    {
      question: "Which cryptocurrencies are supported on Coinvest?",
      answer:
        "Coinvest supports over 100 major cryptocurrencies including Bitcoin, Ethereum, Litecoin, and many more altcoins.",
    },
    {
      question: "Is my personal information secure with Coinvest?",
      answer:
        "Yes, we implement industry-leading security measures to protect your personal information and digital assets.",
    },
    {
      question: "Are there any deposit or withdrawal fees?",
      answer: "Fees vary by transaction type and cryptocurrency. We maintain competitive rates in the market.",
    },
    {
      question: "Does Coinvest offer advanced trading tools?",
      answer: "Yes, we provide advanced charting, technical analysis tools, and real-time market data for traders.",
    },
  ]

  // Define an array of tutorial video information
  const tutorials = [
    {
      id: "w-HDzwS52J0",
      title: "How does WEB 3 Change World?",
    },
    {
      id: "ubnGswJ9-fw",
      title: "Crypto Wallets Explained",
    },
    {
      id: "bKIHp4FGLhU",
      title: "Understanding Cryptocurrency",
    },
  ]

  // Render the FAQ section with questions, answers, and tutorial videos
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <FadeInSection>
          <div className="text-center mb-12">
            <p className="text-sm">
              Popular <span className="text-[#4ade80]">questions</span>
            </p>
            <h2 className="text-4xl font-bold mt-2">Learn more about Coinvest</h2>
            <p className="text-gray-400 mt-4">We accept 100+ cryptocurrencies around the world</p>
          </div>
        </FadeInSection>

        <div className="max-w-3xl mx-auto">
          {/* Render each FAQ item */}
          {questions.map((q, index) => (
            <FadeInSection key={index}>
              <div className="mb-4 bg-white/5 rounded-lg overflow-hidden">
                <div
                  className="p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                >
                  <h3 className="text-lg">{q.question}</h3>
                  {openQuestion === index ? (
                    <Minus className="w-5 h-5 text-[#4ade80] transition-transform" />
                  ) : (
                    <Plus className="w-5 h-5 text-[#4ade80] transition-transform" />
                  )}
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openQuestion === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="p-4 pt-0 text-gray-400">{q.answer}</div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
      <FadeInSection>
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Watch Our Tutorials</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Render tutorial video iframes */}
            {tutorials.map((tutorial, index) => (
              <div
                key={tutorial.id}
                className={`aspect-video bg-white/5 rounded-lg overflow-hidden ${index === 1 ? "md:col-start-2" : ""}`}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${tutorial.id}`}
                  title={tutorial.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                />
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  )
}

