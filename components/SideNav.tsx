'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import MaterialIcon from './MaterialIcon'

interface NavItem {
  name: string
  href: string
  icon: string
  badge?: number
}

interface NavSection {
  title: string
  items: NavItem[]
}

export default function SideNav() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()

  const navSections: NavSection[] = [
    {
      title: 'Main',
      items: [
        { name: 'Home', href: '/', icon: 'home' },
        { name: 'About', href: '/about', icon: 'info' },
        { name: 'Services', href: '/services', icon: 'handyman' },
        { name: 'Portfolio', href: '/portfolio', icon: 'work' },
      ]
    },
    {
      title: 'Resources',
      items: [
        { name: 'Blog', href: '/blog', icon: 'article' },
        { name: 'Team', href: '/team', icon: 'groups' },
        { name: 'FAQ', href: '/faq', icon: 'help' },
      ]
    },
    {
      title: 'Connect',
      items: [
        { name: 'Contact', href: '/contact', icon: 'mail' },
        { name: 'Portal', href: '/portal', icon: 'lock' },
      ]
    }
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Side Navigation - Hidden on mobile when using HybridNavLayout */}
      <motion.aside
        initial={false}
        animate={{
          width: isExpanded ? '280px' : '80px'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="fixed left-0 top-0 bottom-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 overflow-hidden hidden lg:block"
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="h-24 flex items-center justify-center border-b border-gray-200 dark:border-gray-800 px-4">
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2A52BE] to-[#F97316] flex items-center justify-center shadow-lg flex-shrink-0"
              >
                <MaterialIcon icon="all_inclusive" className="text-white" size={32} />
              </motion.div>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="font-bold text-xl whitespace-nowrap leading-tight">
                      <span className="bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
                        Limitless
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest whitespace-nowrap font-medium">
                      Infotech
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </div>

          {/* Navigation Sections */}
          <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-10">
            {navSections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                {/* Section Title */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2, delay: sectionIdx * 0.05 }}
                      className="px-3 mb-4"
                    >
                      <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                        {section.title}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Section Items */}
                <div className="space-y-2">
                  {section.items.map((item, itemIdx) => {
                    const active = isActive(item.href)
                    
                    return (
                      <Link key={itemIdx} href={item.href}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`
                            relative flex items-center gap-4 px-3 py-3.5 rounded-xl cursor-pointer
                            transition-all duration-200
                            ${active 
                              ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg shadow-blue-500/20' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                            }
                          `}
                        >
                          {/* Active Indicator */}
                          {active && (
                            <motion.div
                              layoutId="activeIndicator"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-white rounded-r-full"
                              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                          )}

                          {/* Icon */}
                          <div className="flex-shrink-0 w-6 flex items-center justify-center">
                            <MaterialIcon 
                              icon={item.icon} 
                              size={22}
                              filled={active}
                            />
                          </div>

                          {/* Label */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="font-semibold text-[15px] whitespace-nowrap"
                              >
                                {item.name}
                              </motion.span>
                            )}
                          </AnimatePresence>

                          {/* Badge */}
                          {item.badge && isExpanded && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full"
                            >
                              {item.badge}
                            </motion.span>
                          )}
                        </motion.div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-4 px-3 py-3.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-6 flex items-center justify-center flex-shrink-0">
                <MaterialIcon icon="dark_mode" size={22} />
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-semibold text-[15px] whitespace-nowrap"
                  >
                    Dark Mode
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* User Profile */}
            <motion.div
              whileHover={{ x: 4 }}
              className="mt-3 flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2A52BE] to-[#F97316] flex items-center justify-center flex-shrink-0 shadow-md">
                <MaterialIcon icon="person" className="text-white" size={22} />
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="overflow-hidden"
                  >
                    <div className="font-semibold text-[15px] text-gray-800 dark:text-white whitespace-nowrap leading-tight">
                      Guest User
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap mt-0.5">
                      View Profile
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Toggle Button - Removed when using HybridNavLayout */}
    </>
  )
}
