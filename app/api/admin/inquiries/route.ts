import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../lib/auth'

// Mock data - Replace with database in production
const inquiries = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    company: 'Tech Corp',
    service: 'Web Development',
    message: 'We need a custom web application for our business.',
    status: 'pending' as const,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234 567 8901',
    company: 'StartupXYZ',
    service: 'Mobile App Development',
    message: 'Looking for iOS and Android app development.',
    status: 'read' as const,
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+1 234 567 8902',
    company: 'Enterprise Inc',
    service: 'Cloud Solutions',
    message: 'Need help migrating to cloud infrastructure.',
    status: 'replied' as const,
    createdAt: new Date(Date.now() - 172800000).toISOString()
  }
]

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

    return NextResponse.json(inquiries)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const newInquiry = {
      id: Date.now().toString(),
      ...data,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    }

    inquiries.unshift(newInquiry)

    return NextResponse.json({
      success: true,
      inquiry: newInquiry
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to create inquiry' },
      { status: 500 }
    )
  }
}
