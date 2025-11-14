import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="relative py-24 bg-mockavio-primary text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          Stop Losing Deals Because Clients Can&apos;t Visualize
        </h2>
        <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-2xl mx-auto">
          Join 500+ professionals transforming how they present to clients
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center justify-center px-10 py-5 bg-white text-mockavio-primary rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-1 mb-10"
        >
          Start Your Free 14-Day Trial
          <ArrowRight className="ml-2 h-6 w-6" />
        </Link>
        <div className="flex flex-wrap justify-center gap-8 text-base">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            <span>Full refund guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5" />
            <span>Setup in 5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  )
}

