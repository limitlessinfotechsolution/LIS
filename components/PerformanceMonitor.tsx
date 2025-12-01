'use client'
import { useEffect } from 'react'

interface LCPEntry extends PerformanceEntry {
  renderTime: number
  loadTime: number
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as LCPEntry
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime)
      })
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime)
        })
      })
      fidObserver.observe({ type: 'first-input', buffered: true })

      // Cumulative Layout Shift (CLS)
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
            console.log('CLS:', clsValue)
          }
        }
      })
      clsObserver.observe({ type: 'layout-shift', buffered: true })

      // Time to First Byte (TTFB)
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          const navEntry = entry as PerformanceNavigationTiming
          console.log('TTFB:', navEntry.responseStart - navEntry.requestStart)
        })
      })
      navigationObserver.observe({ type: 'navigation', buffered: true })

      return () => {
        lcpObserver.disconnect()
        fidObserver.disconnect()
        clsObserver.disconnect()
        navigationObserver.disconnect()
      }
    }
  }, [])

  return null
}
