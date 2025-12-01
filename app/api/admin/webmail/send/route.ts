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

    const data = await request.json()

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || 'info@limitlessinfotech.com',
      to: data.to,
      cc: data.cc || undefined,
      bcc: data.bcc || undefined,
      subject: data.subject,
      text: data.body,
      html: data.body.replace(/\n/g, '<br>')
    })

    // Save to sent folder (if database is set up)
    try {
      const { query } = await import('../../../../../lib/database/connection')
      await query(`
        INSERT INTO emails (from_email, to_email, subject, body, folder, read)
        VALUES ($1, $2, $3, $4, 'sent', true)
      `, [
        process.env.SMTP_FROM_EMAIL || 'info@limitlessinfotech.com',
        data.to,
        data.subject,
        data.body
      ])
    } catch (dbError) {
      console.log('Database not available, email sent but not saved')
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully'
    })
  } catch (error) {
    console.error('Failed to send email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
