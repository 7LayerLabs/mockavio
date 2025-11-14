import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shareToken: string }> }
) {
  try {
    const { shareToken } = await params

    // Note: InstantDB query API - adjust based on actual InstantDB version
    const galleries = await (db as any).clientGalleries?.query?.({
      shareToken,
    }) || []

    if (galleries.length === 0) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 })
    }

    const gallery = galleries[0]

    // Check expiration
    if (gallery.expiresAt && gallery.expiresAt < Date.now()) {
      return NextResponse.json({ error: 'Gallery has expired' }, { status: 410 })
    }

    // Check if active
    if (!gallery.isActive) {
      return NextResponse.json({ error: 'Gallery is not active' }, { status: 403 })
    }

    // Check password
    if (gallery.password) {
      const password = request.nextUrl.searchParams.get('password')
      if (password !== gallery.password) {
        return NextResponse.json({ error: 'Password required' }, { status: 403 })
      }
    }

    // Get gallery images
    const images = await (db as any).galleryImages?.query?.({
      galleryId: gallery.id,
    }) || []

    // Increment view count
    await (db as any).clientGalleries?.update?.(gallery.id, {
      viewCount: gallery.viewCount + 1,
      lastViewedAt: Date.now(),
    })

    return NextResponse.json({
      success: true,
      gallery: {
        title: gallery.title,
        description: gallery.description,
        images: images.map((img: any) => ({
          id: img.id,
          imageUrl: img.imageUrl,
          title: img.title,
          votes: img.votes,
        })),
        allowDownloads: gallery.allowDownloads,
        allowComments: gallery.allowComments,
        expiresAt: gallery.expiresAt,
      },
    })
  } catch (error) {
    console.error('Gallery fetch error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch gallery',
      },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ shareToken: string }> }
) {
  try {
    const { shareToken } = await params
    const body = await request.json()
    const { password } = body

    // Note: InstantDB query API - adjust based on actual InstantDB version
    const galleries = await (db as any).clientGalleries?.query?.({
      shareToken,
    }) || []

    if (galleries.length === 0) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 })
    }

    const gallery = galleries[0]

    if (gallery.password !== password) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 403 })
    }

    // Return gallery data
    const images = await (db as any).galleryImages?.query?.({
      galleryId: gallery.id,
    }) || []

    return NextResponse.json({
      success: true,
      gallery: {
        title: gallery.title,
        description: gallery.description,
        images: images.map((img: any) => ({
          id: img.id,
          imageUrl: img.imageUrl,
          title: img.title,
          votes: img.votes,
        })),
        allowDownloads: gallery.allowDownloads,
        allowComments: gallery.allowComments,
        expiresAt: gallery.expiresAt,
      },
    })
  } catch (error) {
    console.error('Gallery password check error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to verify password',
      },
      { status: 500 }
    )
  }
}

