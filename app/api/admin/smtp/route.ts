import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../lib/auth'

// Mock storage - Replace with database in production
let smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  username: '',
  password: '',
  fromEmail: 'noreply@limitlessinfotech.com',
  fromName: 'Limitless Infotech'
}

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

    // Don't send password in response
    const { password, ...config } = smtpConfig
    return NextResponse.json({
      ...config,
      password: password ? '••••••••' : ''
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch SMTP config' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !verifyToken(authHeader.replace('Bearer ', ''))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    
    // Update config (in production, save to database)
    smtpConfig = { ...smtpConfig, ...data }

    return NextResponse.json({
      success: true,
      message: 'SMTP configuration saved successfully'
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to save SMTP config' },
      { status: 500 }
    )
  }
}
