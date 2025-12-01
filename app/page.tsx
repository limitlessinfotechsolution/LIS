import dynamic from 'next/dynamic'
import AdvancedHero from '../components/AdvancedHero'
import AdvancedFeatures from '../components/AdvancedFeatures'

// Lazy load heavy components for better performance
const ComparisonSection = dynamic(() => import('../components/ComparisonSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
})

const ServicesGrid = dynamic(() => import('../components/ServicesGrid'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
})

const TestimonialsSlider = dynamic(() => import('../components/TestimonialsSlider'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
})

const TechStack = dynamic(() => import('../components/TechStack'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
})

const ProcessSection = dynamic(() => import('../components/ProcessSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
})

const ClientLogos = dynamic(() => import('../components/ClientLogos'), {
  loading: () => <div className="h-48 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
})

const PricingSection = dynamic(() => import('../components/PricingSection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
})

const Newsletter = dynamic(() => import('../components/Newsletter'), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
})

const CTASection = dynamic(() => import('../components/CTASection'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
})

export default function Home() {
  return (
    <>
      {/* Critical above-the-fold content - loads immediately */}
      <AdvancedHero />
      <AdvancedFeatures />
      
      {/* Below-the-fold content - lazy loaded for better performance */}
      <ComparisonSection />
      <ServicesGrid />
      <TechStack />
      <ProcessSection />
      <ClientLogos />
      <TestimonialsSlider />
      <PricingSection />
      <Newsletter />
      <CTASection />
    </>
  )
}
