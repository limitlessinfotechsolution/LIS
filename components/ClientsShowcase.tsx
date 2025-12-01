'use client'
import { motion } from 'framer-motion'
import { FaBuilding } from 'react-icons/fa'

export default function ClientsShowcase() {
  const clients = [
    { name: 'FinTech Global', industry: 'Finance', color: 'from-blue-500 to-cyan-500' },
    { name: 'MediCare Solutions', industry: 'Healthcare', color: 'from-green-500 to-teal-500' },
    { name: 'EduTech Academy', industry: 'Education', color: 'from-purple-500 to-pink-500' },
    { name: 'ShopEase', industry: 'E-Commerce', color: 'from-orange-500 to-red-500' },
    { name: 'LogixOne', industry: 'Logistics', color: 'from-indigo-500 to-blue-500' },
    { name: 'TechPivot', industry: 'Technology', color: 'from-pink-500 to-purple-500' },
    { name: 'SmartCity Corp', industry: 'IoT', color: 'from-yellow-500 to-orange-500' },
    { name: 'DataFlow Systems', industry: 'Analytics', color: 'from-cyan-500 to-blue-500' },
    { name: 'SecureBank', industry: 'Banking', color: 'from-blue-600 to-indigo-600' },
    { name: 'HealthPlus', industry: 'Healthcare', color: 'from-teal-500 to-green-500' },
    { name: 'LearnHub', industry: 'EdTech', color: 'from-purple-600 to-pink-600' },
    { name: 'RetailPro', industry: 'Retail', color: 'from-red-500 to-orange-500' }
  ]

  return (
    <section className="py-16 bg-slate-50 rounded-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent mb-4">
          Trusted by Leading Companies
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Join 120+ enterprises who have transformed their businesses with our innovative solutions
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {clients.map((client, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            className="bg-white rounded-xl p-6 shadow-md border border-slate-200 flex flex-col items-center justify-center text-center"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className={`w-16 h-16 rounded-lg bg-gradient-to-br ${client.color} flex items-center justify-center mb-3`}
            >
              <FaBuilding className="text-2xl text-white" />
            </motion.div>
            <h3 className="font-bold text-sm mb-1">{client.name}</h3>
            <p className="text-xs text-slate-500">{client.industry}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <p className="text-slate-600 mb-6">
          Over 500+ projects delivered across 18+ countries with 5M+ active users
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="/portfolio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-lg font-semibold shadow-lg"
          >
            View Our Work
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-[#2A52BE] text-[#2A52BE] rounded-lg font-semibold hover:bg-[#2A52BE] hover:text-white transition-colors"
          >
            Become Our Partner
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
