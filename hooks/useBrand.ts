import { getBrandConfig, type Brand } from '@/lib/brand-config'

// Server-side brand detection hook
export function getBrandFromHeaders(headers: Headers): Brand {
  const brandHeader = headers.get('x-brand')
  return (brandHeader as Brand) || 'mockavio'
}

// Client-side brand hook (for client components)
export function useBrand(brand: Brand = 'mockavio') {
  return {
    getBrandConfig: () => getBrandConfig(brand),
  }
}

