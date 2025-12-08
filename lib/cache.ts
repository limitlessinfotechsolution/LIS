/**
 * Advanced Caching System
 * Supports in-memory and Redis caching with TTL
 */

interface CacheEntry<T> {
  value: T
  expiresAt: number
}

interface RedisClient {
  get: (key: string) => Promise<string | null>
  setEx: (key: string, ttl: number, value: string) => Promise<void>
  del: (key: string) => Promise<void>
  flushAll: () => Promise<void>
  connect: () => Promise<void>
}

class CacheService {
  private memoryCache = new Map<string, CacheEntry<unknown>>()
  private redisClient: RedisClient | null = null

  /**
   * Initialize Redis client
   */
  async initRedis(redisUrl?: string) {
    if (!redisUrl) return

    try {
      // Dynamic import - redis is optional
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const redis = await import('redis' as any).catch(() => null) as { createClient?: (options: { url: string }) => RedisClient } | null
      if (!redis || !redis.createClient) {
        console.warn('⚠️ Redis package not installed, using memory cache')
        return
      }
      this.redisClient = redis.createClient({ url: redisUrl })
      await this.redisClient.connect()
      console.log('✅ Redis cache connected')
    } catch {
      console.warn('⚠️ Redis not available, using memory cache')
    }
  }

  /**
   * Get value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    // Try Redis first
    if (this.redisClient) {
      try {
        const value = await this.redisClient.get(key)
        return value ? JSON.parse(value) : null
      } catch (err) {
        console.error('Redis get error:', err)
      }
    }

    // Fallback to memory cache
    const entry = this.memoryCache.get(key)
    if (!entry) return null

    if (Date.now() > entry.expiresAt) {
      this.memoryCache.delete(key)
      return null
    }

    return entry.value as T
  }

  /**
   * Set value in cache
   */
  async set<T>(key: string, value: T, ttl: number = 3600): Promise<void> {
    // Set in Redis
    if (this.redisClient) {
      try {
        await this.redisClient.setEx(key, ttl, JSON.stringify(value))
        return
      } catch (err) {
        console.error('Redis set error:', err)
      }
    }

    // Fallback to memory cache
    this.memoryCache.set(key, {
      value,
      expiresAt: Date.now() + ttl * 1000
    })
  }

  /**
   * Delete from cache
   */
  async delete(key: string): Promise<void> {
    if (this.redisClient) {
      try {
        await this.redisClient.del(key)
        return
      } catch (err) {
        console.error('Redis delete error:', err)
      }
    }

    this.memoryCache.delete(key)
  }

  /**
   * Clear all cache
   */
  async clear(): Promise<void> {
    if (this.redisClient) {
      try {
        await this.redisClient.flushAll()
        return
      } catch (err) {
        console.error('Redis clear error:', err)
      }
    }

    this.memoryCache.clear()
  }

  /**
   * Get or set (cache-aside pattern)
   */
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttl: number = 3600
  ): Promise<T> {
    const cached = await this.get<T>(key)
    if (cached !== null) return cached

    const value = await factory()
    await this.set(key, value, ttl)
    return value
  }

  /**
   * Cache with tags for group invalidation
   */
  async setWithTags<T>(
    key: string,
    value: T,
    tags: string[],
    ttl: number = 3600
  ): Promise<void> {
    await this.set(key, value, ttl)

    // Store tag associations
    for (const tag of tags) {
      const tagKey = `tag:${tag}`
      const keys = (await this.get<string[]>(tagKey)) || []
      keys.push(key)
      await this.set(tagKey, keys, ttl)
    }
  }

  /**
   * Invalidate by tag
   */
  async invalidateTag(tag: string): Promise<void> {
    const tagKey = `tag:${tag}`
    const keys = (await this.get<string[]>(tagKey)) || []

    for (const key of keys) {
      await this.delete(key)
    }

    await this.delete(tagKey)
  }

  /**
   * Get cache stats
   */
  getStats() {
    return {
      memorySize: this.memoryCache.size,
      redisConnected: !!this.redisClient
    }
  }
}

export const cache = new CacheService()
export default cache

/**
 * Cache key builders
 */
export const CacheKeys = {
  user: (id: string) => `user:${id}`,
  users: () => 'users:all',
  post: (id: string) => `post:${id}`,
  posts: (page: number) => `posts:page:${page}`,
  analytics: (range: string) => `analytics:${range}`,
  settings: () => 'settings:global'
}

/**
 * Cache TTL constants (in seconds)
 */
export const CacheTTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
  WEEK: 604800 // 7 days
}
