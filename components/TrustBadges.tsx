'use client'
import { motion } from 'framer-motion'
import { FaShieldAlt, FaAward, FaLock, FaCertificate, FaCheckCircle } from 'react-icons/fa'

export default function TrustBadges() {
  const badges = [
    {
      icon: FaShieldAlt,
      title: 'ISO 27001',
      subtitle: 'Certified',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaLock,
      title: 'GDPR',
      subtitle: 'Compliant',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: FaCertificate,
      title: 'SOC 2',
      subtitle: 'Type II',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaAward,
      title: '98%',
      subtitle: 'Client Retention',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: FaCheckCircle,
      title: '24/7',
      subtitle: 'Support',
      color: 'from-indigo-500 to-blue-500'
    }
  ]

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Trusted & Certified
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your security and satisfaction are our top priorities
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {badges.map((badge, idx) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden group"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                
                <div className="relative z-10 text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${badge.color} mb-3`}
                  >
                    <Icon className="text-2xl text-white" />
                  </motion.div>
                  <div className="font-bold text-lg text-gray-800 dark:text-white">
                    {badge.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {badge.subtitle}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
