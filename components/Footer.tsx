'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSun, FaMoon, FaGlobe, FaCheck } from 'react-icons/fa'

export default function Footer() {
  const [isDark, setIsDark] = useState(false)
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [currentLang, setCurrentLang] = useState('EN')

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    const lang = localStorage.getItem('language')
    if (theme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
    if (lang) setCurrentLang(lang)
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  const languages = [
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'HI', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'AR', name: 'العربية', flag: '🇸🇦' }
  ]

  const selectLanguage = (code: string) => {
    setCurrentLang(code)
    setShowLangMenu(false)
    localStorage.setItem('language', code)
  }

  const socialLinks = [
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500' },
    { icon: FaGithub, href: '#', label: 'GitHub', color: 'hover:text-gray-800 dark:hover:text-gray-300' },
    { icon: FaEnvelope, href: '/contact', label: 'Email', color: 'hover:text-[#F97316]' },
    { icon: FaPhone, href: '#', label: 'Phone', color: 'hover:text-green-500'},
    { icon: FaMapMarkerAlt, href: '#', label: 'Address', color: 'hover:text-red-500' },
    { icon: FaGlobe, href: '#', label: 'Website', color: 'hover:text-blue-500' },
    { icon: FaCheck, href: '#', label: 'Check', color: 'hover:text-green-500' },
  ]

  return (
    <footer className="relative border-t border-gray-200 dark:border-gray-800 mt-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2A52BE] via-[#F97316] to-[#2A52BE]" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src="/LIS-LOGO.png" alt="Limitless Infotech" className="h-12 w-auto" />
              <div>
                <h3 className="font-bold text-xl bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
                  Limitless Infotech
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Innovation Beyond Limits
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Empowering businesses with cutting-edge technology solutions that are secure, innovative, and limitless. 
              We transform ideas into reality with expertise and passion.
            </p>

            {/* Theme & Language Controls */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#2A52BE] dark:hover:border-[#F97316] transition-all"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <>
                    <FaSun className="text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Light</span>
                  </>
                ) : (
                  <>
                    <FaMoon className="text-[#2A52BE]" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark</span>
                  </>
                )}
              </motion.button>

              {/* Language Selector */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#2A52BE] dark:hover:border-[#F97316] transition-all"
                >
                  <FaGlobe className="text-[#F97316]" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{currentLang}</span>
                </motion.button>

                {/* Language Dropdown */}
                {showLangMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowLangMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full mb-2 left-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 p-2 min-w-[200px] z-50"
                    >
                      {languages.map((lang) => (
                        <motion.button
                          key={lang.code}
                          whileHover={{ x: 4 }}
                          onClick={() => selectLanguage(lang.code)}
                          className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl transition-colors ${
                            currentLang === lang.code
                              ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{lang.flag}</span>
                            <div className="text-left">
                              <div className="text-sm font-medium">{lang.name}</div>
                              <div className={`text-xs ${currentLang === lang.code ? 'text-white/80' : 'text-gray-500'}`}>
                                {lang.code}
                              </div>
                            </div>
                          </div>
                          {currentLang === lang.code && <FaCheck className="text-sm" />}
                        </motion.button>
                      ))}
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Quick Links</h4>
            <ul className="space-y-2.5">
              {['About', 'Services', 'Portfolio', 'Team', 'Blog', 'FAQ'].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#2A52BE] dark:hover:text-[#F97316] transition-colors flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-0 h-0.5 bg-gradient-to-r from-[#2A52BE] to-[#F97316] group-hover:w-4 transition-all"
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Services</h4>
            <ul className="space-y-2.5">
              {['Web Development', 'Mobile Apps', 'Cloud Solutions', 'AI Integration', 'Cybersecurity'].map((service) => (
                <li key={service}>
                  <a
                    href="/services"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#2A52BE] dark:hover:text-[#F97316] transition-colors flex items-center gap-2 group"
                  >
                    <motion.span
                      className="w-0 h-0.5 bg-gradient-to-r from-[#2A52BE] to-[#F97316] group-hover:w-4 transition-all"
                    />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="mailto:Info@limitlessinfotech.com"
                className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-[#2A52BE] dark:hover:text-[#F97316] transition-colors group"
              >
                <FaEnvelope className="mt-1 flex-shrink-0 text-[#F97316]" />
                <span className="group-hover:underline">Info@limitlessinfotech.com</span>
              </a>
              <a
                href="tel:+917710909492"
                className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-[#2A52BE] dark:hover:text-[#F97316] transition-colors group"
              >
                <FaPhone className="mt-1 flex-shrink-0 text-[#2A52BE]" />
                <span className="group-hover:underline">+91 7710909492</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-[#F97316]" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="font-semibold text-sm mb-3 text-gray-800 dark:text-white">Follow Us</h5>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={idx}
                      href={social.href}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ${social.color} transition-all shadow-sm hover:shadow-md`}
                      aria-label={social.label}
                    >
                      <Icon className="text-lg" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} <span className="font-semibold text-gray-800 dark:text-white">Limitless Infotech Solution Pvt Ltd</span>. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-[#2A52BE] dark:hover:text-[#F97316] transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-400">•</span>
            <a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-[#2A52BE] dark:hover:text-[#F97316] transition-colors">
              Terms of Service
            </a>
            <span className="text-gray-400">•</span>
            <a href="/sitemap.xml" className="text-gray-600 dark:text-gray-400 hover:text-[#2A52BE] dark:hover:text-[#F97316] transition-colors">
              Sitemap
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
