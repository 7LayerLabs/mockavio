import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, PRICE_IDS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plan, teamId } = body

    if (!plan || !PRICE_IDS[plan as keyof typeof PRICE_IDS]) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      )
    }

    const priceId = PRICE_IDS[plan as keyof typeof PRICE_IDS]

    if (priceId === 'custom') {
      return NextResponse.json(
        { error: 'Please contact sales for enterprise pricing' },
        { status: 400 }
      )
    }

    // Get user from auth
    const userId = 'user-id-placeholder'

    const session = await createCheckoutSession(priceId, userId, teamId)

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create checkout session',
      },
      { status: 500 }
    )
  }
}

