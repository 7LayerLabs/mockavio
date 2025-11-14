import { Zap, Infinity, Award, Users, Image, Share2 } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Transform in 60 Seconds',
    description: 'Upload photo → Enter what you want → Get professional results',
    detail: 'Show clients 10 design options in the time it used to take to explain 1',
  },
  {
    icon: Infinity,
    title: 'Unlimited Revisions',
    description: 'Try every color, style, and layout. No per-image fees. No waiting.',
  },
  {
    icon: Award,
    title: 'Professional Quality',
    description: 'Built on professional design standards and industry best practices. Results that close deals.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share workspaces with your team. Build client presentation decks together.',
  },
  {
    icon: Image,
    title: 'White Label Exports',
    description: 'Add your logo. Remove our branding. Make it yours.',
  },
  {
    icon: Share2,
    title: 'Client Galleries',
    description: 'Share private links. Collect feedback. Track which designs clients love.',
  },
]

export function SolutionFeatures() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Everything you need to close more deals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Instant Visual Proof. Unlimited Iterations. Professional Results.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="group p-8 rounded-2xl border border-gray-200 hover:border-mockavio-primary/50 hover:shadow-lg transition-all bg-white">
                <div className="bg-mockavio-primary/10 rounded-xl w-14 h-14 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="h-7 w-7 text-mockavio-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-3 leading-relaxed">{feature.description}</p>
                {feature.detail && (
                  <p className="text-sm text-gray-500">{feature.detail}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

