'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaHome, FaSearch, FaArrowLeft } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16">
      <div className="text-center max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-[150px] font-bold bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent leading-none">
            404
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <FaHome /> Go Home
            </motion.button>
          </Link>

          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-2xl font-bold hover:border-[#2A52BE] transition-all"
            >
              <FaSearch /> Contact Us
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <p className="text-gray-500 dark:text-gray-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Services', href: '/services' },
              { name: 'Portfolio', href: '/portfolio' },
              { name: 'Team', href: '/team' },
              { name: 'FAQ', href: '/faq' },
              { name: 'About', href: '/about' }
            ].map((link, idx) => (
              <Link key={idx} href={link.href}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm hover:bg-[#2A52BE] hover:text-white transition-colors cursor-pointer"
                >
                  {link.name}
                </motion.span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
