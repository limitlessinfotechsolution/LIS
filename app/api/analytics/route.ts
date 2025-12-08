import { NextRequest, NextResponse } from 'next/server'
import monitoring from '@/lib/monitoring'

export async function POST(request: NextRequest) {
  try {
    const { type, data, sessionId } = await request.json()
    
    // Store analytics data
    // await db.analytics.create({ type, data, _sessionId, timestamp: new Date() })
    
    // Track in monitoring system
    if (type === 'event') {
      monitoring.info(`Analytics event: ${data.name}`, { properties: data.properties })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}
