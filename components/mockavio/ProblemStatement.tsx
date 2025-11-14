import { Home, Palette, UtensilsCrossed } from 'lucide-react'

export function ProblemStatement() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Your Clients Can&apos;t See What You See
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stop losing deals because clients can&apos;t visualize your vision
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Home className="h-12 w-12 text-mockavio-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Real Estate</h3>
            <p className="text-gray-600 leading-relaxed">
              Empty rooms don&apos;t sell. Traditional staging costs $2,000+ per property.
              Virtual staging companies take 48 hours and charge $50 per image. You need
              results now, not next week.
            </p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Palette className="h-12 w-12 text-mockavio-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Interior Design</h3>
            <p className="text-gray-600 leading-relaxed">
              Clients can&apos;t visualize your design concepts. Creating mockups takes hours.
              Change orders kill your margins. One &quot;I don&apos;t like that color&quot; costs
              you hundreds.
            </p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <UtensilsCrossed className="h-12 w-12 text-mockavio-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-gray-900">Restaurants</h3>
            <p className="text-gray-600 leading-relaxed">
              Menu photography costs $2,000 per shoot. Seasonal changes need new photos.
              Social media needs constant content. You can&apos;t afford a shoot every month.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

