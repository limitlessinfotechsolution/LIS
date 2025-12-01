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

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100')
    const level = searchParams.get('level')

    let whereClause = 'WHERE 1=1'
    const params: unknown[] = []
    let paramIndex = 1

    if (level && level !== 'all') {
      whereClause += ` AND level = $${paramIndex}`
      params.push(level)
      paramIndex++
    }

    params.push(limit)

    const result = await query(`
      SELECT * FROM system_logs
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex}
    `, params)

    return NextResponse.json({ logs: result.rows })
  } catch (error) {
    console.error('Failed to fetch activity logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activity logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'

    const result = await query(`
      INSERT INTO system_logs (level, message, context, ip_address)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [
      data.level || 'info',
      data.message,
      data.context || {},
      ip
    ])

    return NextResponse.json({
      success: true,
      log: result.rows[0]
    })
  } catch (error) {
    console.error('Failed to create activity log:', error)
    return NextResponse.json(
      { error: 'Failed to create activity log' },
      { status: 500 }
    )
  }
}
