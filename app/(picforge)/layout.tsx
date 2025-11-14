import { getBrandConfig } from '@/lib/brand-config'

export default function PicForgeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const config = getBrandConfig('picforge')

  return (
    <div className="min-h-screen" style={{ 
      '--brand-primary': config.colors.primary,
      '--brand-secondary': config.colors.secondary,
      '--brand-accent': config.colors.accent,
    } as React.CSSProperties}>
      {children}
    </div>
  )
}

