import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../../lib/auth'
import { query } from '../../../../../lib/database/connection'

export async function DELETE(
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

    const result = await query(
      'DELETE FROM newsletter_subscribers WHERE id = $1',
      [id]
    )

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Subscriber deleted successfully'
    })
  } catch (error) {
    console.error('Failed to delete subscriber:', error)
    return NextResponse.json(
      { error: 'Failed to delete subscriber' },
      { status: 500 }
    )
  }
}
