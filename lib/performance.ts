// Performance utilities

// Debounce function for optimizing event handlers
export function debounce<T extends (...args: never[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for rate-limiting
export function throttle<T extends (...args: never[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Lazy load images with Intersection Observer
export function lazyLoadImage(img: HTMLImageElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target as HTMLImageElement
        const src = image.dataset.src
        if (src) {
          image.src = src
          image.classList.add('loaded')
          observer.unobserve(image)
        }
      }
    })
  })
  
  observer.observe(img)
}

// Preload critical resources
export function preloadResource(href: string, as: string) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.href = href
  link.as = as
  document.head.appendChild(link)
}

// Prefetch next page
export function prefetchPage(url: string) {
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.href = url
  document.head.appendChild(link)
}

// Measure performance
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start}ms`)
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get connection speed
export function getConnectionSpeed(): string {
  interface NavigatorWithConnection extends Navigator {
    connection?: { effectiveType?: string }
    mozConnection?: { effectiveType?: string }
    webkitConnection?: { effectiveType?: string }
  }
  const nav = navigator as NavigatorWithConnection
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection
  if (!connection) return 'unknown'
  return connection.effectiveType || 'unknown'
}

// Adaptive loading based on connection
export function shouldLoadHeavyContent(): boolean {
  const speed = getConnectionSpeed()
  return speed === '4g' || speed === 'unknown'
}

// Memory usage (if available)
export function getMemoryUsage() {
  interface PerformanceWithMemory extends Performance {
    memory?: {
      usedJSHeapSize: number
      totalJSHeapSize: number
      jsHeapSizeLimit: number
    }
  }
  const perf = performance as PerformanceWithMemory
  if (perf.memory) {
    return {
      used: Math.round(perf.memory.usedJSHeapSize / 1048576),
      total: Math.round(perf.memory.totalJSHeapSize / 1048576),
      limit: Math.round(perf.memory.jsHeapSizeLimit / 1048576)
    }
  }
  return null
}

// Request Idle Callback wrapper
export function runWhenIdle(callback: () => void, timeout = 2000) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout })
  } else {
    setTimeout(callback, 1)
  }
}

// Batch DOM updates
export function batchDOMUpdates(updates: (() => void)[]) {
  requestAnimationFrame(() => {
    updates.forEach(update => update())
  })
}
