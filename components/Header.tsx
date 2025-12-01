'use client'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import MaterialIcon from './MaterialIcon'
import NotificationCenter from './NotificationCenter'
import SearchModal from './SearchModal'

export default function Header() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    
    // Hide navbar when scrolling down, show when scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }

    // Add glass effect when scrolled
    setScrolled(latest > 50)
  })

  const navLinks = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'About', href: '/about', icon: 'groups' },
    { name: 'Services', href: '/services', icon: 'settings' },
    { name: 'Portfolio', href: '/portfolio', icon: 'work' },
    { name: 'Team', href: '/team', icon: 'badge' },
    { name: 'Blog', href: '/blog', icon: 'article' },
    { name: 'Portal', href: '/portal', icon: 'lock' },
    { name: 'Contact', href: '/contact', icon: 'mail' }
  ]

  return (
    <>
      {/* Enhanced Floating Navigation with Auto-Hide */}
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-3 md:px-4 pt-4 md:pt-6"
      >
        <motion.div
          animate={{
            maxWidth: scrolled ? '96%' : '92%',
            padding: scrolled ? '10px 20px' : '14px 28px'
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`mx-auto rounded-[28px] md:rounded-[32px] transition-all duration-300 ${
            scrolled
              ? 'glass-nav-scrolled'
              : 'glass-nav'
          }`}
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          <div className="flex items-center justify-between">
            {/* Professional Logo - Text Based */}
            <Link href="/" className="flex items-center gap-2 md:gap-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative flex items-center justify-center"
              >
                {/* Animated Background Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-[#2A52BE] to-[#F97316] rounded-full blur-xl"
                />
                
                {/* Icon Container */}
                <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#2A52BE] to-[#F97316] flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
                  <MaterialIcon icon="all_inclusive" className="text-white" size={28} />
                </div>
              </motion.div>
              
              {/* Brand Text */}
              <div className="flex flex-col">
                <motion.div 
                  className="font-bold text-base md:text-xl tracking-tight"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="bg-gradient-to-r from-[#2A52BE] via-[#3d5fc4] to-[#F97316] bg-clip-text text-transparent">
                    Limitless
                  </span>
                  <span className="text-gray-800 dark:text-white ml-1">
                    Infotech
                  </span>
                </motion.div>
                <div className="hidden md:block text-[10px] tracking-wider uppercase text-gray-500 dark:text-gray-400 font-medium">
                  Innovation Beyond Limits
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2.5 rounded-xl group"
                  >
                    <span className="relative z-10 font-semibold text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#2A52BE] dark:group-hover:text-[#F97316] transition-colors flex items-center gap-2">
                      <MaterialIcon 
                        icon={link.icon} 
                        className="opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all"
                        size={20}
                      />
                      {link.name}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#2A52BE]/10 to-[#F97316]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                      layoutId="navbar-hover"
                    />
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* Right Actions & CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gradient-to-r hover:from-[#2A52BE]/20 hover:to-[#F97316]/20 transition-all"
                aria-label="Search"
              >
                <MaterialIcon icon="search" size={20} />
              </motion.button>

              {/* Notification Center */}
              <NotificationCenter />

              {/* Vertical Divider */}
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
              
              {/* CTA Button */}
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-2.5 rounded-xl font-bold text-sm text-white overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A52BE] to-[#F97316]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-[#2A52BE] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  <MaterialIcon icon="rocket_launch" size={20} />
                  Get Started
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <MaterialIcon icon="arrow_forward" size={18} />
                  </motion.span>
                </span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MaterialIcon icon="close" size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MaterialIcon icon="menu" size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop with Glass Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-md z-40 lg:hidden"
            />

            {/* Menu Panel with Glass Effect */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm glass-panel shadow-2xl z-50 lg:hidden overflow-y-auto"
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex justify-between items-center mb-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A52BE] to-[#F97316] flex items-center justify-center shadow-lg">
                      <MaterialIcon icon="all_inclusive" className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-base">
                        <span className="bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
                          Limitless
                        </span>
                        <span className="text-gray-800 dark:text-white ml-1">
                          Infotech
                        </span>
                      </div>
                      <div className="text-[9px] tracking-wider uppercase text-gray-500 dark:text-gray-400">
                        Menu
                      </div>
                    </div>
                  </div>
                  
                  {/* Close Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Close menu"
                  >
                    <MaterialIcon icon="close" className="text-gray-700 dark:text-gray-300" size={24} />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-2">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#2A52BE]/10 hover:to-[#F97316]/10 hover:scale-[1.02] transition-all backdrop-blur-sm group"
                      >
                        <MaterialIcon 
                          icon={link.icon} 
                          className="group-hover:scale-110 transition-transform"
                          size={24}
                        />
                        <span className="flex-1">{link.name}</span>
                        <motion.span
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <MaterialIcon icon="arrow_forward" size={20} />
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* CTA Button */}
                <motion.a
                  href="/contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-xl font-bold text-center shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <MaterialIcon icon="rocket_launch" size={20} />
                  Get Started
                  <MaterialIcon icon="arrow_forward" size={20} />
                </motion.a>

                {/* Mobile Menu Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                      Innovation Beyond Limits
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      © 2025 Limitless Infotech
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Advanced Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Spacer */}
      <div className="h-20 md:h-24" />
    </>
  )
}
