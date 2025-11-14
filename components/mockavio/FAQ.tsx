'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

const faqs = [
  {
    question: 'How accurate are the AI transformations?',
    answer:
      'Mockavio\'s AI is trained on professional design and staging. Results are photorealistic and maintain proper spatial relationships, lighting, and scale. Many users report clients can\'t distinguish AI staging from real staging.',
  },
  {
    question: 'Do I own the images I create?',
    answer:
      'Yes! All images created with Mockavio belong to you. Use them in listings, presentations, marketing materials, social media - anywhere you need them. Professional and Enterprise plans include commercial licensing.',
  },
  {
    question: 'Can I remove the Mockavio branding?',
    answer:
      'Professional and Enterprise plans include white label exports. Add your own logo or export with no branding at all.',
  },
  {
    question: 'What if my client wants changes?',
    answer:
      'Make unlimited revisions at no extra cost. Try different colors, styles, layouts - whatever your client needs to see. No per-image fees, ever.',
  },
  {
    question: 'How long does a transformation take?',
    answer:
      'Most transformations complete in 30-60 seconds. Batch processing can handle 50+ images in a few minutes.',
  },
  {
    question: 'Can multiple team members use the same account?',
    answer:
      'Professional plans include 5 users. Enterprise plans include unlimited users. Each team member gets their own login and workspace.',
  },
  {
    question: 'Is there a limit on file size?',
    answer:
      'We support images up to 10MB. For best results, use high-quality photos at least 1920x1080 resolution.',
  },
  {
    question: 'What happens if I go over my monthly image limit?',
    answer:
      'We\'ll notify you when you reach 80% of your limit. You can upgrade anytime or purchase additional image packs. We\'ll never stop your account mid-project.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes, cancel anytime with one click. No cancellation fees, no questions asked. If you cancel mid-month, you keep access until the end of your billing period.',
  },
  {
    question: 'Do you offer training?',
    answer:
      'All plans include email support and access to our video tutorial library. Professional and Enterprise plans include priority support. Enterprise plans include white-glove onboarding and training sessions.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Mockavio
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ml-4',
                    openIndex === index && 'transform rotate-180'
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-5 bg-gray-50 text-gray-700 leading-relaxed border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

