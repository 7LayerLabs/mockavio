const testimonials = [
  {
    quote:
    'Game changer for my business. I\'ve closed 3 deals this month by showing renovation potential.',
    author: 'Mike T.',
    company: 'RE/MAX',
    industry: 'Real Estate',
  },
  {
    quote:
    'My clients love seeing options instantly. It\'s like having a 3D rendering team in my pocket.',
    author: 'Lisa K.',
    company: 'RK Designs',
    industry: 'Interior Design',
  },
  {
    quote:
    'We create a week\'s worth of social content in an hour. Our engagement is up 200%.',
    author: 'Chef Marco',
    company: 'Bistro 42',
    industry: 'Restaurant',
  },
  {
    quote:
    'I was skeptical at first, but the quality is incredible. My buyers can\'t tell it\'s not real staging.',
    author: 'Jennifer S.',
    company: 'Coldwell Banker',
    industry: 'Real Estate',
  },
  {
    quote: 'Mockavio paid for itself on my first client. No more revision headaches.',
    author: 'David L.',
    company: 'Modern Interiors',
    industry: 'Interior Design',
  },
  {
    quote:
    'Finally, menu photography that doesn\'t break the bank. This is the future.',
    author: 'Amanda R.',
    company: 'The Daily Grind Cafe',
    industry: 'Restaurant',
  },
]

const stats = [
  { value: '$2.4M', label: 'saved in staging costs' },
  { value: '150K+', label: 'professional mockups created' },
  { value: '4.8/5', label: 'average rating' },
  { value: '97%', label: 'customer satisfaction rate' },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Trusted by Professionals Across Industries
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-4xl md:text-5xl font-bold text-mockavio-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-mockavio-primary/20 transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">&quot;{testimonial.quote}&quot;</p>
              <div className="border-t pt-4">
                <p className="font-bold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">
                  {testimonial.company} • {testimonial.industry}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

