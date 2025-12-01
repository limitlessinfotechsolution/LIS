import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // TODO: Integrate with Mailchimp or SendGrid
    /*
    const mailchimp = require('@mailchimp/mailchimp_marketing')
    
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    })

    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    })
    */

    console.log('Newsletter signup:', { email, timestamp: new Date().toISOString() })

    return NextResponse.json({ 
      ok: true,
      message: 'Successfully subscribed to newsletter!'
    })
  } catch (err) {
    console.error('Newsletter error:', err)
    return NextResponse.json({ 
      error: 'Failed to subscribe. Please try again.' 
    }, { status: 500 })
  }
}
