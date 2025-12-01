'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaGlobe, FaCheck } from 'react-icons/fa'

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('EN')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang) setCurrentLang(savedLang)
  }, [])

  const languages = [
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'HI', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'AR', name: 'العربية', flag: '🇸🇦' }
  ]

  const selectLanguage = (code: string) => {
    setCurrentLang(code)
    setIsOpen(false)
    localStorage.setItem('language', code)
  }

  const currentLanguage = languages.find(lang => lang.code === currentLang)

  return (
    <div className="fixed bottom-40 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              style={{ zIndex: -1 }}
            />
            
            {/* Language Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute bottom-20 right-0 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-3 min-w-[240px] border-2 border-gray-200 dark:border-gray-700 backdrop-blur-xl"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 mb-2">
                <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300">
                  Select Language
                </h3>
              </div>

              {/* Language Options */}
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {languages.map((lang, idx) => (
                  <motion.button
                    key={lang.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl transition-all mb-1 ${
                      currentLang === lang.code
                        ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <motion.span 
                        className="text-3xl"
                        animate={{ rotate: currentLang === lang.code ? [0, -10, 10, 0] : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {lang.flag}
                      </motion.span>
                      <div className="text-left">
                        <div className="font-semibold text-sm">{lang.name}</div>
                        <div className={`text-xs ${
                          currentLang === lang.code ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {lang.code}
                        </div>
                      </div>
                    </div>
                    {currentLang === lang.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      >
                        <FaCheck className="text-lg" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
        aria-label="Change language"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2A52BE] to-[#F97316] blur-xl opacity-50"
          animate={{ opacity: isOpen ? 0.7 : 0.5 }}
        />
        
        {/* Main button */}
        <motion.div
          className="relative p-4 rounded-full shadow-2xl backdrop-blur-sm border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          animate={{
            rotate: isOpen ? 180 : 0
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: isOpen ? -180 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <FaGlobe className="text-2xl text-[#2A52BE] dark:text-[#F97316]" />
            </motion.div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-xs text-gray-500 dark:text-gray-400">
                {currentLanguage?.flag}
              </span>
              <span className="font-bold text-sm text-gray-700 dark:text-gray-300">
                {currentLang}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg whitespace-nowrap shadow-xl"
            >
              Change Language
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
