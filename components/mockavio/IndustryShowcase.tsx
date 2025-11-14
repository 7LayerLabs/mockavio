'use client'

import { useState } from 'react'
import { Home, Palette, UtensilsCrossed } from 'lucide-react'
import { cn } from '@/lib/cn'

const industries = [
  {
    id: 'real-estate',
    name: 'Real Estate Agents',
    icon: Home,
    headline: 'Sell Properties Faster with Virtual Staging',
    useCases: [
      'Empty room → Fully furnished in any style',
      'Dated spaces → Modern renovation previews',
      'Winter exterior → Summer curb appeal',
      'Night photo → Bright daylight shot',
      'Bare yard → Beautiful landscaping',
    ],
    testimonial: {
      quote:
        'I used to spend $2,000 staging each listing. Now I spend $99/month for unlimited staging on ALL my listings. Mockavio paid for itself on day one.',
      author: 'Sarah M., Keller Williams, Boston MA',
    },
    roi: {
      traditional: '$2,000/listing',
      mockavio: '$99/mo unlimited',
      breakEven: '1 listing every 2 months',
      savings: '$12,000+/year',
    },
  },
  {
    id: 'interior-design',
    name: 'Interior Designers',
    icon: Palette,
    headline: 'Show Concepts, Eliminate Change Orders',
    useCases: [
      'Try 10 color palettes in 10 minutes',
      'Show furniture scale and placement',
      'Test different design styles',
      'Lighting scenario previews',
      'Material and finish variations',
    ],
    testimonial: {
      quote:
        'Change orders used to eat 30% of my profit margin. Now I show clients exactly what they\'re getting before we order anything. My change orders dropped by 80%.',
      author: 'Jamie R., Interior Designer, Austin TX',
    },
    roi: {
      traditional: '$500-2,000/room (3D rendering)',
      mockavio: '$299/mo unlimited',
      breakEven: 'Prevent 1 change order = 1 year ROI',
      savings: '$3,500+ per prevented change order',
    },
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: UtensilsCrossed,
    headline: '10x Your Menu Content Without 10x Shoots',
    useCases: [
      'Transform 1 dish into 10 plating styles',
      'Seasonal menu variations',
      'Test new dishes digitally before cooking',
      'Social media content factory',
      'Ambiance and table setting mockups',
    ],
    testimonial: {
      quote:
        'We used to do quarterly photoshoots at $2,000 each. Now we shoot once and create hundreds of variations for social media and seasonal menus.',
      author: 'The Grove Kitchen, Portland OR',
    },
    roi: {
      traditional: '$2,000 x 4/year = $8,000',
      mockavio: '$199/mo = $2,388/year',
      breakEven: 'Immediate savings',
      savings: '$5,612/year + 5x more content',
    },
  },
]

export function IndustryShowcase() {
  const [activeTab, setActiveTab] = useState('real-estate')

  const activeIndustry = industries.find((ind) => ind.id === activeTab) || industries[0]
  const Icon = activeIndustry.icon

  return (
    <section id="industries" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Built for Your Industry
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-8 border-b border-gray-200">
          {industries.map((industry) => {
            const TabIcon = industry.icon
            return (
              <button
                key={industry.id}
                onClick={() => setActiveTab(industry.id)}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 border-b-2 transition-colors',
                  activeTab === industry.id
                    ? 'border-mockavio-primary text-mockavio-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                )}
              >
                <TabIcon className="h-5 w-5" />
                <span className="font-medium">{industry.name}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-mockavio-primary/10 rounded-lg p-3">
                <Icon className="h-8 w-8 text-mockavio-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{activeIndustry.headline}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4 text-gray-900">Use Cases:</h4>
                <ul className="space-y-2 text-gray-600">
                  {activeIndustry.useCases.map((useCase, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-mockavio-primary mr-2">✓</span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-gray-900">ROI Calculator:</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Traditional:</span>
                    <span className="font-semibold">{activeIndustry.roi.traditional}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mockavio:</span>
                    <span className="font-semibold text-mockavio-primary">
                      {activeIndustry.roi.mockavio}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Break-even:</span>
                    <span className="font-semibold">{activeIndustry.roi.breakEven}</span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-semibold">Average Savings:</span>
                      <span className="font-bold text-green-600">
                        {activeIndustry.roi.savings}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-mockavio-primary">
              <p className="text-gray-700 italic mb-2">&quot;{activeIndustry.testimonial.quote}&quot;</p>
              <p className="text-sm text-gray-600">- {activeIndustry.testimonial.author}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

