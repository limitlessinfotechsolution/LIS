'use client'
import { motion } from 'framer-motion'
import { FaPhone, FaClock } from 'react-icons/fa'
import ContactForm from '../../components/ContactForm'

export default function Contact() {

  const contactMethods = [
    {
      icon: FaPhone,
      title: 'Call Us',
      content: '+91 7710909492\nAvailable 24/7',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM IST\nSat - Sun: Closed',
      color: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Get In Touch
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Have a project in mind? We&apos;d love to hear from you. Fill in the form and we&apos;ll get back to you within 1-2 business days.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {contactMethods.map((info, idx) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                  className="p-6 bg-white rounded-xl shadow-lg border border-slate-100"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${info.color} mb-4`}
                  >
                    <Icon className="text-2xl text-white" />
                  </motion.div>
                  <h3 className="font-bold mb-2">{info.title}</h3>
                  <p className="text-sm text-slate-600 whitespace-pre-line">{info.content}</p>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
            <ul className="space-y-3">
              {[
                'Expert team with 10+ years experience',
                'Fast response time - within 24 hours',
                'Competitive pricing & flexible plans',
                '24/7 technical support available',
                'Proven track record of success'
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-yellow-300 text-xl">✓</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ContactForm />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="max-w-6xl mx-auto bg-slate-50 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-center mb-6">Find Us On The Map</h3>
        <div className="aspect-video bg-slate-200 rounded-xl flex items-center justify-center">
          <p className="text-slate-500">Map integration placeholder</p>
        </div>
      </motion.div>
    </section>
  )
}
