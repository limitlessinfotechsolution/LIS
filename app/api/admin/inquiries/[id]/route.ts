import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../../lib/auth'

// Mock data storage - Replace with database in production
const inquiries: Array<{ id: string; status: string }> = []

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

    const { status: _status } = await request.json()
    const { id } = await context.params

    // In production, update in database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'Inquiry updated successfully'
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}

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

    // In production, delete from database
    // For now, just return success
    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully'
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete inquiry' },
      { status: 500 }
    )
  }
}
