import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('logo') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 2MB)' }, { status: 400 })
    }

    // Convert to base64 for storage
    // In production, you'd upload to cloud storage (S3, Vercel Blob, etc.)
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString('base64')
    const logoUrl = `data:${file.type};base64,${base64}`

    // TODO: Save to database and cloud storage
    // For now, return base64 data URL

    return NextResponse.json({
      success: true,
      logoUrl,
    })
  } catch (error) {
    console.error('Logo upload error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to upload logo',
      },
      { status: 500 }
    )
  }
}

