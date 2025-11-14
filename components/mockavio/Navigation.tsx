'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/cn'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-mockavio-primary">
            Mockavio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="#industries" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Industries
            </Link>
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 bg-mockavio-primary text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors shadow-sm"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            <Link href="#features" className="block text-gray-700 hover:text-mockavio-primary">
              Features
            </Link>
            <Link href="#pricing" className="block text-gray-700 hover:text-mockavio-primary">
              Pricing
            </Link>
            <Link href="#industries" className="block text-gray-700 hover:text-mockavio-primary">
              Industries
            </Link>
            <Link href="/login" className="block text-gray-700 hover:text-mockavio-primary">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="block px-4 py-2 bg-mockavio-primary text-white rounded-md text-center"
            >
              Start Free Trial
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

