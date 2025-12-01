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

    // Move to trash instead of deleting
    await query(`
      UPDATE emails 
      SET folder = 'trash'
      WHERE id = $1
    `, [id])

    return NextResponse.json({
      success: true,
      message: 'Email moved to trash'
    })
  } catch (error) {
    console.error('Failed to delete email:', error)
    return NextResponse.json(
      { error: 'Failed to delete email' },
      { status: 500 }
    )
  }
}
