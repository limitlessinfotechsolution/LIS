'use client'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaWhatsapp, FaComments } from 'react-icons/fa'

export default function ContactButtons() {
  const contacts = [
    {
      icon: FaPhone,
      label: 'Call Us',
      value: '+91 7710909492',
      href: 'tel:+917710909492',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: FaEnvelope,
      label: 'Email Us',
      value: 'Info@limitlessinfotech.com',
      href: 'mailto:Info@limitlessinfotech.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: 'Chat Now',
      href: 'https://wa.me/917710909492',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: FaComments,
      label: 'Live Chat',
      value: 'Start Chat',
      href: '#',
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Get In Touch Instantly
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose your preferred way to connect with us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((contact, idx) => {
            const Icon = contact.icon
            return (
              <motion.a
                key={idx}
                href={contact.href}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />

                <div className="relative z-10 text-center">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${contact.color} mb-4 shadow-lg`}
                  >
                    <Icon className="text-3xl text-white" />
                  </motion.div>

                  <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">
                    {contact.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 break-all">
                    {contact.value}
                  </p>

                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${contact.color}`}
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
