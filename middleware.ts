import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limit configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // Max requests per window
  apiWindowMs: 60 * 1000, // 1 minute for API
  apiMaxRequests: 30 // Max API requests per minute
}

function getRateLimitKey(request: NextRequest): string {
  // Use IP address or user identifier
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return `${ip}-${request.nextUrl.pathname}`
}

function checkRateLimit(key: string, isApi: boolean): boolean {
  const now = Date.now()
  const limit = isApi ? RATE_LIMIT.apiMaxRequests : RATE_LIMIT.maxRequests
  const window = isApi ? RATE_LIMIT.apiWindowMs : RATE_LIMIT.windowMs
  
  const record = rateLimitStore.get(key)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + window
    })
    return true
  }
  
  if (record.count >= limit) {
    return false
  }
  
  record.count++
  return true
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}, 60000) // Clean every minute

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip rate limiting for static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return NextResponse.next()
  }
  
  // Check rate limit
  const isApi = pathname.startsWith('/api')
  const key = getRateLimitKey(request)
  
  if (!checkRateLimit(key, isApi)) {
    return new NextResponse(
      JSON.stringify({
        error: 'Too many requests',
        message: 'Please try again later'
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': '60'
        }
      }
    )
  }
  
  // Add security headers
  const response = NextResponse.next()
  
  // Security headers (additional to next.config.js)
  response.headers.set('X-Request-ID', crypto.randomUUID())
  response.headers.set('X-Rate-Limit-Limit', isApi ? '30' : '100')
  
  const record = rateLimitStore.get(key)
  if (record) {
    response.headers.set('X-Rate-Limit-Remaining', String(
      (isApi ? RATE_LIMIT.apiMaxRequests : RATE_LIMIT.maxRequests) - record.count
    ))
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
