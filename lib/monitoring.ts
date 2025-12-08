/**
 * Monitoring & Logging System
 * Supports Sentry, custom logging, and performance tracking
 */

interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  context?: Record<string, unknown>
  timestamp: Date
  userId?: string
  requestId?: string
}

interface PerformanceMetric {
  name: string
  duration: number
  timestamp: Date
  metadata?: Record<string, unknown>
}

class MonitoringService {
  private logs: LogEntry[] = []
  private metrics: PerformanceMetric[] = []
  private sentryEnabled = false
  
  /**
   * Initialize Sentry
   */
  async initSentry(dsn?: string) {
    if (!dsn) return
    
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Sentry = await import('@sentry/nextjs' as any).catch(() => null) as { 
        init?: (options: { 
          dsn: string; 
          tracesSampleRate: number; 
          environment: string;
          beforeSend?: (event: Record<string, unknown>) => Record<string, unknown> | null
        }) => void 
      } | null
      if (!Sentry || !Sentry.init) {
        console.warn('⚠️ Sentry package not installed')
        return
      }
      Sentry.init({
        dsn,
        environment: process.env.NODE_ENV || 'development',
        tracesSampleRate: 1.0,
        beforeSend(event: Record<string, unknown>) {
          // Filter sensitive data
          const request = event.request as Record<string, unknown> | undefined
          if (request?.headers) {
            const headers = request.headers as Record<string, unknown>
            delete headers['authorization']
            delete headers['cookie']
          }
          return event
        }
      })
      this.sentryEnabled = true
      console.log('✅ Sentry monitoring initialized')
    } catch {
      console.warn('⚠️ Sentry not available')
    }
  }
  
  /**
   * Log message
   */
  log(level: LogEntry['level'], message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date()
    }
    
    this.logs.push(entry)
    
    // Console output
    const logFn = console[level] || console.log
    logFn(`[${level.toUpperCase()}]`, message, context || '')
    
    // Send to Sentry for errors
    if (level === 'error' && this.sentryEnabled) {
      this.captureException(new Error(message), context)
    }
    
    // Keep only last 1000 logs
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000)
    }
  }
  
  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context)
  }
  
  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context)
  }
  
  error(message: string, context?: Record<string, unknown>) {
    this.log('error', message, context)
  }
  
  debug(message: string, context?: Record<string, unknown>) {
    this.log('debug', message, context)
  }
  
  /**
   * Capture exception
   */
  async captureException(error: Error, context?: Record<string, unknown>) {
    this.error(error.message, { ...context, stack: error.stack })
    
    if (this.sentryEnabled) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Sentry = await import('@sentry/nextjs' as any).catch(() => null) as { captureException?: (error: Error, options?: { extra?: Record<string, unknown> }) => void } | null
        if (Sentry && Sentry.captureException) {
          Sentry.captureException(error, { extra: context })
        }
      } catch (e) {
        console.error('Failed to send to Sentry:', e)
      }
    }
  }
  
  /**
   * Track performance metric
   */
  trackMetric(name: string, duration: number, metadata?: Record<string, unknown>) {
    const metric: PerformanceMetric = {
      name,
      duration,
      timestamp: new Date(),
      metadata
    }
    
    this.metrics.push(metric)
    
    // Keep only last 500 metrics
    if (this.metrics.length > 500) {
      this.metrics = this.metrics.slice(-500)
    }
    
    // Log slow operations
    if (duration > 1000) {
      this.warn(`Slow operation: ${name} took ${duration}ms`, metadata)
    }
  }
  
  /**
   * Start performance tracking
   */
  startTracking(name: string) {
    const start = Date.now()
    return {
      end: (metadata?: Record<string, unknown>) => {
        const duration = Date.now() - start
        this.trackMetric(name, duration, metadata)
        return duration
      }
    }
  }
  
  /**
   * Get recent logs
   */
  getLogs(limit = 100): LogEntry[] {
    return this.logs.slice(-limit)
  }
  
  /**
   * Get metrics
   */
  getMetrics(limit = 100): PerformanceMetric[] {
    return this.metrics.slice(-limit)
  }
  
  /**
   * Get metrics summary
   */
  getMetricsSummary() {
    const summary: Record<string, { count: number; avgDuration: number; maxDuration: number }> = {}
    
    for (const metric of this.metrics) {
      if (!summary[metric.name]) {
        summary[metric.name] = { count: 0, avgDuration: 0, maxDuration: 0 }
      }
      
      const s = summary[metric.name]
      s.count++
      s.avgDuration = (s.avgDuration * (s.count - 1) + metric.duration) / s.count
      s.maxDuration = Math.max(s.maxDuration, metric.duration)
    }
    
    return summary
  }
  
  /**
   * Health check
   */
  getHealthStatus() {
    const recentErrors = this.logs.filter(
      log => log.level === 'error' && 
      Date.now() - log.timestamp.getTime() < 5 * 60 * 1000
    ).length
    
    return {
      status: recentErrors > 10 ? 'unhealthy' : 'healthy',
      recentErrors,
      totalLogs: this.logs.length,
      totalMetrics: this.metrics.length,
      uptime: process.uptime()
    }
  }
}

export const monitoring = new MonitoringService()
export default monitoring
