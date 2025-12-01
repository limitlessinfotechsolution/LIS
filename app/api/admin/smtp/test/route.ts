import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../../lib/auth'
import nodemailer from 'nodemailer'

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

    const { email } = await request.json()

    // In production, fetch SMTP config from database
    // For now, use environment variables or default config
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME || 'Limitless Infotech'}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: email,
      subject: 'SMTP Test Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2A52BE;">SMTP Configuration Test</h2>
          <p>This is a test email from your Limitless Infotech CMS Admin Panel.</p>
          <p>If you received this email, your SMTP configuration is working correctly!</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Sent from Limitless Infotech Admin Panel<br>
            ${new Date().toLocaleString()}
          </p>
        </div>
      `
    })

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully'
    })
  } catch (error) {
    console.error('SMTP test error:', error)
    return NextResponse.json(
      { error: 'Failed to send test email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
