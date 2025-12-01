'use client'
import { motion } from 'framer-motion'
import { FaLock, FaChartLine, FaFileAlt, FaComments, FaClock, FaShieldAlt } from 'react-icons/fa'

export default function ClientPortal() {
  const features = [
    {
      icon: FaChartLine,
      title: 'Real-time Analytics',
      description: 'Track project progress and metrics in real-time'
    },
    {
      icon: FaFileAlt,
      title: 'Document Management',
      description: 'Access all project files and documentation'
    },
    {
      icon: FaComments,
      title: 'Direct Communication',
      description: 'Chat directly with your development team'
    },
    {
      icon: FaClock,
      title: 'Time Tracking',
      description: 'Transparent time logs and milestone tracking'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure Access',
      description: 'Bank-level encryption and security'
    },
    {
      icon: FaLock,
      title: 'Private Repository',
      description: 'Dedicated Git repository for your project'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
              Exclusive Client Portal
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Get complete transparency and control over your project with our dedicated client portal
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
                  >
                    <Icon className="text-2xl text-[#2A52BE] dark:text-[#F97316] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Request Portal Access
            </motion.a>
          </motion.div>

          {/* Right: Portal Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-3xl p-8 shadow-2xl">
              {/* Mock Portal Interface */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#2A52BE] to-[#F97316] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <FaLock className="text-[#2A52BE]" />
                    </div>
                    <div className="text-white">
                      <div className="font-bold">Client Portal</div>
                      <div className="text-xs opacity-75">Secure Dashboard</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Project Progress</span>
                      <span className="font-bold text-[#2A52BE] dark:text-[#F97316]">75%</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '75%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-[#2A52BE] to-[#F97316]"
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Tasks', value: '24/32' },
                      { label: 'Hours', value: '156' },
                      { label: 'Files', value: '48' }
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + idx * 0.1 }}
                        className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center"
                      >
                        <div className="text-2xl font-bold text-[#2A52BE] dark:text-[#F97316]">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Activity */}
                  <div className="space-y-2">
                    {[1, 2, 3].map((_, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + idx * 0.1 }}
                        className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center"
              >
                <FaChartLine className="text-3xl text-[#2A52BE] dark:text-[#F97316]" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center"
              >
                <FaLock className="text-2xl text-[#2A52BE] dark:text-[#F97316]" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
