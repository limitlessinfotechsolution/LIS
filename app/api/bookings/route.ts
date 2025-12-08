import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'
import monitoring from '@/lib/monitoring'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimit = await checkRateLimit(`booking:${ip}`, {
      windowMs: 60 * 60 * 1000, // 1 hour
      maxRequests: 3
    })
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many booking requests. Please try again later.' },
        { status: 429 }
      )
    }
    
    const booking = await request.json()
    
    // Validate booking data
    if (!booking.name || !booking.email || !booking.service || !booking.date || !booking.time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Save booking to database
    // const savedBooking = await db.bookings.create(booking)
    
    // Send confirmation email
    // await sendBookingConfirmation(booking)
    
    // Send notification to admin
    // await sendAdminNotification(booking)
    
    // Log the booking
    monitoring.info('New booking created', { service: booking.service, date: booking.date })
    
    return NextResponse.json({
      success: true,
      message: 'Booking confirmed',
      bookingId: 'BOOK-' + Date.now()
    })
  } catch (error) {
    monitoring.error('Booking creation failed', { error })
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')
    
    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter required' },
        { status: 400 }
      )
    }
    
    // Get available time slots for the date
    // const bookings = await db.bookings.find({ date })
    
    const allSlots = [
      '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ]
    
    // Filter out booked slots
    const availableSlots = allSlots.map(time => ({
      time,
      available: Math.random() > 0.3 // Replace with actual availability check
    }))
    
    return NextResponse.json({ slots: availableSlots })
  } catch (error) {
    monitoring.error('Failed to fetch available slots', { error })
    return NextResponse.json(
      { error: 'Failed to fetch slots' },
      { status: 500 }
    )
  }
}
