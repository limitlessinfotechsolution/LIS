import { NextRequest, NextResponse } from 'next/server'
import { getAuthorizationUrl, generateState } from '@/lib/oauth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  try {
    const { provider } = await params
    
    // Generate state for CSRF protection
    const state = generateState()
    
    // Store state in cookie
    const response = NextResponse.redirect(
      getAuthorizationUrl(
        provider,
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/${provider}/callback`,
        state
      )
    )
    
    response.cookies.set('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600 // 10 minutes
    })
    
    return response
  } catch (error) {
    console.error('OAuth initiation error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/login?error=oauth_failed`
    )
  }
}
