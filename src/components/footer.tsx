import Link from "next/link"
import { Twitter, Instagram, Facebook } from "lucide-react"

/**
 * Footer Component
 * 
 * Displays the site footer with navigation links, social media links,
 * and app download buttons. Organized into four main sections.
 */
export function Footer() {
  return (
    <footer className="border-t bg-[#000410] text-white  border-white/10 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Branding and social media section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                <img src="/ETH-Rainbow.svg" alt="Coinvest Logo" className="w-6 h-6" />
              </div>
              <span className="font-semibold">Coinvest</span>
            </div>
            <p className="text-gray-400 text-sm">
              Transform your crypto business with Coinvest Framer, a template for startups and blockchain services.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20"
              >
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Main navigation links */}
          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <div className="space-y-3 text-gray-400">
              <Link href="#" className="block hover:text-white">
                Features
              </Link>
              <Link href="#" className="block hover:text-white">
                Benefits
              </Link>
              <Link href="#" className="block hover:text-white">
                Services
              </Link>
              <Link href="#" className="block hover:text-white">
                Upgrade
              </Link>
            </div>
          </div>

          {/* Additional pages and legal links */}
          <div>
            <h3 className="font-semibold mb-4">Other Pages</h3>
            <div className="space-y-3 text-gray-400">
              <Link href="#" className="block hover:text-white">
                Error 404
              </Link>
              <Link href="#" className="block hover:text-white">
                Terms & Conditions
              </Link>
              <Link href="#" className="block hover:text-white">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* App download section */}
          <div>
            <h3 className="font-semibold mb-4">Download app</h3>
            <div className="space-y-4">
              <Link href="#" className="block">
                <img src="/google-play.png" alt="Get it on Google Play" className="h-12" />
              </Link>
              <Link href="#" className="block">
                <img src="/app-store.png" alt="Download on the App Store" className="h-12" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
