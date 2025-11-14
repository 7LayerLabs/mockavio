import { NextRequest, NextResponse } from 'next/server'
import { createBillingPortalSession } from '@/lib/stripe'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    // Get user from auth
    const userId = 'user-id-placeholder'

    // Find team/user's Stripe customer ID
    const teams = await (db as any).teams?.query?.({
      ownerId: userId,
    }) || []

    if (teams.length === 0 || !teams[0].stripeCustomerId) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 400 }
      )
    }

    const session = await createBillingPortalSession(teams[0].stripeCustomerId)

    return NextResponse.json({
      success: true,
      url: session.url,
    })
  } catch (error) {
    console.error('Billing portal error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create portal session',
      },
      { status: 500 }
    )
  }
}

