import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  console.warn('GEMINI_API_KEY is not set')
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

export interface TransformOptions {
  prompt: string
  style?: 'realistic' | 'artistic' | 'professional'
  imageData?: string // base64 image data
  imageUrl?: string
}

export interface TransformResult {
  transformedImageUrl: string
  processingTime: number
}

export async function transformImage(options: TransformOptions): Promise<TransformResult> {
  if (!genAI) {
    throw new Error('Gemini API key not configured')
  }

  const startTime = Date.now()

  try {
    // Get image data from URL or use provided data
    let imageData: string
    if (options.imageData) {
      imageData = options.imageData
    } else if (options.imageUrl) {
      // Fetch image and convert to base64
      const response = await fetch(options.imageUrl)
      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      imageData = buffer.toString('base64')
    } else {
      throw new Error('Either imageData or imageUrl must be provided')
    }

    // Use Gemini 2.5 Flash Image model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    // Enhance prompt with style
    const enhancedPrompt = options.style
      ? `${options.prompt}. Style: ${options.style}, professional quality, photorealistic.`
      : `${options.prompt}. Professional quality, photorealistic.`

    // Generate transformation
    const result = await model.generateContent([
      {
        inlineData: {
          data: imageData,
          mimeType: 'image/jpeg',
        },
      },
      enhancedPrompt,
    ])

    const response = await result.response
    const imagePart = response.candidates?.[0]?.content?.parts?.[0]

    if (!imagePart || !('inlineData' in imagePart)) {
      throw new Error('No image generated in response')
    }

    const transformedImageData = imagePart.inlineData.data
    const transformedImageUrl = `data:${imagePart.inlineData.mimeType};base64,${transformedImageData}`

    const processingTime = Date.now() - startTime

    return {
      transformedImageUrl,
      processingTime,
    }
  } catch (error) {
    console.error('Image transformation error:', error)
    throw new Error(
      error instanceof Error ? error.message : 'Failed to transform image'
    )
  }
}

export async function batchTransformImages(
  images: Array<{ url: string; prompt: string }>,
  onProgress?: (completed: number, total: number) => void
): Promise<Array<{ originalUrl: string; transformedUrl: string }>> {
  const results: Array<{ originalUrl: string; transformedUrl: string }> = []

  for (let i = 0; i < images.length; i++) {
    const image = images[i]
    try {
      const result = await transformImage({
        imageUrl: image.url,
        prompt: image.prompt,
        style: 'professional',
      })
      results.push({
        originalUrl: image.url,
        transformedUrl: result.transformedImageUrl,
      })
      onProgress?.(i + 1, images.length)
    } catch (error) {
      console.error(`Failed to transform image ${i + 1}:`, error)
      // Continue with other images
    }
  }

  return results
}

