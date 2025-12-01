'use client'
import { motion } from 'framer-motion'
import { FaCode, FaCloud, FaServer, FaMobileAlt, FaGlobe, FaShieldAlt } from 'react-icons/fa'

export default function ServicesGrid() {
  const items = [
    { title: 'Software Development', desc: 'Custom applications tailored to your needs', icon: FaCode },
    { title: 'Cloud Solutions', desc: 'Migrate, optimize, and secure your cloud', icon: FaCloud },
    { title: 'Infrastructure', desc: 'High-performance servers & networking', icon: FaServer },
    { title: 'Mobile Apps', desc: 'iOS & Android development', icon: FaMobileAlt },
    { title: 'Web Development', desc: 'Responsive, fast websites', icon: FaGlobe },
    { title: 'Cybersecurity', desc: 'Protect your digital assets', icon: FaShieldAlt }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {items.map((it) => {
        const Icon = it.icon
        return (
          <motion.div
            key={it.title}
            variants={item}
            whileHover={{ 
              y: -4,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}
            className="group relative p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <Icon className="text-lg text-gray-700 dark:text-gray-300" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-base mb-1 text-gray-900 dark:text-white">{it.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{it.desc}</p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2A52BE] to-[#F97316] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </motion.div>
        )
      })}
    </motion.div>
  )
}
