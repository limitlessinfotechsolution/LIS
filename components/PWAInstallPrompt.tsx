'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaDownload, FaMobile } from 'react-icons/fa'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Show prompt after 30 seconds if not dismissed
      setTimeout(() => {
        const dismissed = localStorage.getItem('pwa-prompt-dismissed')
        if (!dismissed) {
          setShowPrompt(true)
        }
      }, 30000)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('PWA installed')
    }
    
    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('pwa-prompt-dismissed', 'true')
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 right-6 z-50 max-w-sm"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-6">
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <FaTimes className="text-gray-500" />
            </button>

            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316] rounded-xl">
                <FaMobile className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-1">
                  Install Our App
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get quick access and work offline
                </p>
              </div>
            </div>

            <button
              onClick={handleInstall}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <FaDownload />
              Install Now
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
