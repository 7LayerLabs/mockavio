import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { logoUrl, watermarkText, showBranding, position, opacity } = body

    // Get user from auth
    const userId = 'user-id-placeholder'

    // Save or update white label settings
    const settings = await db.transact(async (tx) => {
      // Check if settings exist
      const existing = await tx.whiteLabelSettings.query({
        userId,
      })

      if (existing.length > 0) {
        return await tx.whiteLabelSettings.update(existing[0].id, {
          logoUrl: logoUrl || null,
          watermarkText: watermarkText || null,
          showBranding: showBranding !== undefined ? showBranding : true,
          position: position || 'bottom-right',
          opacity: opacity || 80,
          updatedAt: Date.now(),
        })
      } else {
        return await tx.whiteLabelSettings.create({
          userId,
          logoUrl: logoUrl || null,
          watermarkText: watermarkText || null,
          showBranding: showBranding !== undefined ? showBranding : true,
          position: position || 'bottom-right',
          opacity: opacity || 80,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        })
      }
    })

    return NextResponse.json({
      success: true,
      settings,
    })
  } catch (error) {
    console.error('Settings save error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to save settings',
      },
      { status: 500 }
    )
  }
}

