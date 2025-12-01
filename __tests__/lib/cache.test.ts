import { cache, CacheKeys, CacheTTL } from '@/lib/cache'

describe('Cache Service', () => {
  beforeEach(async () => {
    await cache.clear()
  })

  describe('Basic Operations', () => {
    it('should set and get value', async () => {
      await cache.set('test-key', 'test-value', CacheTTL.SHORT)
      const value = await cache.get('test-key')
      expect(value).toBe('test-value')
    })

    it('should return null for non-existent key', async () => {
      const value = await cache.get('non-existent')
      expect(value).toBeNull()
    })

    it('should delete value', async () => {
      await cache.set('test-key', 'test-value')
      await cache.delete('test-key')
      const value = await cache.get('test-key')
      expect(value).toBeNull()
    })

    it('should clear all cache', async () => {
      await cache.set('key1', 'value1')
      await cache.set('key2', 'value2')
      await cache.clear()
      
      const value1 = await cache.get('key1')
      const value2 = await cache.get('key2')
      
      expect(value1).toBeNull()
      expect(value2).toBeNull()
    })
  })

  describe('TTL', () => {
    it('should expire after TTL', async () => {
      await cache.set('test-key', 'test-value', 1) // 1 second TTL
      
      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 1100))
      
      const value = await cache.get('test-key')
      expect(value).toBeNull()
    })
  })

  describe('Get or Set', () => {
    it('should call factory if cache miss', async () => {
      const factory = jest.fn().mockResolvedValue('factory-value')
      
      const value = await cache.getOrSet('test-key', factory, CacheTTL.SHORT)
      
      expect(factory).toHaveBeenCalled()
      expect(value).toBe('factory-value')
    })

    it('should not call factory if cache hit', async () => {
      await cache.set('test-key', 'cached-value')
      const factory = jest.fn().mockResolvedValue('factory-value')
      
      const value = await cache.getOrSet('test-key', factory, CacheTTL.SHORT)
      
      expect(factory).not.toHaveBeenCalled()
      expect(value).toBe('cached-value')
    })
  })

  describe('Cache Keys', () => {
    it('should generate correct user key', () => {
      expect(CacheKeys.user('123')).toBe('user:123')
    })

    it('should generate correct posts key', () => {
      expect(CacheKeys.posts(1)).toBe('posts:page:1')
    })
  })

  describe('Stats', () => {
    it('should return cache stats', () => {
      const stats = cache.getStats()
      expect(stats).toHaveProperty('memorySize')
      expect(stats).toHaveProperty('redisConnected')
    })
  })
})
