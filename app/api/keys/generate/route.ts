import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, permissions, expiresInDays } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const userId = 'user-id-placeholder'
    const teamId = body.teamId || null

    // Generate API key
    const apiKey = `mock_${crypto.randomBytes(32).toString('hex')}`
    const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex')
    const keyPrefix = apiKey.substring(0, 16) + '...'

    // Set rate limits based on plan
    const rateLimits: Record<string, number> = {
      starter: 0, // No API access
      professional: 100, // 100 requests/hour
      enterprise: 1000, // 1000 requests/hour
    }

    // Get team plan
    let rateLimit = 100 // default
    if (teamId) {
      const teams = await db.teams.query({ id: teamId })
      if (teams.length > 0) {
        rateLimit = rateLimits[teams[0].plan] || 100
      }
    }

    const key = await db.apiKeys.create({
      userId,
      teamId,
      name,
      keyHash,
      keyPrefix,
      permissions: permissions || ['transform'],
      rateLimit,
      isActive: true,
      createdAt: Date.now(),
      expiresAt: expiresInDays
        ? Date.now() + expiresInDays * 24 * 60 * 60 * 1000
        : null,
    })

    // Return API key only once (never stored in plain text)
    return NextResponse.json({
      success: true,
      apiKey, // Only time this is shown
      keyPrefix,
      keyId: key.id,
    })
  } catch (error) {
    console.error('API key generation error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate API key',
      },
      { status: 500 }
    )
  }
}

