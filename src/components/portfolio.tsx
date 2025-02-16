import { Fingerprint, Wallet, TrendingUp, Settings } from "lucide-react"

/**
 * Portfolio Component
 * 
 * Displays a section for creating a crypto portfolio with steps to get started.
 * Includes icons, descriptions, and a call-to-action button.
 */
export function Portfolio() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="p-12 relative overflow-hidden">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Create your portfolio today</h2>
            <p className="text-gray-400 text-lg">Unlock endless optimized trading</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {/* Steps to create and manage crypto portfolio */}
              {[
                {
                  icon: Fingerprint,
                  title: "Verify your identity",
                  description: "Assets can be traded, withdrawn or used",
                },
                { icon: Wallet, title: "Fund your account", description: "Weekly earnings will be paid out monthly" },
                {
                  icon: TrendingUp,
                  title: "Start trading",
                  description: "Earnings are automatically added to accounts",
                },
                {
                  icon: Settings,
                  title: "Optimize your portfolio",
                  description: "With a single touch, generate stable income",
                },
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <step.icon className="w-6 h-6 text-[#4ade80]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}

              {/* Call-to-action button to explore wallet app */}
              <button className="bg-[#4ade80] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#4ade80]/90 transition-colors">
                Explore Wallet App →
              </button>
              <p className="text-gray-400">
                Why choose <span className="text-[#4ade80]">coinvest</span>
              </p>
            </div>

            <div className="relative hidden md:block">
              <img src="/CryptoWallet.png" alt="Portfolio Preview" className="w-full animate-walletAnimation" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
