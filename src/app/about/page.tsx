/**
 * About Page Component
 *
 * This component renders the About Us page, showcasing the company's mission
 * and team members. It uses Next.js Image component for optimized image loading
 * and the FadeInSection component for smooth animations.
 */

// Import necessary components and modules
import Image from "next/image"
import { FadeInSection } from "../../components/fade-in-section"

/**
 * AboutPage function component
 * Renders the structure and content of the About page
 * @returns JSX.Element
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#000410] text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* About Us Section */}
      <FadeInSection>
        <div className="max-w-7xl mx-auto">
          {/* Page Title and Introduction */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">About Us</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-400">
                We are a passionate team dedicated to creating innovative solutions that make a difference. Our diverse
                backgrounds and expertise allow us to tackle complex challenges with creative approaches.
              </p>
            </div>
          </div>

          {/* Our Goal Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-4">Our Goal</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-400 text-center">
                Our mission is to revolutionize the digital landscape by delivering exceptional products that exceed
                expectations and create lasting value for our clients and their users.
              </p>
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white/5 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
                <Image
                  src="/Truong_Dang_Kien.jpg?height=400&width=400"
                  alt="Team member"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Truong Dang Kien</h3>
                <p className="text-gray-400 mb-4">Leader</p>
                <p className="text-sm text-gray-500">
                  10+ years of experience in leading innovative tech companies and driving growth.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white/5 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
                <Image
                  src="/DuyLe.jpg?height=400&width=400"
                  alt="Team member"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Le Quoc Duy</h3>
                <p className="text-gray-400 mb-4">Technical Director</p>
                <p className="text-sm text-gray-500">Expert in software architecture and emerging technologies.</p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white/5 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
                <Image
                  src="/GiaHuy.jpg?height=400&width=400"
                  alt="Team member"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Dong Nguyen Gia Huy</h3>
                <p className="text-gray-400 mb-4">Design Lead</p>
                <p className="text-sm text-gray-500">
                  Passionate about creating beautiful and intuitive user experiences.
                </p>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white/5 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div className="aspect-w-1 aspect-h-1 relative overflow-hidden">
                <Image
                  src="/Pat.jpg?height=400&width=400"
                  alt="Team member"
                  width={400}
                  height={400}
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">Nguyen Tan Phat</h3>
                <p className="text-gray-400 mb-4">Product Manager</p>
                <p className="text-sm text-gray-500">
                  Skilled in product strategy and market analysis with user-centric focus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </main>
  )
}

