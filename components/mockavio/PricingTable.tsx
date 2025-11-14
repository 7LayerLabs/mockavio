'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

const plans = [
  {
    name: 'Starter',
    price: 99,
    period: 'month',
    description: 'Perfect for solo professionals',
    popular: false,
    features: [
      '1 user',
      '500 images/month',
      'All transformation features',
      'Email support',
      '14-day free trial',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Professional',
    price: 299,
    period: 'month',
    description: 'For teams and high-volume users',
    popular: true,
    features: [
      '5 users',
      '2,000 images/month',
      'Everything in Starter, plus:',
      'Team workspaces',
      'White label exports',
      'Client galleries',
      'API access',
      'Priority support',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For agencies and enterprises',
    popular: false,
    features: [
      'Unlimited users',
      'Unlimited images',
      'Everything in Professional, plus:',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantees',
      'White glove onboarding',
      'Custom contract terms',
    ],
    cta: 'Contact Sales',
  },
]

export function PricingTable() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600">
            Try any plan free for 14 days. No credit card required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                'bg-white rounded-2xl border p-8 relative transition-all',
                plan.popular
                  ? 'border-mockavio-primary shadow-xl scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-mockavio-primary text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center mb-2">
                  {typeof plan.price === 'number' ? (
                    <>
                      <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600 ml-2 text-lg">/{plan.period}</span>
                    </>
                  ) : (
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="h-5 w-5 text-mockavio-primary" />
                    </div>
                    <span className="text-gray-600 ml-3">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.name === 'Enterprise' ? '/contact' : '/signup'}
                className={cn(
                  'block w-full text-center py-3.5 px-4 rounded-xl font-semibold transition-all',
                  plan.popular
                    ? 'bg-mockavio-primary text-white hover:bg-blue-800 shadow-lg shadow-blue-500/25 hover:shadow-xl'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Not satisfied? Full refund within 30 days, no questions asked.
          </p>
        </div>
      </div>
    </section>
  )
}

