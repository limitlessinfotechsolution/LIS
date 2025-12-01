import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !verifyToken(authHeader.replace('Bearer ', ''))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // In production, fetch from database
    // For now, return mock data
    const stats = {
      totalInquiries: 45,
      pendingInquiries: 5,
      totalSubscribers: 234,
      blogPosts: 6
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
