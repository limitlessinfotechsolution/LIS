'use client'

// Accessibility: Skip to main content link for keyboard navigation
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-[#2A52BE] focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#F97316]"
    >
      Skip to main content
    </a>
  )
}
