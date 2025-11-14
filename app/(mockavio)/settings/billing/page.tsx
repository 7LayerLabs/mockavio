'use client'

import { useState, useEffect } from 'react'
import { AuthGuard } from '@/components/shared/AuthGuard'
import { CreditCard, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Subscription {
  plan: string
  status: string
  currentPeriodEnd: number
  cancelAtPeriodEnd: boolean
}

export default function BillingPage() {
  const router = useRouter()
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load subscription from database
    // This would use InstantDB queries in a real implementation
    setLoading(false)
  }, [])

  const handleUpgrade = async (plan: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      alert('Failed to start checkout')
    }
  }

  const handleManageBilling = async () => {
    try {
      const response = await fetch('/api/billing-portal', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to create portal session')
      }

      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      alert('Failed to open billing portal')
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Billing</h1>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              </div>
            ) : subscription ? (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 capitalize">
                      {subscription.plan} Plan
                    </h2>
                    <p className="text-sm text-gray-600">
                      Status: <span className="capitalize">{subscription.status}</span>
                    </p>
                  </div>
                  <button
                    onClick={handleManageBilling}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <CreditCard className="h-4 w-4" />
                    Manage Billing
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
                {subscription.currentPeriodEnd && (
                  <p className="text-sm text-gray-600">
                    Current period ends:{' '}
                    {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  No Active Subscription
                </h2>
                <p className="text-gray-600 mb-6">
                  Choose a plan to get started with Mockavio
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleUpgrade('starter')}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Starter - $99/mo
                  </button>
                  <button
                    onClick={() => handleUpgrade('professional')}
                    className="px-4 py-2 bg-mockavio-primary text-white rounded-md hover:bg-blue-800"
                  >
                    Professional - $299/mo
                  </button>
                  <button
                    onClick={() => router.push('/contact')}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Enterprise - Contact Sales
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

