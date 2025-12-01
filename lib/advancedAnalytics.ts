/**
 * Advanced Analytics System
 * Tracks user behavior, events, and provides insights
 */

export interface AnalyticsEvent {
  name: string
  properties?: Record<string, unknown>
  timestamp: Date
  userId?: string
  sessionId?: string
}

export interface UserSession {
  id: string
  startTime: Date
  endTime?: Date
  pageViews: number
  events: AnalyticsEvent[]
  device: string
  browser: string
  referrer: string
}

export interface PageView {
  path: string
  title: string
  timestamp: Date
  duration?: number
  scrollDepth?: number
}

class AdvancedAnalytics {
  private events: AnalyticsEvent[] = []
  private pageViews: PageView[] = []
  private currentSession: UserSession | null = null
  private sessionId: string = ''
  
  constructor() {
    if (typeof window !== 'undefined') {
      this.initSession()
      this.trackPageView()
      this.setupScrollTracking()
      this.setupClickTracking()
      this.setupExitIntent()
    }
  }
  
  /**
   * Initialize session
   */
  private initSession() {
    this.sessionId = this.getOrCreateSessionId()
    
    this.currentSession = {
      id: this.sessionId,
      startTime: new Date(),
      pageViews: 0,
      events: [],
      device: this.getDeviceType(),
      browser: this.getBrowser(),
      referrer: document.referrer
    }
  }
  
  /**
   * Track custom event
   */
  track(eventName: string, properties?: Record<string, unknown>) {
    const event: AnalyticsEvent = {
      name: eventName,
      properties,
      timestamp: new Date(),
      sessionId: this.sessionId
    }
    
    this.events.push(event)
    
    if (this.currentSession) {
      this.currentSession.events.push(event)
    }
    
    // Send to server
    this.sendToServer('event', event)
    
    // Send to Google Analytics if available
    interface WindowWithGtag extends Window {
      gtag?: (...args: unknown[]) => void
    }
    const win = window as WindowWithGtag
    if (typeof window !== 'undefined' && win.gtag) {
      win.gtag('event', eventName, properties)
    }
  }
  
  /**
   * Track page view
   */
  trackPageView(path?: string, title?: string) {
    const pageView: PageView = {
      path: path || window.location.pathname,
      title: title || document.title,
      timestamp: new Date()
    }
    
    this.pageViews.push(pageView)
    
    if (this.currentSession) {
      this.currentSession.pageViews++
    }
    
    this.sendToServer('pageview', pageView)
  }
  
  /**
   * Track scroll depth
   */
  private setupScrollTracking() {
    let maxScroll = 0
    let scrollTimeout: NodeJS.Timeout
    
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout)
      
      scrollTimeout = setTimeout(() => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        )
        
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent
          
          // Track milestones
          if ([25, 50, 75, 100].includes(scrollPercent)) {
            this.track('scroll_depth', { depth: scrollPercent })
          }
        }
      }, 150)
    })
  }
  
  /**
   * Track clicks
   */
  private setupClickTracking() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      
      // Track button clicks
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button')
        this.track('button_click', {
          text: button?.textContent?.trim(),
          id: button?.id,
          class: button?.className
        })
      }
      
      // Track link clicks
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target as HTMLAnchorElement : target.closest('a')
        this.track('link_click', {
          href: link?.href,
          text: link?.textContent?.trim(),
          external: link?.hostname !== window.location.hostname
        })
      }
    })
  }
  
  /**
   * Track exit intent
   */
  private setupExitIntent() {
    let exitIntentShown = false
    
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 0 && !exitIntentShown) {
        exitIntentShown = true
        this.track('exit_intent')
      }
    })
  }
  
  /**
   * Track form submission
   */
  trackFormSubmit(formName: string, success: boolean, data?: Record<string, unknown>) {
    this.track('form_submit', {
      form: formName,
      success,
      ...data
    })
  }
  
  /**
   * Track error
   */
  trackError(error: Error, context?: Record<string, unknown>) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      ...context
    })
  }
  
  /**
   * Track performance
   */
  trackPerformance(metric: string, value: number, unit = 'ms') {
    this.track('performance', {
      metric,
      value,
      unit
    })
  }
  
  /**
   * Get session data
   */
  getSession(): UserSession | null {
    return this.currentSession
  }
  
  /**
   * Get events
   */
  getEvents(limit = 100): AnalyticsEvent[] {
    return this.events.slice(-limit)
  }
  
  /**
   * Get page views
   */
  getPageViews(limit = 50): PageView[] {
    return this.pageViews.slice(-limit)
  }
  
  /**
   * Send data to server
   */
  private async sendToServer(type: string, data: AnalyticsEvent | PageView) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data, sessionId: this.sessionId })
      })
    } catch (error) {
      console.error('Failed to send analytics:', error)
    }
  }
  
  /**
   * Helper: Get or create session ID
   */
  private getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('analyticsSessionId')
    
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('analyticsSessionId', sessionId)
    }
    
    return sessionId
  }
  
  /**
   * Helper: Get device type
   */
  private getDeviceType(): string {
    const ua = navigator.userAgent
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet'
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile'
    }
    return 'desktop'
  }
  
  /**
   * Helper: Get browser
   */
  private getBrowser(): string {
    const ua = navigator.userAgent
    if (ua.includes('Firefox')) return 'Firefox'
    if (ua.includes('Chrome')) return 'Chrome'
    if (ua.includes('Safari')) return 'Safari'
    if (ua.includes('Edge')) return 'Edge'
    return 'Unknown'
  }
}

export const analytics = new AdvancedAnalytics()
export default analytics
