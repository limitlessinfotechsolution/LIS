'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaEnvelope, FaBlog, FaUsers,
  FaClock, FaBell, FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa'
import Link from 'next/link'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalInquiries: 0,
    pendingInquiries: 0,
    totalSubscribers: 0,
    blogPosts: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const statCards = [
    {
      title: 'Total Inquiries',
      value: stats.totalInquiries,
      icon: FaEnvelope,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      title: 'Pending',
      value: stats.pendingInquiries,
      icon: FaClock,
      color: 'from-orange-500 to-orange-600',
      change: '5 new'
    },
    {
      title: 'Subscribers',
      value: stats.totalSubscribers,
      icon: FaUsers,
      color: 'from-green-500 to-green-600',
      change: '+8%'
    },
    {
      title: 'Blog Posts',
      value: stats.blogPosts,
      icon: FaBlog,
      color: 'from-purple-500 to-purple-600',
      change: '6 published'
    }
  ]

  return (
    <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! Here&apos;s what&apos;s happening today.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <FaBell className="text-xl text-gray-600 dark:text-gray-400" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="text-2xl text-white" />
                </div>
                <span className="text-sm font-semibold text-green-600">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Inquiries */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Recent Inquiries
              </h2>
              <Link href="/admin/inquiries">
                <span className="text-sm text-[#2A52BE] hover:underline cursor-pointer">
                  View All →
                </span>
              </Link>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A52BE] to-[#F97316] flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      New Contact Form
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      From: client@example.com
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                    Pending
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              System Status
            </h2>
            <div className="space-y-4">
              {[
                { name: 'SMTP Server', status: 'operational', icon: FaCheckCircle, color: 'text-green-500' },
                { name: 'Database', status: 'operational', icon: FaCheckCircle, color: 'text-green-500' },
                { name: 'API Services', status: 'operational', icon: FaCheckCircle, color: 'text-green-500' },
                { name: 'Backup System', status: 'warning', icon: FaExclamationTriangle, color: 'text-yellow-500' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex items-center gap-3">
                    <item.icon className={`text-xl ${item.color}`} />
                    <span className="font-medium text-gray-800 dark:text-white">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
    </div>
  )
}
