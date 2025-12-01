'use client'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaGlobe } from 'react-icons/fa'
import { useState, useEffect } from 'react'

export default function LocationBanner() {
  const [location, setLocation] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get user's location
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setLocation(`${data.city}, ${data.country_name}`)
        setLoading(false)
      })
      .catch(() => {
        setLocation('Global')
        setLoading(false)
      })
  }, [])

  if (loading) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white py-2 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaMapMarkerAlt className="text-lg" />
        </motion.div>
        <span>
          Serving clients in <strong>{location}</strong> and worldwide
        </span>
        <FaGlobe className="text-lg" />
      </div>
    </motion.div>
  )
}
