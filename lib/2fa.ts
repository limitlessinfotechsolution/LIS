/**
 * Two-Factor Authentication (2FA) Library
 * Supports TOTP, SMS, and Email verification
 */

import crypto from 'crypto'

export interface TwoFactorSecret {
  secret: string
  qrCode: string
  backupCodes: string[]
}

export interface TwoFactorVerification {
  userId: string
  method: '2fa' | 'sms' | 'email'
  code: string
  expiresAt: Date
}

/**
 * Generate TOTP secret for 2FA
 */
export function generateTOTPSecret(email: string): TwoFactorSecret {
  const secret = crypto.randomBytes(20).toString('hex')
  const appName = 'Limitless Infotech'
  const qrCode = `otpauth://totp/${appName}:${email}?secret=${secret}&issuer=${appName}`
  
  // Generate 10 backup codes
  const backupCodes = Array.from({ length: 10 }, () => 
    crypto.randomBytes(4).toString('hex').toUpperCase()
  )
  
  return { secret, qrCode, backupCodes }
}

/**
 * Verify TOTP code
 */
export function verifyTOTP(secret: string, token: string): boolean {
  const time = Math.floor(Date.now() / 1000 / 30)
  
  for (let i = -1; i <= 1; i++) {
    const hash = crypto
      .createHmac('sha1', Buffer.from(secret, 'hex'))
      .update(Buffer.from((time + i).toString()))
      .digest()
    
    const offset = hash[hash.length - 1] & 0xf
    const code = (
      ((hash[offset] & 0x7f) << 24) |
      ((hash[offset + 1] & 0xff) << 16) |
      ((hash[offset + 2] & 0xff) << 8) |
      (hash[offset + 3] & 0xff)
    ) % 1000000
    
    if (code.toString().padStart(6, '0') === token) {
      return true
    }
  }
  
  return false
}

/**
 * Generate verification code for SMS/Email
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Hash backup code for storage
 */
export function hashBackupCode(code: string): string {
  return crypto.createHash('sha256').update(code).digest('hex')
}

/**
 * Verify backup code
 */
export function verifyBackupCode(code: string, hashedCode: string): boolean {
  return hashBackupCode(code) === hashedCode
}

/**
 * Generate recovery token
 */
export function generateRecoveryToken(): string {
  return crypto.randomBytes(32).toString('hex')
}
