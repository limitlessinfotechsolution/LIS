import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../../../lib/auth'
import { query } from '../../../../../../lib/database/connection'

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !verifyToken(authHeader.replace('Bearer ', ''))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await context.params

    // Toggle starred status
    await query(`
      UPDATE emails 
      SET starred = NOT starred
      WHERE id = $1
    `, [id])

    return NextResponse.json({
      success: true,
      message: 'Email starred status updated'
    })
  } catch (error) {
    console.error('Failed to star email:', error)
    return NextResponse.json(
      { error: 'Failed to star email' },
      { status: 500 }
    )
  }
}
