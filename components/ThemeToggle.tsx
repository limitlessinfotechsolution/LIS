'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaSun, FaMoon, FaStar } from 'react-icons/fa'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  return (
    <div className="fixed bottom-24 right-8 z-50">
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={toggleTheme}
        className="relative group"
        aria-label="Toggle theme"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl opacity-50"
          animate={{
            background: isDark 
              ? 'linear-gradient(135deg, #FDB813 0%, #F97316 100%)'
              : 'linear-gradient(135deg, #2A52BE 0%, #1e3a8a 100%)'
          }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Main button */}
        <motion.div
          className="relative p-5 rounded-full shadow-2xl backdrop-blur-sm border-2"
          animate={{
            background: isDark
              ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
              : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
            borderColor: isDark ? '#334155' : '#e2e8f0'
          }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="sun"
                initial={{ rotate: -180, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 180, opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="relative"
              >
                <FaSun className="text-3xl text-yellow-400" />
                {/* Sun rays */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full"
                    style={{
                      transform: `rotate(${i * 45}deg) translateY(-20px)`
                    }}
                    animate={{
                      scale: isHovered ? [1, 1.5, 1] : 1,
                      opacity: isHovered ? [0.5, 1, 0.5] : 0.5
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 180, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -180, opacity: 0, scale: 0 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="relative"
              >
                <FaMoon className="text-3xl text-[#2A52BE]" />
                {/* Stars around moon */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: i === 0 ? '-8px' : i === 1 ? '8px' : '0px',
                      right: i === 0 ? '-12px' : i === 1 ? '-8px' : '-16px'
                    }}
                    animate={{
                      scale: isHovered ? [1, 1.3, 1] : [1, 1.2, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  >
                    <FaStar className="text-xs text-[#F97316]" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg whitespace-nowrap shadow-xl"
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900 dark:bg-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
