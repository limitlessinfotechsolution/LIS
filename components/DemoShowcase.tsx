'use client'
import { motion } from 'framer-motion'
import { FaPlay, FaDesktop, FaMobile, FaTablet } from 'react-icons/fa'
import { useState } from 'react'

export default function DemoShowcase() {
  const [activeDevice, setActiveDevice] = useState('desktop')

  const devices = [
    { id: 'desktop', icon: FaDesktop, label: 'Desktop' },
    { id: 'tablet', icon: FaTablet, label: 'Tablet' },
    { id: 'mobile', icon: FaMobile, label: 'Mobile' }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
            See Our Work in Action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Experience our solutions across all devices
          </p>

          {/* Device Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {devices.map((device) => {
              const Icon = device.icon
              return (
                <motion.button
                  key={device.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveDevice(device.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all ${
                    activeDevice === device.id
                      ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <Icon />
                  {device.label}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Demo Screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className={`mx-auto transition-all duration-500 ${
            activeDevice === 'desktop' ? 'max-w-6xl' :
            activeDevice === 'tablet' ? 'max-w-3xl' :
            'max-w-sm'
          }`}>
            {/* Device Frame */}
            <div className="relative bg-gray-900 rounded-3xl p-4 shadow-2xl">
              {/* Top Bar */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-gray-400 text-sm">
                  https://demo.limitlessinfotech.com
                </div>
              </div>

              {/* Screen Content */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden aspect-video relative">
                {/* Mock Website */}
                <div className="absolute inset-0">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#2A52BE] to-[#F97316] p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg"></div>
                      <div className="text-white font-bold">Demo Site</div>
                    </div>
                    <div className="flex gap-4 text-white text-sm">
                      <div>Home</div>
                      <div>About</div>
                      <div>Services</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '60%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '80%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '70%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                    />

                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {[1, 2, 3].map((_, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + idx * 0.1 }}
                          className="aspect-square bg-gradient-to-br from-[#2A52BE]/20 to-[#F97316]/20 rounded-xl"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Play Button Overlay */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-gradient-to-r from-[#2A52BE] to-[#F97316] rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <FaPlay className="text-3xl text-white ml-1" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-3xl shadow-2xl opacity-20"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#F97316] to-[#2A52BE] rounded-3xl shadow-2xl opacity-20"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Request a Live Demo
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
