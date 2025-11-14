import { NextRequest, NextResponse } from 'next/server'
import { transformImage } from '@/lib/image-processor'
import { checkUsageLimit, incrementUsage } from '@/lib/usage-tracker'
import { db } from '@/lib/db'
import crypto from 'crypto'

async function authenticateApiKey(request: NextRequest): Promise<{
  userId: string
  teamId?: string
  rateLimit: number
  apiKeyId: string
} | null> {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const apiKey = authHeader.substring(7)
  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex')

  const keys = await db.apiKeys.query({
    keyHash,
    isActive: true,
  })

  if (keys.length === 0) {
    return null
  }

  const key = keys[0]

  // Check expiration
  if (key.expiresAt && key.expiresAt < Date.now()) {
    return null
  }

  // Update last used
  await db.apiKeys.update(key.id, {
    lastUsedAt: Date.now(),
  })

  return {
    userId: key.userId,
    teamId: key.teamId || undefined,
    rateLimit: key.rateLimit,
    apiKeyId: key.id,
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate API key
    const auth = await authenticateApiKey(request)
    if (!auth) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }

    // Check rate limit (simplified - would use Redis in production)
    // TODO: Implement proper rate limiting with Redis/Vercel KV

    // Check usage limits
    const usageCheck = await checkUsageLimit(auth.userId, auth.teamId)
    if (!usageCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Usage limit exceeded',
          remaining: usageCheck.remaining,
        },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { image, prompt, style, outputFormat, quality } = body

    if (!image || !prompt) {
      return NextResponse.json(
        { error: 'Missing required fields: image and prompt' },
        { status: 400 }
      )
    }

    const startTime = Date.now()

    // Transform image
    const result = await transformImage({
      imageData: image,
      prompt,
      style: style || 'professional',
    })

    const processingTime = Date.now() - startTime

    // Increment usage
    await incrementUsage(auth.userId, auth.teamId, 1)

    // Log API usage
    await db.apiUsage.create({
      apiKeyId: auth.apiKeyId,
      endpoint: '/api/v1/transform',
      method: 'POST',
      statusCode: 200,
      responseTime: processingTime,
      imageCount: 1,
      requestedAt: Date.now(),
    })

    return NextResponse.json({
      success: true,
      transformedImage: result.transformedImageUrl,
      processingTime,
      usageRemaining: usageCheck.remaining - 1,
    })
  } catch (error) {
    console.error('API transform error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to transform image',
      },
      { status: 500 }
    )
  }
}

