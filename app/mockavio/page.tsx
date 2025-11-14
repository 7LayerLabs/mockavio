import { Navigation } from '@/components/mockavio/Navigation'
import { Hero } from '@/components/mockavio/Hero'
import { ProblemStatement } from '@/components/mockavio/ProblemStatement'
import { SolutionFeatures } from '@/components/mockavio/SolutionFeatures'
import { HowItWorks } from '@/components/mockavio/HowItWorks'
import { IndustryShowcase } from '@/components/mockavio/IndustryShowcase'
import { PricingTable } from '@/components/mockavio/PricingTable'
import { Testimonials } from '@/components/mockavio/Testimonials'
import { FAQ } from '@/components/mockavio/FAQ'
import { FinalCTA } from '@/components/mockavio/FinalCTA'
import { Footer } from '@/components/mockavio/Footer'

export default function MockavioHomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProblemStatement />
      <SolutionFeatures />
      <HowItWorks />
      <IndustryShowcase />
      <PricingTable />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}

