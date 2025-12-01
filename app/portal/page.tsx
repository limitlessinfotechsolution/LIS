'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaLock, FaUser, FaEnvelope, FaKey, FaShieldAlt, FaChartLine, FaFileAlt, FaComments, FaClock, FaCheckCircle } from 'react-icons/fa'

export default function ClientPortal() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const features = [
    {
      icon: FaChartLine,
      title: 'Project Dashboard',
      description: 'Real-time project progress tracking with detailed analytics and milestones'
    },
    {
      icon: FaFileAlt,
      title: 'Document Management',
      description: 'Secure access to all project documents, contracts, and deliverables'
    },
    {
      icon: FaComments,
      title: 'Direct Communication',
      description: 'Chat directly with your project team and get instant responses'
    },
    {
      icon: FaClock,
      title: 'Time Tracking',
      description: 'Transparent time logs and billing information for your projects'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Private',
      description: 'Bank-level encryption and security for all your sensitive data'
    },
    {
      icon: FaCheckCircle,
      title: 'Task Management',
      description: 'Track tasks, approvals, and feedback in one centralized location'
    }
  ]

  const benefits = [
    '24/7 Access to Your Projects',
    'Real-Time Progress Updates',
    'Secure File Sharing',
    'Direct Team Communication',
    'Transparent Billing',
    'Mobile-Friendly Interface'
  ]

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-full mb-6 shadow-2xl"
        >
          <FaLock className="text-5xl text-white" />
        </motion.div>

        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
          Client Portal
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Access your projects, track progress, and collaborate with our team in real-time through our secure client portal
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Login/Signup Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:sticky lg:top-32"
        >
          <div className="card-base card-xl shadow-2xl">
            {/* Toggle Tabs */}
            <div className="flex gap-2 mb-8 p-1 bg-gray-100 dark:bg-gray-900 rounded-2xl">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  isLogin
                    ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Login
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  !isLogin
                    ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Sign Up
              </motion.button>
            </div>

            <form className="space-y-6">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-[#2A52BE] focus:outline-none transition-colors"
                    />
                  </div>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-[#2A52BE] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-[#2A52BE] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-600 dark:text-gray-400">Remember me</span>
                  </label>
                  <a href="#" className="text-[#2A52BE] hover:text-[#F97316] font-semibold">
                    Forgot password?
                  </a>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                {isLogin ? 'Login to Portal' : 'Create Account'}
              </motion.button>
            </form>

            {/* Security Badge */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <FaShieldAlt className="text-green-500 text-xl" />
                <span>Secured with 256-bit SSL encryption</span>
              </div>
            </div>
          </div>

          {/* Demo Access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-6 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800"
          >
            <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">
              Want to See a Demo?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Contact us to schedule a personalized demo of our client portal and see how it can streamline your project management.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-white dark:bg-gray-800 text-[#2A52BE] rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Request Demo
            </a>
          </motion.div>
        </motion.div>

        {/* Features & Benefits */}
        <div className="space-y-8">
          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              Portal Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card-base card-md shadow-lg hover:border-[#2A52BE] transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card-gradient card-lg shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">
              Why Use Our Portal?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + idx * 0.05 }}
                  className="flex items-center gap-3 text-white"
                >
                  <FaCheckCircle className="text-xl flex-shrink-0" />
                  <span className="font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card-base card-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Need Help?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="px-6 py-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Contact Support
              </a>
              <a
                href="/faq"
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                View FAQ
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
