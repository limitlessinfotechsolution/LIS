'use client'

import { useState } from 'react'
import { FaCalendar, FaClock, FaUser, FaEnvelope, FaPhone, FaCheck } from 'react-icons/fa'

interface TimeSlot {
  time: string
  available: boolean
}

interface BookingData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message: string
}

export default function BookingSystem() {
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const services = [
    'Web Development Consultation',
    'Mobile App Development',
    'UI/UX Design Review',
    'Digital Marketing Strategy',
    'Technical Support',
    'Custom Software Development'
  ]

  const timeSlots: TimeSlot[] = [
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: false },
    { time: '05:00 PM', available: true }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      })

      if (response.ok) {
        setSuccess(true)
        setStep(4)
      }
    } catch (error) {
      console.error('Booking failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step > s ? <FaCheck /> : s}
            </div>
            {s < 3 && (
              <div className={`flex-1 h-1 mx-2 ${
                step > s ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Select a Service</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service) => (
              <button
                key={service}
                onClick={() => {
                  setBooking({ ...booking, service })
                  setStep(2)
                }}
                className="p-4 border-2 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left"
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Choose Date & Time</h2>
          
          <div>
            <label className="block mb-2 font-medium">
              <FaCalendar className="inline mr-2" />
              Select Date
            </label>
            <input
              type="date"
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              <FaClock className="inline mr-2" />
              Select Time
            </label>
            <div className="grid grid-cols-4 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setBooking({ ...booking, time: slot.time })}
                  disabled={!slot.available}
                  className={`p-3 rounded-lg border-2 ${
                    booking.time === slot.time
                      ? 'border-blue-600 bg-blue-50'
                      : slot.available
                      ? 'border-gray-300 hover:border-blue-400'
                      : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!booking.date || !booking.time}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Information */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold">Your Information</h2>

          <div>
            <label className="block mb-2 font-medium">
              <FaUser className="inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              value={booking.name}
              onChange={(e) => setBooking({ ...booking, name: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              <FaEnvelope className="inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value={booking.email}
              onChange={(e) => setBooking({ ...booking, email: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              <FaPhone className="inline mr-2" />
              Phone
            </label>
            <input
              type="tel"
              value={booking.phone}
              onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Additional Message (Optional)
            </label>
            <textarea
              value={booking.message}
              onChange={(e) => setBooking({ ...booking, message: e.target.value })}
              className="w-full p-3 border rounded-lg"
              rows={4}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-3 border rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      )}

      {/* Step 4: Success */}
      {step === 4 && success && (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <FaCheck className="text-4xl text-green-600" />
          </div>
          <h2 className="text-3xl font-bold">Booking Confirmed!</h2>
          <p className="text-gray-600">
            Your appointment has been scheduled for {booking.date} at {booking.time}.
            We&apos;ve sent a confirmation email to {booking.email}.
          </p>
          <button
            onClick={() => {
              setStep(1)
              setSuccess(false)
              setBooking({
                name: '',
                email: '',
                phone: '',
                service: '',
                date: '',
                time: '',
                message: ''
              })
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Book Another Appointment
          </button>
        </div>
      )}
    </div>
  )
}
