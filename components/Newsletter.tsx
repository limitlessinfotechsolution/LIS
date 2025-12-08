'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error)
      }
    } catch {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-3xl my-16"
    >
      <div className="max-w-3xl mx-auto text-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6"
        >
          <FaEnvelope className="text-3xl text-white" />
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Updated with Latest Tech Insights
        </h2>
        <p className="text-white/90 text-lg mb-8">
          Subscribe to our newsletter for industry trends, tips, and exclusive offers
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors disabled:opacity-50"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === 'loading'}
              className="px-8 py-4 bg-white text-[#2A52BE] rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                'Subscribing...'
              ) : (
                <>
                  <FaPaperPlane />
                  Subscribe
                </>
              )}
            </motion.button>
          </div>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-white font-medium"
            >
              ✓ {message}
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-200 font-medium"
            >
              ✗ {message}
            </motion.p>
          )}
        </form>

        <p className="text-white/70 text-sm mt-6">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </motion.section>
  )
}
