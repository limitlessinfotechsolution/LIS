import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message } = body
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // TODO: Integrate with SendGrid
    // Uncomment when you have SENDGRID_API_KEY in .env.local
    /*
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    const msg = {
      to: process.env.CONTACT_EMAIL || 'Info@limitlessinfotech.com',
      from: 'noreply@limitlessinfotech.com', // Must be verified in SendGrid
      subject: `New Contact Form Submission from ${name}`,
      text: `
        New contact form submission:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Company: ${company || 'Not provided'}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2A52BE;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            This email was sent from the Limitless Infotech contact form.
          </p>
        </div>
      `,
    }

    await sgMail.send(msg)
    */

    // For now, just log (remove in production)
    console.log('Contact form received:', {
      name,
      email,
      phone,
      company,
      message,
      timestamp: new Date().toISOString()
    })

    // TODO: Save to database
    // await db.contacts.create({ name, email, phone, company, message })

    return NextResponse.json({ 
      ok: true,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.'
    })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ 
      error: 'Server error. Please try again or email us directly at Info@limitlessinfotech.com' 
    }, { status: 500 })
  }
}
