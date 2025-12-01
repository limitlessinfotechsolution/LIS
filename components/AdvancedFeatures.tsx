'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  FaShieldAlt, FaUsers, FaChartLine, 
  FaClock, FaCode, FaGlobe, FaMobileAlt,
  FaCloud, FaLock
} from 'react-icons/fa'

export default function AdvancedFeatures() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: FaShieldAlt,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and ISO 27001 certified security protocols',
      stats: '99.9% Uptime'
    },
    {
      icon: FaChartLine,
      title: 'Proven Results',
      description: 'Track record of 300% average ROI for our clients',
      stats: '300% ROI'
    },
    {
      icon: FaUsers,
      title: 'Expert Team',
      description: '50+ certified professionals with 15+ years experience',
      stats: '50+ Experts'
    },
    {
      icon: FaClock,
      title: '24/7 Support',
      description: 'Round-the-clock dedicated support team always available',
      stats: 'Always Online'
    },
    {
      icon: FaCode,
      title: 'Clean Code',
      description: 'Maintainable, scalable, and well-documented codebase',
      stats: '100% Quality'
    },
    {
      icon: FaGlobe,
      title: 'Global Reach',
      description: 'Serving clients across 50+ countries worldwide',
      stats: '50+ Countries'
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile First',
      description: 'Responsive design optimized for all devices',
      stats: '100% Responsive'
    },
    {
      icon: FaCloud,
      title: 'Cloud Native',
      description: 'Built for scale with modern cloud architecture',
      stats: 'Auto-Scaling'
    },
    {
      icon: FaLock,
      title: 'Data Privacy',
      description: 'GDPR compliant with strict data protection policies',
      stats: 'GDPR Compliant'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  }

  return (
    <section ref={ref} className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Why Choose Us
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Industry-leading capabilities that set us apart
          </p>
        </motion.div>

        {/* Features Grid - Compact & Professional */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ 
                y: -4,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
              }}
              className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 transition-all duration-200"
            >
              {/* Icon - Minimal, no rotation */}
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <feature.icon className="text-lg text-gray-700 dark:text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {feature.stats}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Subtle bottom border on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2A52BE] to-[#F97316] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-lg font-medium text-sm hover:shadow-md transition-shadow"
          >
            Explore All Features
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
