'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCookie } from 'react-icons/fa'
import { storage } from '../lib/utils'

// Compliance: Cookie consent banner
export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = storage.get('cookie-consent', null)
    if (consent === null) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    storage.set('cookie-consent', 'accepted')
    setShowBanner(false)
  }

  const handleDecline = () => {
    storage.set('cookie-consent', 'declined')
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-full flex items-center justify-center">
                    <FaCookie className="text-3xl text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                    We value your privacy
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                    By clicking &quot;Accept All&quot;, you consent to our use of cookies.{' '}
                    <a href="/privacy" className="text-[#2A52BE] hover:underline">
                      Learn more
                    </a>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAccept}
                    className="px-6 py-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                  >
                    Accept All
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDecline}
                    className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all whitespace-nowrap"
                  >
                    Decline
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
