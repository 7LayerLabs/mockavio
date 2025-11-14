export type Brand = 'picforge' | 'mockavio'

export interface BrandConfig {
  name: string
  tagline: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  features: {
    forge: boolean
    roulette: boolean
    roast: boolean
    nsfw: boolean
    batch: boolean
    canvas: boolean
    teamWorkspace?: boolean
    clientGallery?: boolean
    whiteLabelExport?: boolean
    apiAccess?: boolean
  }
  pricing: {
    free?: { images: number }
    pro?: { price: number; images: string | number }
    starter?: { price: number; users: number; images: number }
    professional?: { price: number; users: number; images: number }
    enterprise?: { price: string; users: string; images: string }
  }
}

export const BRANDS: Record<Brand, BrandConfig> = {
  picforge: {
    name: 'PicForge',
    tagline: 'Break Reality. Make Them Weird, Epic, Yours.',
    colors: {
      primary: '#14b8a6', // teal
      secondary: '#9333ea', // purple
      accent: '#f59e0b', // amber
    },
    features: {
      forge: true,
      roulette: true,
      roast: true,
      nsfw: true,
      batch: true,
      canvas: true,
    },
    pricing: {
      free: { images: 20 },
      pro: { price: 14, images: 'unlimited' },
    },
  },
  mockavio: {
    name: 'Mockavio',
    tagline: 'Transform Client Visions Into Reality',
    colors: {
      primary: '#1e40af', // deep blue
      secondary: '#475569', // slate
      accent: '#0ea5e9', // sky blue
    },
    features: {
      forge: true,
      roulette: false,
      roast: false,
      nsfw: false,
      batch: true,
      canvas: true,
      teamWorkspace: true,
      clientGallery: true,
      whiteLabelExport: true,
      apiAccess: true,
    },
    pricing: {
      starter: { price: 99, users: 1, images: 500 },
      professional: { price: 299, users: 5, images: 2000 },
      enterprise: { price: 'custom', users: 'unlimited', images: 'unlimited' },
    },
  },
}

export function getBrandConfig(brand: Brand): BrandConfig {
  return BRANDS[brand]
}

export function detectBrand(host: string): Brand {
  const mockavioDomain = process.env.NEXT_PUBLIC_MOCKAVIO_DOMAIN || 'mockavio.com'
  const picforgeDomain = process.env.NEXT_PUBLIC_PICFORGE_DOMAIN || 'pic-forge.com'

  if (host.includes('mockavio') || host.includes(mockavioDomain.replace('.com', ''))) {
    return 'mockavio'
  }
  
  if (host.includes('picforge') || host.includes('pic-forge') || host.includes(picforgeDomain.replace('.com', ''))) {
    return 'picforge'
  }

  // Default to Mockavio for new installations
  return 'mockavio'
}

