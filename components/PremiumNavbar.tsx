'use client'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaSearch, FaBell, FaUser, FaChevronDown, FaRocket, FaCode, FaMobile, FaCloud, FaShieldAlt, FaBrain, FaHome, FaInfoCircle, FaBriefcase, FaImages, FaUsers, FaBlog, FaEnvelope, FaStar, FaFire, FaTrophy } from 'react-icons/fa'
import SearchModal from './SearchModal'
import NotificationCenter from './NotificationCenter'

export default function PremiumNavbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    
    if (latest > previous && latest > 150) {
      setHidden(true)
      setActiveDropdown(null)
    } else {
      setHidden(false)
    }

    setScrolled(latest > 50)
  })

  const services = [
    { name: 'Web Development', icon: FaCode, href: '/services#web', color: 'from-blue-500 to-cyan-500' },
    { name: 'Mobile Apps', icon: FaMobile, href: '/services#mobile', color: 'from-purple-500 to-pink-500' },
    { name: 'Cloud Solutions', icon: FaCloud, href: '/services#cloud', color: 'from-cyan-500 to-blue-500' },
    { name: 'AI Integration', icon: FaBrain, href: '/services#ai', color: 'from-orange-500 to-red-500' },
    { name: 'Cybersecurity', icon: FaShieldAlt, href: '/services#security', color: 'from-green-500 to-emerald-500' },
  ]

  const navLinks = [
    { name: 'Home', href: '/', icon: FaHome },
    { name: 'About', href: '/about', icon: FaInfoCircle },
    { name: 'Services', href: '/services', icon: FaBriefcase, hasDropdown: true },
    { name: 'Portfolio', href: '/portfolio', icon: FaImages },
    { name: 'Team', href: '/team', icon: FaUsers },
    { name: 'Blog', href: '/blog', icon: FaBlog },
    { name: 'Contact', href: '/contact', icon: FaEnvelope },
  ]

  return (
    <>
      {/* Premium Floating Navbar */}
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
      >
        <motion.div
          animate={{
            maxWidth: scrolled ? '98%' : '96%',
          }}
          transition={{ duration: 0.3 }}
          className="mx-auto"
        >
          {/* Glass Morphism Container */}
          <div className={`relative rounded-3xl transition-all duration-300 ${
            scrolled
              ? 'bg-white/80 dark:bg-gray-900/80 shadow-2xl backdrop-blur-2xl'
              : 'bg-white/70 dark:bg-gray-900/70 shadow-xl backdrop-blur-xl'
          }`}
          style={{
            border: '1px solid rgba(255, 255, 255, 0.18)',
          }}>
            {/* Gradient Border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#2A52BE] via-[#F97316] to-[#2A52BE] opacity-20 blur-sm" />
            
            {/* Content */}
            <div className="relative px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    {/* Animated Glow */}
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-[#2A52BE] via-[#3B82F6] to-[#F97316] rounded-2xl blur-xl"
                    />
                    
                    {/* Logo Icon */}
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2A52BE] via-[#3B82F6] to-[#F97316] flex items-center justify-center shadow-2xl">
                      <span className="text-white text-2xl font-black">L</span>
                    </div>
                  </motion.div>
                  
                  {/* Brand Text */}
                  <div className="hidden sm:block">
                    <motion.div 
                      className="font-black text-2xl tracking-tight leading-none"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="bg-gradient-to-r from-[#2A52BE] via-[#3B82F6] to-[#F97316] bg-clip-text text-transparent">
                        LIMITLESS
                      </span>
                    </motion.div>
                    <div className="text-[9px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-400 font-bold mt-0.5">
                      Infotech Solutions
                    </div>
                  </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                  {navLinks.map((link) => (
                    <div key={link.name} className="relative">
                      {link.hasDropdown ? (
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all ${
                            activeDropdown === 'services'
                              ? 'bg-gradient-to-r from-[#2A52BE]/10 to-[#F97316]/10 text-[#2A52BE] dark:text-[#F97316]'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#2A52BE]/10 hover:to-[#F97316]/10'
                          }`}
                        >
                          <link.icon className="text-lg" />
                          {link.name}
                          <motion.div
                            animate={{ rotate: activeDropdown === 'services' ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaChevronDown className="text-xs" />
                          </motion.div>
                        </motion.button>
                      ) : (
                        <Link href={link.href}>
                          <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#2A52BE]/10 hover:to-[#F97316]/10 hover:text-[#2A52BE] dark:hover:text-[#F97316] transition-all"
                          >
                            <link.icon className="text-lg" />
                            {link.name}
                          </motion.div>
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                  {/* Search */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchOpen(true)}
                    className="hidden md:flex p-3 rounded-2xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gradient-to-r hover:from-[#2A52BE]/20 hover:to-[#F97316]/20 transition-all"
                  >
                    <FaSearch className="text-lg" />
                  </motion.button>

                  {/* Notifications */}
                  <div className="hidden md:block">
                    <NotificationCenter />
                  </div>

                  {/* Divider */}
                  <div className="hidden lg:block h-8 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-2" />

                  {/* CTA Button */}
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden lg:flex relative px-6 py-3 rounded-2xl font-black text-sm text-white overflow-hidden group shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2A52BE] via-[#3B82F6] to-[#F97316]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] via-[#3B82F6] to-[#2A52BE] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center gap-2">
                      <FaRocket />
                      GET STARTED
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.a>

                  {/* Mobile Menu Button */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-3 rounded-2xl bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg"
                  >
                    <AnimatePresence mode="wait">
                      {mobileMenuOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                        >
                          ✕
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                        >
                          ☰
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Services Mega Menu */}
          <AnimatePresence>
            {activeDropdown === 'services' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 right-0 mt-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20">
                  <div className="grid grid-cols-5 gap-4">
                    {services.map((service, idx) => (
                      <Link
                        key={idx}
                        href={service.href}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                          className="group p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700"
                        >
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                            <service.icon className="text-2xl text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#2A52BE] dark:group-hover:text-[#F97316] transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Professional solutions
                          </p>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Mobile Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2A52BE] via-[#3B82F6] to-[#F97316] flex items-center justify-center shadow-xl">
                      <span className="text-white text-2xl font-black">L</span>
                    </div>
                    <div>
                      <div className="font-black text-lg bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
                        LIMITLESS
                      </div>
                      <div className="text-[8px] tracking-wider uppercase text-gray-500">
                        Menu
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800"
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Mobile Navigation */}
                <nav className="space-y-2">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-4 rounded-2xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#2A52BE]/10 hover:to-[#F97316]/10 transition-all group"
                      >
                        <link.icon className="text-xl" />
                        <span className="flex-1">{link.name}</span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <motion.a
                  href="/contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#2A52BE] via-[#3B82F6] to-[#F97316] text-white rounded-2xl font-black shadow-xl"
                >
                  <FaRocket />
                  GET STARTED
                  →
                </motion.a>

                {/* Mobile Stats */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { icon: FaStar, label: '120+', sub: 'Projects' },
                    { icon: FaFire, label: '50+', sub: 'Experts' },
                    { icon: FaTrophy, label: '95%', sub: 'Success' },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
                    >
                      <stat.icon className="text-2xl text-[#F97316] mx-auto mb-2" />
                      <div className="font-black text-lg text-gray-900 dark:text-white">{stat.label}</div>
                      <div className="text-xs text-gray-500">{stat.sub}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Spacer */}
      <div className="h-24" />
    </>
  )
}
