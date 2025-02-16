import { Hero } from "../components/hero"
import { TrustedBy } from "../components/trusted-by"
import { CryptoCoins } from "../components/crypto-coins"
import { Features } from "../components/features"
import { FAQ } from "../components/faq"
import { Portfolio } from "../components/portfolio"
import { FadeInSection } from "../components/fade-in-section"

export default function Home() {
  return (
    <main className="text-white bg-[#000410]">
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection>
        <TrustedBy />
      </FadeInSection>
      <FadeInSection>
        <CryptoCoins />
      </FadeInSection>
      <Features />
      <FAQ />
      <FadeInSection>
        <Portfolio />
      </FadeInSection>
    </main>
  )
}
