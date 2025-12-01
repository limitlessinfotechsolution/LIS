import { NextResponse } from 'next/server'
import monitoring from '@/lib/monitoring'
import { cache } from '@/lib/cache'

export async function GET() {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      monitoring: monitoring.getHealthStatus(),
      cache: cache.getStats(),
      version: '8.0.0'
    }
    
    return NextResponse.json(health)
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: String(error)
      },
      { status: 500 }
    )
  }
}
