import { Upload, MessageSquare, Presentation } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: Upload,
    title: 'Upload',
    description: 'Drag and drop your photo or paste from clipboard',
  },
  {
    number: '2',
    icon: MessageSquare,
    title: 'Describe',
    description: 'Tell Mockavio what you want to see',
    examples: [
      'Modern farmhouse staging with gray sectional',
      'Transform this dated kitchen to contemporary white and marble',
      'Show this pasta dish with fall plating and garnish',
    ],
  },
  {
    number: '3',
    icon: Presentation,
    title: 'Present',
    description:
      'Get professional results in 60 seconds. Show your client. Make revisions. Close the deal.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Three Steps to Professional Mockups
          </h2>
          <p className="text-xl text-gray-600">
            Get professional results in minutes, not days
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-mockavio-primary/20"></div>
                )}
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className="absolute w-24 h-24 bg-mockavio-primary/10 rounded-full animate-pulse"></div>
                  <div className="relative bg-mockavio-primary text-white rounded-2xl w-20 h-20 flex items-center justify-center text-3xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-xl p-3 shadow-lg border-2 border-gray-100">
                    <Icon className="h-7 w-7 text-mockavio-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                {step.examples && (
                  <ul className="text-left text-sm text-gray-500 space-y-2 bg-gray-50 rounded-xl p-4">
                    {step.examples.map((example, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-mockavio-primary mr-2">→</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

