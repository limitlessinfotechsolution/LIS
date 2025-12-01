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
    const folder = searchParams.get('folder') || 'inbox'

    const result = await query(`
      SELECT * FROM emails
      WHERE folder = $1
      ORDER BY date DESC
    `, [folder])

    return NextResponse.json({ emails: result.rows })
  } catch (error) {
    console.error('Failed to fetch emails:', error)
    
    // Return mock data if database not set up
    const mockEmails = [
      {
        id: '1',
        from: 'john@example.com',
        to: 'info@limitlessinfotech.com',
        subject: 'Project Inquiry',
        body: 'Hello, I would like to discuss a potential project with your team...',
        date: new Date().toISOString(),
        read: false,
        starred: false,
        folder: 'inbox'
      },
      {
        id: '2',
        from: 'jane@company.com',
        to: 'info@limitlessinfotech.com',
        subject: 'Meeting Follow-up',
        body: 'Thank you for the meeting yesterday. Here are the details we discussed...',
        date: new Date(Date.now() - 86400000).toISOString(),
        read: true,
        starred: true,
        folder: 'inbox'
      }
    ]

    return NextResponse.json({ emails: mockEmails })
  }
}
