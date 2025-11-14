export interface WhiteLabelSettings {
  logoUrl?: string | null
  watermarkText?: string | null
  showBranding: boolean
  position: string
  opacity: number
}

export interface ExportOptions {
  imageUrl: string
  settings: WhiteLabelSettings
  format?: 'png' | 'jpeg' | 'webp'
  quality?: number
}

/**
 * Apply white label branding to an image
 * Note: This is a client-side implementation using canvas
 * For production, you'd want server-side image processing
 */
export async function applyWhiteLabel(options: ExportOptions): Promise<string> {
  const { imageUrl, settings, format = 'png', quality = 0.9 } = options

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Failed to get canvas context'))
        return
      }

      // Draw original image
      ctx.drawImage(img, 0, 0)

      if (settings.showBranding) {
        // Apply logo if present
        if (settings.logoUrl) {
          const logoImg = new Image()
          logoImg.crossOrigin = 'anonymous'
          logoImg.onload = () => {
            const logoSize = Math.min(img.width, img.height) * 0.15
            const position = calculatePosition(
              settings.position,
              canvas.width,
              canvas.height,
              logoSize,
              logoSize
            )

            ctx.globalAlpha = settings.opacity / 100
            ctx.drawImage(logoImg, position.x, position.y, logoSize, logoSize)
            ctx.globalAlpha = 1.0

            // Apply watermark text if present
            if (settings.watermarkText) {
              applyWatermarkText(ctx, settings, canvas.width, canvas.height)
            }

            resolve(canvas.toDataURL(`image/${format}`, quality))
          }
          logoImg.onerror = () => {
            // If logo fails to load, just apply text watermark
            if (settings.watermarkText) {
              applyWatermarkText(ctx, settings, canvas.width, canvas.height)
            }
            resolve(canvas.toDataURL(`image/${format}`, quality))
          }
          logoImg.src = settings.logoUrl
        } else if (settings.watermarkText) {
          // Only text watermark
          applyWatermarkText(ctx, settings, canvas.width, canvas.height)
          resolve(canvas.toDataURL(`image/${format}`, quality))
        } else {
          // No branding, return original
          resolve(canvas.toDataURL(`image/${format}`, quality))
        }
      } else {
        // No branding requested
        resolve(canvas.toDataURL(`image/${format}`, quality))
      }
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    img.src = imageUrl
  })
}

function calculatePosition(
  position: string,
  canvasWidth: number,
  canvasHeight: number,
  elementWidth: number,
  elementHeight: number
): { x: number; y: number } {
  const padding = 20

  switch (position) {
    case 'bottom-right':
      return {
        x: canvasWidth - elementWidth - padding,
        y: canvasHeight - elementHeight - padding,
      }
    case 'bottom-left':
      return {
        x: padding,
        y: canvasHeight - elementHeight - padding,
      }
    case 'top-right':
      return {
        x: canvasWidth - elementWidth - padding,
        y: padding,
      }
    case 'top-left':
      return {
        x: padding,
        y: padding,
      }
    case 'center':
      return {
        x: (canvasWidth - elementWidth) / 2,
        y: (canvasHeight - elementHeight) / 2,
      }
    default:
      return {
        x: canvasWidth - elementWidth - padding,
        y: canvasHeight - elementHeight - padding,
      }
  }
}

function applyWatermarkText(
  ctx: CanvasRenderingContext2D,
  settings: WhiteLabelSettings,
  canvasWidth: number,
  canvasHeight: number
) {
  if (!settings.watermarkText) return

  ctx.save()
  ctx.globalAlpha = settings.opacity / 100
  ctx.font = '20px Arial'
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 2

  const position = calculatePosition(
    settings.position,
    canvasWidth,
    canvasHeight,
    ctx.measureText(settings.watermarkText).width,
    20
  )

  ctx.strokeText(settings.watermarkText, position.x, position.y + 20)
  ctx.fillText(settings.watermarkText, position.x, position.y + 20)
  ctx.restore()
}

