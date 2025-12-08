'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaComment, FaPaperPlane } from 'react-icons/fa'

type FormState = { name: string; email: string; phone?: string; company?: string; message: string }

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', company: '', message: '' })
  const [status, setStatus] = useState('')

  async function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', company: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputFields = [
    { icon: FaUser, name: 'name', placeholder: 'Full Name', type: 'text', required: true },
    { icon: FaEnvelope, name: 'email', placeholder: 'Email Address', type: 'email', required: true },
    { icon: FaPhone, name: 'phone', placeholder: 'Phone Number', type: 'tel', required: false },
    { icon: FaBuilding, name: 'company', placeholder: 'Company (Optional)', type: 'text', required: false }
  ]

  return (
    <motion.form
      onSubmit={submitHandler}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
    >
      {inputFields.map((field, idx) => {
        const Icon = field.icon
        return (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative"
          >
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              required={field.required}
              type={field.type}
              placeholder={field.placeholder}
              value={form[field.name as keyof FormState] || ''}
              onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </motion.div>
        )
      })}

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative"
      >
        <FaComment className="absolute left-4 top-4 text-slate-400" />
        <textarea
          required
          placeholder="Tell us about your project"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors h-32 resize-none"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex items-center gap-4"
      >
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          disabled={status === 'sending'}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-lg font-semibold shadow-lg disabled:opacity-50"
        >
          <FaPaperPlane />
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </motion.button>

        {status === 'success' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-green-600 font-medium"
          >
            ✓ Message sent — we&apos;ll get back soon!
          </motion.span>
        )}
        {status === 'error' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-red-600 font-medium"
          >
            ✗ Something went wrong. Try again.
          </motion.span>
        )}
      </motion.div>
    </motion.form>
  )
}
