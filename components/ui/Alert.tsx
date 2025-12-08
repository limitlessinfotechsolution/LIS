'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'
import MaterialIcon from '../MaterialIcon'

interface AlertProps {
  children: ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  dismissible?: boolean
  onDismiss?: () => void
  icon?: string
  className?: string
}

export default function Alert({
  children,
  variant = 'info',
  title,
  dismissible = false,
  onDismiss,
  icon,
  className = ''
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  const variants = {
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-300',
      icon: icon || 'info',
      iconColor: 'text-blue-500'
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-300',
      icon: icon || 'check_circle',
      iconColor: 'text-green-500'
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-300',
      icon: icon || 'warning',
      iconColor: 'text-yellow-500'
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-300',
      icon: icon || 'error',
      iconColor: 'text-red-500'
    }
  }

  const config = variants[variant]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          className={`
            relative p-4 rounded-xl border-2
            ${config.bg} ${config.border}
            ${className}
          `}
        >
          <div className="flex gap-3">
            <div className={`flex-shrink-0 ${config.iconColor}`}>
              <MaterialIcon icon={config.icon} size={24} />
            </div>
            
            <div className="flex-1">
              {title && (
                <h3 className={`font-semibold mb-1 ${config.text}`}>
                  {title}
                </h3>
              )}
              <div className={`text-sm ${config.text}`}>
                {children}
              </div>
            </div>
            
            {dismissible && (
              <button
                onClick={handleDismiss}
                className={`
                  flex-shrink-0 p-1 rounded-lg
                  hover:bg-black/5 dark:hover:bg-white/5
                  transition-colors ${config.text}
                `}
              >
                <MaterialIcon icon="close" size={20} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
