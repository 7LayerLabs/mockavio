import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ keyId: string }> }
) {
  try {
    const { keyId } = await params

    // Get user from auth
    const userId = 'user-id-placeholder'

    const keys = await db.apiKeys.query({
      id: keyId,
      userId,
    })

    if (keys.length === 0) {
      return NextResponse.json({ error: 'API key not found' }, { status: 404 })
    }

    // Revoke key (set inactive)
    await db.apiKeys.update(keyId, {
      isActive: false,
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('API key revocation error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to revoke API key',
      },
      { status: 500 }
    )
  }
}

