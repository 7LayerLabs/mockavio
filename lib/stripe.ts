import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('STRIPE_SECRET_KEY is not set')
}

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    })
  : null

export const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_ID_STARTER || 'price_starter',
  professional: process.env.STRIPE_PRICE_ID_PROFESSIONAL || 'price_professional',
  enterprise: 'custom', // Enterprise is custom pricing
}

export async function createCheckoutSession(
  priceId: string,
  userId: string,
  teamId?: string
) {
  if (!stripe) {
    throw new Error('Stripe not configured')
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?canceled=true`,
    client_reference_id: userId,
    metadata: {
      userId,
      teamId: teamId || '',
    },
  })

  return session
}

export async function createBillingPortalSession(customerId: string) {
  if (!stripe) {
    throw new Error('Stripe not configured')
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
  })

  return session
}

