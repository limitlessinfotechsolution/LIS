'use client'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { FaUsers, FaProjectDiagram, FaGlobe, FaAward } from 'react-icons/fa'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
}

function AnimatedCounter({ value, suffix = '', duration = 2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix
      }
    })
  }, [springValue, suffix])

  return <span ref={ref}>0{suffix}</span>
}

export default function MetricsSection() {
  const metrics = [
    {
      icon: FaUsers,
      value: 120,
      suffix: '+',
      label: 'Global Enterprises',
      color: 'from-blue-500 to-cyan-500',
      description: 'Trusted by leading companies worldwide'
    },
    {
      icon: FaProjectDiagram,
      value: 500,
      suffix: '+',
      label: 'Projects Delivered',
      color: 'from-purple-500 to-pink-500',
      description: 'Successfully completed and deployed'
    },
    {
      icon: FaGlobe,
      value: 5,
      suffix: 'M+',
      label: 'Active Users',
      color: 'from-green-500 to-teal-500',
      description: 'Across our platforms globally'
    },
    {
      icon: FaAward,
      value: 98,
      suffix: '%',
      label: 'Client Retention',
      color: 'from-orange-500 to-red-500',
      description: 'Long-term partnerships built on trust'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our track record speaks for itself. Here&apos;s what we&apos;ve achieved together with our clients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 overflow-hidden group"
              >
                {/* Background gradient on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${metric.color} mb-6`}
                >
                  <Icon className="text-3xl text-white" />
                </motion.div>

                {/* Counter */}
                <div className="text-5xl font-bold bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent mb-2">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {metric.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600">
                  {metric.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${metric.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.1 + 0.5 }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 mb-6">
            Serving clients across 18+ countries with 15+ years of industry expertise
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-green-600">
              <span className="text-xl">✓</span>
              <span className="font-medium">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <span className="text-xl">✓</span>
              <span className="font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <span className="text-xl">✓</span>
              <span className="font-medium">24/7 Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
