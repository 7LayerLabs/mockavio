import { headers } from 'next/headers'
import { getBrandFromHeaders } from '@/hooks/useBrand'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  try {
    const headersList = await headers()
    const brand = getBrandFromHeaders(headersList)
    
    // Redirect to brand-specific homepage
    if (brand === 'mockavio') {
      redirect('/mockavio')
    } else {
      redirect('/picforge')
    }
  } catch (error) {
    // Fallback to Mockavio if brand detection fails
    redirect('/mockavio')
  }
}

