import { NextRequest, NextResponse } from 'next/server'
import { verifyTOTP } from '@/lib/2fa'

export async function POST(request: NextRequest) {
  try {
    const { method, code } = await request.json()
    
    // Get user from session
    // const user = await getUserFromSession(request)
    
    if (method === 'totp') {
      // Get user's secret from database
      const secret = 'user-secret-from-db' // Replace with actual DB query
      
      const isValid = verifyTOTP(secret, code)
      
      if (isValid) {
        // Enable 2FA for user
        // await db.users.update({ twoFactorEnabled: true })
        
        return NextResponse.json({ success: true })
      }
    }
    
    if (method === 'sms' || method === 'email') {
      // Verify code from database
      // const storedCode = await db.verificationCodes.findOne({ userId, code })
      
      // if (storedCode && storedCode.expiresAt > Date.now()) {
      //   await db.users.update({ twoFactorEnabled: true, twoFactorMethod: method })
      //   return NextResponse.json({ success: true })
      // }
    }
    
    return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
  } catch (error) {
    console.error('2FA verification error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
