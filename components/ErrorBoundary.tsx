'use client'
import { Component, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { FaExclamationTriangle } from 'react-icons/fa'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

// Error handling: Error boundary component
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full card-base card-lg text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-6"
            >
              <FaExclamationTriangle className="text-4xl text-red-500" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Oops! Something went wrong
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We&apos;re sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
            </p>

            {this.state.error && (
              <details className="text-left mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                <summary className="cursor-pointer font-semibold mb-2">
                  Error Details
                </summary>
                <code className="text-red-600 dark:text-red-400 break-all">
                  {this.state.error.toString()}
                </code>
              </details>
            )}

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Refresh Page
              </motion.button>
              
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold hover:border-[#2A52BE] transition-all"
              >
                Go Home
              </motion.a>
            </div>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}
