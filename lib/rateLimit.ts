/**
 * Advanced Rate Limiting with Redis support
 * Falls back to in-memory if Redis is not available
 */

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
  message?: string
}

interface RateLimitRecord {
  count: number
  resetTime: number
}

// In-memory store (fallback)
const memoryStore = new Map<string, RateLimitRecord>()

// Redis client (optional)
let redisClient: { get: (key: string) => Promise<string | null>; setEx: (key: string, ttl: number, value: string) => Promise<void>; connect: () => Promise<void> } | null = null

/**
 * Initialize Redis client
 */
export async function initRedis(redisUrl?: string) {
  if (!redisUrl) return
  
  try {
    // Dynamic import - redis is optional
    const redis = await import('redis').catch(() => null)
    if (!redis) {
      console.warn('⚠️ Redis package not installed, using in-memory rate limiting')
      return
    }
    redisClient = redis.createClient({ url: redisUrl }) as typeof redisClient
    await redisClient!.connect()
    console.log('✅ Redis connected for rate limiting')
  } catch (error) {
    console.warn('⚠️ Redis not available, using in-memory rate limiting')
  }
}

/**
 * Get rate limit record
 */
async function getRecord(key: string): Promise<RateLimitRecord | null> {
  if (redisClient) {
    try {
      const data = await redisClient.get(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Redis get error:', error)
    }
  }
  return memoryStore.get(key) || null
}

/**
 * Set rate limit record
 */
async function setRecord(key: string, record: RateLimitRecord, ttl: number) {
  if (redisClient) {
    try {
      await redisClient.setEx(key, Math.ceil(ttl / 1000), JSON.stringify(record))
      return
    } catch (error) {
      console.error('Redis set error:', error)
    }
  }
  memoryStore.set(key, record)
}

/**
 * Check rate limit
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
  const now = Date.now()
  const key = `ratelimit:${identifier}`
  
  const record = await getRecord(key)
  
  if (!record || now > record.resetTime) {
    const newRecord = {
      count: 1,
      resetTime: now + config.windowMs
    }
    await setRecord(key, newRecord, config.windowMs)
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: newRecord.resetTime
    }
  }
  
  if (record.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime
    }
  }
  
  record.count++
  await setRecord(key, record, record.resetTime - now)
  
  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime
  }
}

/**
 * Rate limit configurations
 */
export const RATE_LIMITS = {
  api: { windowMs: 60 * 1000, maxRequests: 30 },
  auth: { windowMs: 15 * 60 * 1000, maxRequests: 5 },
  contact: { windowMs: 60 * 60 * 1000, maxRequests: 3 },
  general: { windowMs: 15 * 60 * 1000, maxRequests: 100 }
}

/**
 * Clean up old entries (for memory store)
 */
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of memoryStore.entries()) {
    if (now > record.resetTime) {
      memoryStore.delete(key)
    }
  }
}, 60000)
