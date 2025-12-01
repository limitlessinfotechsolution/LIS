import {
  generateTOTPSecret,
  verifyTOTP,
  generateVerificationCode,
  hashBackupCode,
  verifyBackupCode
} from '@/lib/2fa'

describe('Two-Factor Authentication', () => {
  describe('TOTP', () => {
    it('should generate TOTP secret', () => {
      const result = generateTOTPSecret('test@example.com')
      
      expect(result).toHaveProperty('secret')
      expect(result).toHaveProperty('qrCode')
      expect(result).toHaveProperty('backupCodes')
      expect(result.backupCodes).toHaveLength(10)
    })

    it('should generate valid QR code URL', () => {
      const result = generateTOTPSecret('test@example.com')
      
      expect(result.qrCode).toContain('otpauth://totp/')
      expect(result.qrCode).toContain('test@example.com')
      expect(result.qrCode).toContain('Limitless Infotech')
    })
  })

  describe('Verification Code', () => {
    it('should generate 6-digit code', () => {
      const code = generateVerificationCode()
      
      expect(code).toHaveLength(6)
      expect(/^\d{6}$/.test(code)).toBe(true)
    })

    it('should generate different codes', () => {
      const code1 = generateVerificationCode()
      const code2 = generateVerificationCode()
      
      // Very unlikely to be the same
      expect(code1).not.toBe(code2)
    })
  })

  describe('Backup Codes', () => {
    it('should hash backup code', () => {
      const code = 'ABC123'
      const hashed = hashBackupCode(code)
      
      expect(hashed).toHaveLength(64) // SHA-256 hex
      expect(hashed).not.toBe(code)
    })

    it('should verify backup code', () => {
      const code = 'ABC123'
      const hashed = hashBackupCode(code)
      
      expect(verifyBackupCode(code, hashed)).toBe(true)
      expect(verifyBackupCode('WRONG', hashed)).toBe(false)
    })
  })
})
