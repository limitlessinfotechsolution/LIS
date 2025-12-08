import { NextRequest, NextResponse } from 'next/server'
import { exchangeCodeForToken, getUserInfo, verifyState } from '@/lib/oauth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    
    if (!code || !state) {
      throw new Error('Missing code or state')
    }
    
    // Verify state
    const storedState = request.cookies.get('oauth_state')?.value
    if (!storedState || !verifyState(state, storedState)) {
      throw new Error('Invalid state')
    }
    
    // Exchange code for token
    const accessToken = await exchangeCodeForToken(
      provider,
      code,
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/${provider}/callback`
    )
    
    // Get user info
    const _user = await getUserInfo(provider, accessToken)
    
    // Create or update user in database
    // await db.users.upsert({ where: { email: user.email }, data: user })
    
    // Create session
    // const session = await createSession(user)
    
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/portal`
    )
    
    // Set session cookie
    response.cookies.set('session', 'session-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })
    
    // Clear state cookie
    response.cookies.delete('oauth_state')
    
    return response
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/login?error=oauth_failed`
    )
  }
}
