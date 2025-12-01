'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaHome, FaEnvelope, FaBlog, FaCog, FaUsers, FaChartLine,
  FaInbox, FaServer, FaSignOutAlt, FaBell, FaChevronLeft, FaChevronRight
} from 'react-icons/fa'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [stats, setStats] = useState({
    pendingInquiries: 0
  })

  useEffect(() => {
    // Check authentication (except for login page)
    if (pathname !== '/admin') {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        router.push('/admin')
        return
      }

      // Fetch stats for badge
      fetchStats()
    }
  }, [pathname, router])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      const data = await response.json()
      setStats({ pendingInquiries: data.pendingInquiries || 0 })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    router.push('/admin')
  }

  const menuSections = [
    {
      title: 'Main',
      items: [
        { id: 'dashboard', name: 'Dashboard', icon: FaHome, href: '/admin/dashboard', color: 'blue' },
        { id: 'inquiries', name: 'Inquiries', icon: FaInbox, href: '/admin/inquiries', badge: stats.pendingInquiries, color: 'orange' },
        { id: 'webmail', name: 'Webmail', icon: FaEnvelope, href: '/admin/webmail', color: 'purple' }
      ]
    },
    {
      title: 'Content',
      items: [
        { id: 'blog', name: 'Blog Posts', icon: FaBlog, href: '/admin/blog', color: 'green' },
        { id: 'newsletter', name: 'Newsletter', icon: FaUsers, href: '/admin/newsletter', color: 'pink' }
      ]
    },
    {
      title: 'Analytics',
      items: [
        { id: 'analytics', name: 'Analytics', icon: FaChartLine, href: '/admin/analytics', color: 'indigo' },
        { id: 'activity', name: 'Activity Log', icon: FaBell, href: '/admin/activity', color: 'yellow' }
      ]
    },
    {
      title: 'Settings',
      items: [
        { id: 'smtp', name: 'SMTP Config', icon: FaServer, href: '/admin/smtp', color: 'gray' }
      ]
    }
  ]

  // Don't show sidebar on login page
  if (pathname === '/admin') {
    return <>{children}</>
  }

  const sidebarWidth = isCollapsed ? 'w-20' : 'w-72'
  const mainMargin = isCollapsed ? 'ml-20' : 'ml-72'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 288 }}
        className={`fixed left-0 top-0 bottom-0 bg-white dark:bg-gray-800 shadow-xl z-40 overflow-hidden`}
      >
        {/* Logo & Toggle */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 relative">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2A52BE] via-[#3B82F6] to-[#F97316] flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">L</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-800 dark:text-white text-lg">Limitless</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2A52BE] via-[#3B82F6] to-[#F97316] flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">L</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-8 w-6 h-6 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            {isCollapsed ? <FaChevronRight className="text-xs" /> : <FaChevronLeft className="text-xs" />}
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6 pb-24 overflow-y-auto h-[calc(100vh-180px)]">
          {menuSections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {!isCollapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-4 mb-3"
                >
                  {section.title}
                </motion.p>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  
                  return (
                    <Link key={item.id} href={item.href}>
                      <motion.div
                        whileHover={{ x: isCollapsed ? 0 : 4, scale: isCollapsed ? 1.05 : 1 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3 rounded-xl cursor-pointer transition-all group ${
                          isActive
                            ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className={`flex items-center ${isCollapsed ? '' : 'gap-3'}`}>
                          <div className={`${isActive ? 'text-white' : `text-${item.color}-500`} transition-colors`}>
                            <item.icon className="text-xl" />
                          </div>
                          <AnimatePresence>
                            {!isCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 'auto' }}
                                exit={{ opacity: 0, width: 0 }}
                                className="font-medium whitespace-nowrap"
                              >
                                {item.name}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                        {item.badge && item.badge > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`${isCollapsed ? 'absolute -top-1 -right-1' : ''} px-2 py-1 bg-red-500 text-white text-xs rounded-full font-bold shadow-lg`}
                          >
                            {item.badge}
                          </motion.span>
                        )}
                        
                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"
                          />
                        )}
                      </motion.div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl`}
          >
            <FaSignOutAlt className="text-lg" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-medium whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={false}
        animate={{ marginLeft: isCollapsed ? 80 : 288 }}
        className="transition-all duration-300"
      >
        {children}
      </motion.main>
    </div>
  )
}
