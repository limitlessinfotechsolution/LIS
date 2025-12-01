'use client'
import { motion } from 'framer-motion'
import { FaBuilding } from 'react-icons/fa'

export default function ClientLogos() {
  const clients = [
    { name: 'TechStart Inc.', industry: 'Technology', color: 'bg-blue-100' },
    { name: 'InnovateLab', industry: 'Innovation', color: 'bg-green-100' },
    { name: 'GrowthCorp', industry: 'Business', color: 'bg-purple-100' },
    { name: 'MediCare Solutions', industry: 'Healthcare', color: 'bg-red-100' },
    { name: 'FinTech Global', industry: 'Finance', color: 'bg-yellow-100' },
    { name: 'EduTech Academy', industry: 'Education', color: 'bg-indigo-100' },
    { name: 'FintechPro', industry: 'Finance', color: 'bg-cyan-100' },
    { name: 'TechPivot', industry: 'Technology', color: 'bg-pink-100' },
    { name: 'EduWorks', industry: 'Education', color: 'bg-orange-100' },
    { name: 'LogixOne', industry: 'Logistics', color: 'bg-teal-100' }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Trusted By
          </h3>
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Pioneering Transformation with Global Partners
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their businesses with our innovative solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {clients.map((client, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-slate-200 hover:border-[#2A52BE] transition-all cursor-pointer group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`${client.color} w-16 h-16 rounded-lg flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow`}
              >
                <FaBuilding className="text-2xl text-slate-700" />
              </motion.div>
              <div className="text-center">
                <div className="font-semibold text-slate-800 mb-1 text-sm">
                  {client.name}
                </div>
                <div className="text-xs text-slate-500">
                  {client.industry}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-600 mb-6">
            Over 120+ projects delivered across 18+ countries with 5M+ active users
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              View Our Work
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 border-2 border-[#2A52BE] text-[#2A52BE] rounded-lg font-semibold hover:bg-[#2A52BE] hover:text-white transition-colors"
            >
              Become Our Partner
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
