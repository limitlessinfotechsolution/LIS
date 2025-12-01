import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../lib/auth'
import { query } from '../../../../lib/database/connection'

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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let whereClause = 'WHERE 1=1'
    const params: unknown[] = []

    if (status && status !== 'all') {
      whereClause += ' AND status = $1'
      params.push(status)
    }

    const result = await query(`
      SELECT * FROM newsletter_subscribers 
      ${whereClause}
      ORDER BY subscribed_at DESC
    `, params)

    return NextResponse.json({ subscribers: result.rows })
  } catch (error) {
    console.error('Failed to fetch subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}
