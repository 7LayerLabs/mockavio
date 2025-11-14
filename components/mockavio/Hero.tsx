'use client'

import Link from 'next/link'
import { ArrowRight, Play, Home, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 bg-blue-50"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Transform Client Visions Into Reality
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Professional visualization tools for realtors, designers, and restaurateurs.
            Show possibilities, close deals, save thousands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-mockavio-primary text-white rounded-xl font-semibold hover:bg-blue-800 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              Start Free 14-Day Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
            >
              <Play className="mr-2 h-5 w-5" />
              See How It Works
            </a>
          </div>
        </div>

        {/* Hero Image Placeholder - More polished */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <div className="grid grid-cols-2 gap-px bg-gray-200">
              <div className="bg-gray-200 aspect-video flex items-center justify-center p-8">
                <div className="text-center">
                  <Home className="h-12 w-12 text-gray-500 mb-2 mx-auto" />
                  <span className="text-gray-600 font-medium">Empty Room</span>
                </div>
              </div>
              <div className="bg-blue-50 aspect-video flex items-center justify-center p-8">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-gray-500 mb-2 mx-auto" />
                  <span className="text-gray-600 font-medium">Fully Staged</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

