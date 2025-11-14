import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe webhook not configured' },
      { status: 500 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.client_reference_id
        const teamId = session.metadata?.teamId

        if (userId && teamId) {
          // Update team subscription
          await db.teams.update(teamId, {
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            updatedAt: Date.now(),
          })
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Find team by customer ID
        const teams = await db.teams.query({
          stripeCustomerId: customerId,
        })

        if (teams.length > 0) {
          const team = teams[0]
          if (event.type === 'customer.subscription.deleted') {
            // Cancel subscription
            await db.teams.update(team.id, {
              plan: 'starter', // Downgrade to starter
              stripeSubscriptionId: '',
              updatedAt: Date.now(),
            })
          } else {
            // Update subscription
            await db.teams.update(team.id, {
              stripeSubscriptionId: subscription.id,
              updatedAt: Date.now(),
            })
          }
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        // Find team and update quota reset date
        const teams = await db.teams.query({
          stripeCustomerId: customerId,
        })

        if (teams.length > 0) {
          const team = teams[0]
          await db.teams.update(team.id, {
            imageUsed: 0, // Reset usage
            quotaResetDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now(),
          })
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Webhook handler failed',
      },
      { status: 500 }
    )
  }
}

