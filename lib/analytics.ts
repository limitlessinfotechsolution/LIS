// Enhanced analytics utilities

interface LCPEntry extends PerformanceEntry {
  renderTime: number
  loadTime: number
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

// Track page views
export function trackPageView(url: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url
    })
  }
}

// Track custom events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
  }
}

// Track button clicks
export function trackButtonClick(buttonName: string, location: string) {
  trackEvent('click', 'Button', `${buttonName} - ${location}`)
}

// Track form submissions
export function trackFormSubmission(formName: string, success: boolean) {
  trackEvent(
    success ? 'form_submit_success' : 'form_submit_error',
    'Form',
    formName
  )
}

// Track downloads
export function trackDownload(fileName: string) {
  trackEvent('download', 'File', fileName)
}

// Track outbound links
export function trackOutboundLink(url: string) {
  trackEvent('click', 'Outbound Link', url)
}

// Track scroll depth
export function trackScrollDepth() {
  let maxScroll = 0
  const milestones = [25, 50, 75, 100]
  const tracked = new Set<number>()

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    )
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone)
          trackEvent('scroll', 'Scroll Depth', `${milestone}%`, milestone)
        }
      })
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  
  return () => window.removeEventListener('scroll', handleScroll)
}

// Track time on page
export function trackTimeOnPage() {
  const startTime = Date.now()
  
  const sendTimeOnPage = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    trackEvent('timing', 'Time on Page', window.location.pathname, timeSpent)
  }
  
  window.addEventListener('beforeunload', sendTimeOnPage)
  
  return () => window.removeEventListener('beforeunload', sendTimeOnPage)
}

// Track user engagement
export function trackEngagement(action: string, details?: string) {
  trackEvent('engagement', 'User Interaction', `${action}${details ? ` - ${details}` : ''}`)
}

// Track errors
export function trackError(error: Error, context?: string) {
  trackEvent('error', 'JavaScript Error', `${error.message}${context ? ` - ${context}` : ''}`)
}

// Track performance metrics
export function trackPerformance(metric: string, value: number) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value),
      event_category: 'Performance'
    })
  }
}

// Track Web Vitals
export function trackWebVitals() {
  if (typeof window === 'undefined') return

  // LCP - Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1] as LCPEntry
    const lcp = lastEntry.renderTime || lastEntry.loadTime
    trackPerformance('LCP', lcp)
  })
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

  // FID - First Input Delay
  const fidObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    entries.forEach((entry) => {
      const fidEntry = entry as PerformanceEventTiming
      const fid = fidEntry.processingStart - fidEntry.startTime
      trackPerformance('FID', fid)
    })
  })
  fidObserver.observe({ type: 'first-input', buffered: true })

  // CLS - Cumulative Layout Shift
  let clsValue = 0
  interface LayoutShiftEntry extends PerformanceEntry {
    hadRecentInput: boolean
    value: number
  }
  const clsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const layoutShift = entry as LayoutShiftEntry
      if (!layoutShift.hadRecentInput) {
        clsValue += layoutShift.value
      }
    }
  })
  clsObserver.observe({ type: 'layout-shift', buffered: true })

  // Send CLS on page unload
  window.addEventListener('beforeunload', () => {
    trackPerformance('CLS', clsValue * 1000)
  })
}

// Track search queries
export function trackSearch(query: string, resultsCount: number) {
  trackEvent('search', 'Site Search', query, resultsCount)
}

// Track video interactions
export function trackVideo(action: 'play' | 'pause' | 'complete', videoName: string) {
  trackEvent(action, 'Video', videoName)
}

// Track newsletter signup
export function trackNewsletterSignup(source: string) {
  trackEvent('signup', 'Newsletter', source)
}

// Track contact form
export function trackContactForm(formType: string, success: boolean) {
  trackEvent(
    success ? 'submit_success' : 'submit_error',
    'Contact Form',
    formType
  )
}
