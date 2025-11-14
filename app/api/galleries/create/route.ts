import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendGalleryShareEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      imageUrls,
      expiresInDays = 30,
      password,
      allowDownloads = true,
      allowComments = true,
      requireEmail = false,
    } = body

    if (!title || !imageUrls || imageUrls.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: title and imageUrls' },
        { status: 400 }
      )
    }

    const userId = 'user-id-placeholder'
    const teamId = body.teamId || null

    // Generate share token
    const shareToken = crypto.randomUUID().replace(/-/g, '').substring(0, 16)

    const gallery = await db.transact(async (tx) => {
      const gallery = await tx.clientGallery.create({
        teamId,
        userId,
        title,
        description: description || '',
        shareToken,
        password: password || null,
        expiresAt: Date.now() + expiresInDays * 24 * 60 * 60 * 1000,
        isActive: true,
        allowDownloads,
        allowComments,
        requireEmail,
        viewCount: 0,
        createdAt: Date.now(),
        lastViewedAt: Date.now(),
      })

      // Create gallery images
      for (let i = 0; i < imageUrls.length; i++) {
        await tx.galleryImage.create({
          galleryId: gallery.id,
          imageUrl: imageUrls[i],
          thumbnailUrl: imageUrls[i], // In production, generate thumbnails
          title: `Option ${i + 1}`,
          description: '',
          order: i,
          votes: 0,
          createdAt: Date.now(),
        })
      }

      return gallery
    })

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/gallery/${shareToken}`

    return NextResponse.json({
      success: true,
      galleryId: gallery.id,
      shareUrl,
      shareToken,
    })
  } catch (error) {
    console.error('Gallery creation error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create gallery',
      },
      { status: 500 }
    )
  }
}

