'use client'

import { useState, useEffect } from 'react'
import { AuthGuard } from '@/components/shared/AuthGuard'
import { Image as ImageIcon, AlertCircle } from 'lucide-react'

interface UsageData {
  imageQuota: number
  imageUsed: number
  remaining: number
  percentage: number
}

export default function UsagePage() {
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUsage()
  }, [])

  const loadUsage = async () => {
    // Load usage from database
    // This would use InstantDB queries in a real implementation
    setUsage({
      imageQuota: 500,
      imageUsed: 150,
      remaining: 350,
      percentage: 30,
    })
    setLoading(false)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Usage</h1>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              </div>
            ) : usage ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-8 w-8 text-mockavio-primary" />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Image Transformations</h2>
                      <p className="text-sm text-gray-600">
                        {usage.imageUsed} of {usage.imageQuota} used this month
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {usage.remaining}
                    </div>
                    <div className="text-sm text-gray-600">remaining</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        usage.percentage >= 80
                          ? 'bg-red-500'
                          : usage.percentage >= 60
                          ? 'bg-yellow-500'
                          : 'bg-mockavio-primary'
                      }`}
                      style={{ width: `${usage.percentage}%` }}
                    ></div>
                  </div>
                </div>

                {usage.percentage >= 80 && (
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <p className="text-sm text-yellow-800">
                      You&apos;re approaching your monthly limit. Consider upgrading your plan.
                    </p>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-gray-600 mb-2">
                    Usage resets on{' '}
                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                  <a
                    href="/settings/billing"
                    className="text-mockavio-primary hover:text-mockavio-accent text-sm font-medium"
                  >
                    Upgrade plan →
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600">No usage data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

