import { NextRequest, NextResponse } from 'next/server'
import { transformImage } from '@/lib/image-processor'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, imageData, prompt, style } = body

    if (!prompt || (!imageUrl && !imageData)) {
      return NextResponse.json(
        { error: 'Missing required fields: prompt and imageUrl or imageData' },
        { status: 400 }
      )
    }

    // Transform image
    const result = await transformImage({
      prompt,
      style: style || 'professional',
      imageUrl,
      imageData,
    })

    // TODO: Save transformation to database
    // This would require user authentication and team context

    return NextResponse.json({
      success: true,
      transformedImageUrl: result.transformedImageUrl,
      processingTime: result.processingTime,
    })
  } catch (error) {
    console.error('Image processing error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to process image',
      },
      { status: 500 }
    )
  }
}

