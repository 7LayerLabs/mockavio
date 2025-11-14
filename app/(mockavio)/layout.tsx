import { getBrandConfig } from '@/lib/brand-config'

export default function MockavioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const config = getBrandConfig('mockavio')

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

