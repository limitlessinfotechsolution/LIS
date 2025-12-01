'use client'

import { FaWifi, FaHome } from 'react-icons/fa'

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaWifi className="text-5xl text-gray-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          You&apos;re Offline
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          It looks like you&apos;ve lost your internet connection. Please check your network and try again.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="block w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            <FaHome className="inline mr-2" />
            Go to Homepage
          </button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Some cached content may still be available
        </p>
      </div>
    </div>
  )
}
