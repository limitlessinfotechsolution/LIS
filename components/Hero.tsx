'use client'
import { motion } from 'framer-motion'
import { FaRocket, FaCode, FaCloud } from 'react-icons/fa'

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaRocket className="text-5xl text-blue-600" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaCode className="text-5xl text-purple-600" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaCloud className="text-5xl text-cyan-600" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent"
        >
          Empowering Businesses with Limitless Technology Solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-lg text-slate-600"
        >
          Innovative IT services, custom software development, cloud transformation, and digital solutions designed to scale your business to new heights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex justify-center gap-4 flex-wrap"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-lg font-semibold shadow-lg"
          >
            Get a Free Consultation
          </motion.a>
          <motion.a
            href="/services"
            whileHover={{ scale: 1.05, borderColor: "#3b82f6" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 border-2 border-slate-300 rounded-lg font-semibold hover:border-blue-600 transition-colors"
          >
            Explore Our Services
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
