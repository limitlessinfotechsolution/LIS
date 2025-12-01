'use client'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useEffect } from 'react'
import MaterialIcon from './MaterialIcon'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import NotificationCenter from './NotificationCenter'
import SearchModal from './SearchModal'

export default function HeaderAdvanced() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    
    if (latest > previous && latest > 150) {
      setHidden(true)
      setActiveMegaMenu(null)
    } else {
      setHidden(false)
    }

    setScrolled(latest > 50)
  })

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMegaMenu(null)
    if (activeMegaMenu) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [activeMegaMenu])

  const megaMenus = {
    services: {
      title: 'Our Services',
      sections: [
        {
          title: 'Development',
          icon: 'code',
          items: [
            { name: 'Web Development', href: '/services#web', icon: 'language' },
            { name: 'Mobile Apps', href: '/services#mobile', icon: 'phone_iphone' },
            { name: 'Custom Software', href: '/services#software', icon: 'settings' }
          ]
        },
        {
          title: 'Cloud & Infrastructure',
          icon: 'cloud',
          items: [
            { name: 'Cloud Solutions', href: '/services#cloud', icon: 'cloud_upload' },
            { name: 'DevOps', href: '/services#devops', icon: 'sync' },
            { name: 'Hosting', href: '/services#hosting', icon: 'dns' }
          ]
        },
        {
          title: 'Design & Marketing',
          icon: 'palette',
          items: [
            { name: 'UI/UX Design', href: '/services#design', icon: 'brush' },
            { name: 'Digital Marketing', href: '/services#marketing', icon: 'campaign' },
            { name: 'SEO Services', href: '/services#seo', icon: 'search' }
          ]
        }
      ]
    },
    company: {
      title: 'Company',
      sections: [
        {
          title: 'About Us',
          icon: 'business',
          items: [
            { name: 'Our Story', href: '/about', icon: 'auto_stories' },
            { name: 'Team', href: '/team', icon: 'groups' },
            { name: 'Careers', href: '/careers', icon: 'work' }
          ]
        },
        {
          title: 'Resources',
          icon: 'library_books',
          items: [
            { name: 'Blog', href: '/blog', icon: 'article' },
            { name: 'Portfolio', href: '/portfolio', icon: 'folder' },
            { name: 'FAQ', href: '/faq', icon: 'help' }
          ]
        }
      ]
    }
  }

  const quickLinks = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'About', href: '/about', icon: 'info' },
    { name: 'Contact', href: '/contact', icon: 'mail' }
  ]

  return (
    <>
      {/* Advanced Floating Navigation */}
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
            maxWidth: scrolled ? '98%' : '95%',
            padding: scrolled ? '8px 16px' : '12px 24px'
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`mx-auto rounded-[32px] transition-all duration-300 ${
            scrolled
              ? 'bg-white/80 dark:bg-gray-900/80 shadow-2xl'
              : 'bg-white/70 dark:bg-gray-900/70 shadow-xl'
          }`}
          style={{
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.18)'
          }}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Premium Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-[#2A52BE] via-[#3B82F6] to-[#F97316] rounded-2xl blur-xl"
                />
                
                <div className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#2A52BE] via-[#3B82F6] to-[#F97316] flex items-center justify-center shadow-2xl">
                  <span className="text-white text-2xl md:text-3xl font-black">L</span>
                </div>
              </motion.div>
              
              <div className="hidden sm:flex flex-col">
                <motion.div 
                  className="font-black text-xl md:text-2xl tracking-tight leading-none"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="bg-gradient-to-r from-[#2A52BE] via-[#3B82F6] to-[#F97316] bg-clip-text text-transparent">
                    LIMITLESS
                  </span>
                </motion.div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 font-bold mt-0.5">
                  Infotech Solutions
                </div>
              </div>
            </Link>

            {/* Desktop Navigation with Mega Menu */}
            <nav className="hidden lg:flex items-center gap-1">
              {quickLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2.5 rounded-2xl hover:bg-gradient-to-r hover:from-[#2A52BE]/10 hover:to-[#F97316]/10 transition-all group"
                  >
                    <span className="font-bold text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#2A52BE] dark:group-hover:text-[#F97316] transition-colors flex items-center gap-2">
                      <MaterialIcon icon={link.icon} size={20} />
                      {link.name}
                    </span>
                  </motion.div>
                </Link>
              ))}

              {/* Services Mega Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveMegaMenu(activeMegaMenu === 'services' ? null : 'services')
                  }}
                  className={`px-4 py-2.5 rounded-2xl transition-all group flex items-center gap-2 ${
                    activeMegaMenu === 'services' 
                      ? 'bg-gradient-to-r from-[#2A52BE]/10 to-[#F97316]/10' 
                      : 'hover:bg-gradient-to-r hover:from-[#2A52BE]/10 hover:to-[#F97316]/10'
                  }`}
                >
                  <span className="font-bold text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#2A52BE] dark:group-hover:text-[#F97316] transition-colors flex items-center gap-2">
                    <MaterialIcon icon="apps" size={20} />
                    Services
                    <motion.span
                      animate={{ rotate: activeMegaMenu === 'services' ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MaterialIcon icon="expand_more" size={20} />
                    </motion.span>
                  </span>
                </motion.button>
              </div>

              {/* Company Mega Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveMegaMenu(activeMegaMenu === 'company' ? null : 'company')
                  }}
                  className={`px-4 py-2.5 rounded-2xl transition-all group flex items-center gap-2 ${
                    activeMegaMenu === 'company' 
                      ? 'bg-gradient-to-r from-[#2A52BE]/10 to-[#F97316]/10' 
                      : 'hover:bg-gradient-to-r hover:from-[#2A52BE]/10 hover:to-[#F97316]/10'
                  }`}
                >
                  <span className="font-bold text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#2A52BE] dark:group-hover:text-[#F97316] transition-colors flex items-center gap-2">
                    <MaterialIcon icon="business" size={20} />
                    Company
                    <motion.span
                      animate={{ rotate: activeMegaMenu === 'company' ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MaterialIcon icon="expand_more" size={20} />
                    </motion.span>
                  </span>
                </motion.button>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button - Opens SearchModal */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex p-2.5 rounded-2xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gradient-to-r hover:from-[#2A52BE]/20 hover:to-[#F97316]/20 transition-all"
                aria-label="Search"
              >
                <MaterialIcon icon="search" size={22} />
              </motion.button>

              {/* Notification Center */}
              <div className="hidden md:block">
                <NotificationCenter />
              </div>

              {/* Theme Toggle */}
              <div className="hidden md:block">
                <ThemeToggle />
              </div>

              {/* Language Toggle */}
              <div className="hidden md:block">
                <LanguageToggle />
              </div>

              {/* Divider */}
              <div className="hidden lg:block h-8 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-2" />

              {/* CTA Button */}
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:flex relative px-6 py-2.5 rounded-2xl font-black text-sm text-white overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#2A52BE] via-[#3B82F6] to-[#F97316]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#F97316] via-[#3B82F6] to-[#2A52BE] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  <MaterialIcon icon="rocket_launch" size={20} />
                  GET STARTED
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <MaterialIcon icon="arrow_forward" size={18} />
                  </motion.span>
                </span>
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-2xl bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg"
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
          </div>
        </motion.div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMegaMenu && megaMenus[activeMegaMenu as keyof typeof megaMenus] && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 right-0 mt-4 mx-auto max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-black mb-6 bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
                  {megaMenus[activeMegaMenu as keyof typeof megaMenus].title}
                </h3>
                <div className="grid grid-cols-3 gap-8">
                  {megaMenus[activeMegaMenu as keyof typeof megaMenus].sections.map((section, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <MaterialIcon icon={section.icon} className="text-[#2A52BE]" size={24} />
                        <h4 className="font-bold text-gray-900 dark:text-white">{section.title}</h4>
                      </div>
                      <div className="space-y-2">
                        {section.items.map((item, itemIdx) => (
                          <Link
                            key={itemIdx}
                            href={item.href}
                            onClick={() => setActiveMegaMenu(null)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#2A52BE]/10 hover:to-[#F97316]/10 transition-all group"
                          >
                            <MaterialIcon icon={item.icon} className="text-gray-500 group-hover:text-[#F97316] transition-colors" size={20} />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#2A52BE] dark:group-hover:text-[#F97316] transition-colors">
                              {item.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Advanced Search Modal Component */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Menu - Same as before */}
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
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2A52BE] via-[#3B82F6] to-[#F97316] flex items-center justify-center shadow-xl">
                      <span className="text-white text-2xl font-black">L</span>
                    </div>
                    <div>
                      <div className="font-black text-lg bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
                        LIMITLESS
                      </div>
                      <div className="text-[9px] tracking-wider uppercase text-gray-500">
                        Menu
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800"
                  >
                    <MaterialIcon icon="close" size={24} />
                  </motion.button>
                </div>

                <nav className="space-y-2">
                  {[...quickLinks, ...Object.values(megaMenus).flatMap(menu => 
                    menu.sections.flatMap(section => section.items)
                  )].map((link, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#2A52BE]/10 hover:to-[#F97316]/10 transition-all group"
                      >
                        <MaterialIcon icon={link.icon} size={24} />
                        <span className="flex-1">{link.name}</span>
                        <MaterialIcon icon="arrow_forward" className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.a
                  href="/contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#2A52BE] via-[#3B82F6] to-[#F97316] text-white rounded-2xl font-black shadow-xl"
                >
                  <MaterialIcon icon="rocket_launch" size={20} />
                  GET STARTED
                  <MaterialIcon icon="arrow_forward" size={20} />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="h-20 md:h-24" />
    </>
  )
}
