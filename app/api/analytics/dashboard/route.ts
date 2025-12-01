import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '7d'
    
    // Fetch analytics data from database
    // const data = await db.analytics.aggregate(...)
    
    // Mock data for demonstration
    const mockData = {
      visitors: { total: 12543, change: 15.3 },
      pageViews: { total: 45678, change: 23.1 },
      avgDuration: { value: '3m 24s', change: 8.5 },
      bounceRate: { value: 42, change: -5.2 },
      topPages: [
        { path: '/', views: 8234 },
        { path: '/services', views: 5432 },
        { path: '/about', views: 3456 },
        { path: '/contact', views: 2345 },
        { path: '/blog', views: 1987 }
      ],
      devices: {
        desktop: 6543,
        mobile: 4321,
        tablet: 1679
      },
      countries: [
        { name: 'United States', visitors: 4532 },
        { name: 'India', visitors: 3421 },
        { name: 'United Kingdom', visitors: 2345 },
        { name: 'Canada', visitors: 1234 },
        { name: 'Australia', visitors: 987 },
        { name: 'Germany', visitors: 876 }
      ],
      realtimeUsers: Math.floor(Math.random() * 50) + 10
    }
    
    return NextResponse.json(mockData)
  } catch (error) {
    console.error('Analytics dashboard error:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
