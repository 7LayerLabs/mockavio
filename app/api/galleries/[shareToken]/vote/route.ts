import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ shareToken: string }> }
) {
  try {
    const { shareToken } = await params
    const body = await request.json()
    const { imageId } = body

    if (!imageId) {
      return NextResponse.json({ error: 'Missing imageId' }, { status: 400 })
    }

    // Find gallery
    const galleries = await (db as any).clientGalleries?.query?.({
      shareToken,
    }) || []

    if (galleries.length === 0) {
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 })
    }

    // Find image
    const images = await (db as any).galleryImages?.query?.({
      id: imageId,
      galleryId: galleries[0].id,
    }) || []

    if (images.length === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    const image = images[0]

    // Increment votes
    await (db as any).galleryImages?.update?.(image.id, {
      votes: image.votes + 1,
    })

    return NextResponse.json({
      success: true,
      newVoteCount: image.votes + 1,
    })
  } catch (error) {
    console.error('Vote error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to vote',
      },
      { status: 500 }
    )
  }
}

