'use client'
import { motion } from 'framer-motion'
import { FaLightbulb, FaPencilRuler, FaCode, FaRocket } from 'react-icons/fa'

export default function ProcessSection() {
  const steps = [
    {
      icon: FaLightbulb,
      title: 'Discovery',
      description: 'We understand your vision, goals, and requirements',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: FaPencilRuler,
      title: 'Design',
      description: 'Creating intuitive designs and architecture',
      color: 'from-pink-500 to-purple-600'
    },
    {
      icon: FaCode,
      title: 'Development',
      description: 'Building robust, scalable solutions',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaRocket,
      title: 'Launch',
      description: 'Deploying and supporting your success',
      color: 'from-green-500 to-teal-500'
    }
  ]

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
          Our Process
        </h2>
        <p className="mt-4 text-slate-600">A proven methodology for delivering exceptional results</p>
      </motion.div>

      <div className="relative">
        {/* Connection line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#2A52BE]/20 to-[#F97316]/20 -translate-y-1/2" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-6 rounded-full bg-gradient-to-br ${step.color} mb-4 mx-auto`}
                  >
                    <Icon className="text-3xl text-white" />
                  </motion.div>

                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {idx + 1}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-600">{step.description}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
