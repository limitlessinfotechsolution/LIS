'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaCheck, FaTimes, FaCrown } from 'react-icons/fa'

export default function ComparisonSection() {
  const [activeTab, setActiveTab] = useState<'us' | 'others'>('us')

  const features = [
    { name: 'Response Time', us: '< 2 hours', others: '24-48 hours' },
    { name: 'Code Quality', us: '100% Tested', others: 'Basic Testing' },
    { name: 'Security', us: 'ISO 27001', others: 'Standard' },
    { name: 'Support', us: '24/7 Dedicated', others: 'Business Hours' },
    { name: 'Scalability', us: 'Auto-Scaling', others: 'Manual' },
    { name: 'Documentation', us: 'Comprehensive', others: 'Basic' },
    { name: 'Updates', us: 'Free Lifetime', others: 'Paid' },
    { name: 'Training', us: 'Included', others: 'Extra Cost' }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-2xl mb-6 shadow-xl"
          >
            <FaCrown className="text-3xl text-white" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
              Why We&apos;re Different
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See how we stack up against traditional agencies
          </p>
        </motion.div>

        {/* Mobile Toggle */}
        <div className="md:hidden mb-8 flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <button
            onClick={() => setActiveTab('us')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'us'
                ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Limitless Infotech
          </button>
          <button
            onClick={() => setActiveTab('others')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'others'
                ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Others
          </button>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-base card-lg overflow-hidden"
        >
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-3 gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
              Feature
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-xl font-bold shadow-lg">
                <FaCrown />
                Limitless Infotech
              </div>
            </div>
            <div className="text-center text-lg font-bold text-gray-500 dark:text-gray-400">
              Traditional Agencies
            </div>
          </div>

          {/* Table Body */}
          <div className="space-y-4 mt-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                {/* Feature Name */}
                <div className="font-semibold text-gray-800 dark:text-white flex items-center">
                  {feature.name}
                </div>

                {/* Our Value - Desktop */}
                <div className="hidden md:flex items-center justify-center gap-2">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span className="font-bold text-[#2A52BE] dark:text-[#F97316]">
                    {feature.us}
                  </span>
                </div>

                {/* Others Value - Desktop */}
                <div className="hidden md:flex items-center justify-center gap-2">
                  <FaTimes className="text-red-500 flex-shrink-0" />
                  <span className="text-gray-500 dark:text-gray-400">
                    {feature.others}
                  </span>
                </div>

                {/* Mobile View */}
                <div className="md:hidden">
                  {activeTab === 'us' ? (
                    <div className="flex items-center gap-2 text-[#2A52BE] dark:text-[#F97316] font-bold">
                      <FaCheck className="text-green-500" />
                      {feature.us}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <FaTimes className="text-red-500" />
                      {feature.others}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-2xl font-bold shadow-xl"
            >
              Experience the Difference
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
