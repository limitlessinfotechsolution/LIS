'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Analytics: Track page views and user interactions
export default function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: url,
      })
    }
  }, [pathname, searchParams])

  return null
}

// Track custom events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track form submissions
export function trackFormSubmission(formName: string) {
  trackEvent('form_submission', 'engagement', formName)
}

// Track button clicks
export function trackButtonClick(buttonName: string, location: string) {
  trackEvent('button_click', 'engagement', `${buttonName} - ${location}`)
}

// Track downloads
export function trackDownload(fileName: string) {
  trackEvent('download', 'engagement', fileName)
}

// Track outbound links
export function trackOutboundLink(url: string) {
  trackEvent('outbound_link', 'engagement', url)
}

// Note: Window.gtag is declared in lib/analytics.ts
