'use client'
import { ReactNode, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaHome, FaInbox, FaUsers, FaBlog, FaServer, FaCog,
  FaSignOutAlt, FaBell, FaDatabase
} from 'react-icons/fa'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [stats, setStats] = useState({
    pendingInquiries: 0
  })

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
      return
    }

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

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin')
  }

  const menuItems = [
    { name: 'Dashboard', icon: FaHome, href: '/admin/dashboard' },
    { name: 'Inquiries', icon: FaInbox, href: '/admin/inquiries', badge: stats.pendingInquiries },
    { name: 'Subscribers', icon: FaUsers, href: '/admin/subscribers' },
    { name: 'Blog Posts', icon: FaBlog, href: '/admin/blog' },
    { name: 'SMTP Config', icon: FaServer, href: '/admin/smtp' },
    { name: 'Settings', icon: FaCog, href: '/admin/settings' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin/dashboard">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A52BE] to-[#F97316] flex items-center justify-center">
                <FaDatabase className="text-white text-lg" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800 dark:text-white">Admin CMS</h2>
                <p className="text-xs text-gray-500">Management Panel</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="text-lg" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {item.badge && item.badge > 0 && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
          >
            <FaSignOutAlt />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        {children}
      </main>
    </div>
  )
}
