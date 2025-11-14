import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { headers } from 'next/headers'
import { getBrandFromHeaders } from '@/hooks/useBrand'
import { getBrandConfig } from '@/lib/brand-config'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const brand = getBrandFromHeaders(headersList)
  const config = getBrandConfig(brand)

  return {
    title: `${config.name} - ${config.tagline}`,
    description: config.tagline,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}

