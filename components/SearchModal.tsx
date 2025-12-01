'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaTimes, FaArrowRight } from 'react-icons/fa'
import { useDebounce } from '../hooks/useDebounce'

interface SearchResult {
  title: string
  description: string
  url: string
  category: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(query, 300)

  // Sample search data - replace with actual search implementation
  const searchData: SearchResult[] = [
    { title: 'Web Development', description: 'Custom web applications', url: '/services', category: 'Services' },
    { title: 'Mobile Apps', description: 'iOS and Android development', url: '/services', category: 'Services' },
    { title: 'Cloud Solutions', description: 'AWS, Azure, Google Cloud', url: '/services', category: 'Services' },
    { title: 'About Us', description: 'Learn about our company', url: '/about', category: 'Company' },
    { title: 'Our Team', description: 'Meet our experts', url: '/team', category: 'Company' },
    { title: 'Portfolio', description: 'View our projects', url: '/portfolio', category: 'Work' },
    { title: 'Blog', description: 'Latest articles and insights', url: '/blog', category: 'Resources' },
    { title: 'Contact', description: 'Get in touch with us', url: '/contact', category: 'Support' },
  ]

  useEffect(() => {
    if (debouncedQuery) {
      const filtered = searchData.filter(
        item =>
          item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
      setResults(filtered)
      setSelectedIndex(0)
    } else {
      setResults([])
    }
  }, [debouncedQuery])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        window.location.href = results[selectedIndex].url
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
                <FaSearch className="text-2xl text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for services, pages, or content..."
                  className="flex-1 text-lg bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
                />
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <FaTimes className="text-xl text-gray-500" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {query && results.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No results found for &quot;{query}&quot;
                  </div>
                )}

                {results.length > 0 && (
                  <div className="p-2">
                    {results.map((result, index) => (
                      <motion.a
                        key={index}
                        href={result.url}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center justify-between p-4 rounded-2xl transition-all group ${
                          index === selectedIndex
                            ? 'bg-gradient-to-r from-[#2A52BE]/10 to-[#F97316]/10 border-2 border-[#2A52BE]'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-[#2A52BE]/10 text-[#2A52BE]">
                              {result.category}
                            </span>
                            <h3 className="font-semibold text-gray-800 dark:text-white">
                              {result.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {result.description}
                          </p>
                        </div>
                        <FaArrowRight className="text-gray-400 group-hover:text-[#F97316] group-hover:translate-x-1 transition-all" />
                      </motion.a>
                    ))}
                  </div>
                )}

                {!query && (
                  <div className="p-8 text-center text-gray-500">
                    <FaSearch className="text-4xl mx-auto mb-4 text-gray-300" />
                    <p>Start typing to search...</p>
                    <p className="text-sm mt-2">Try &quot;web development&quot; or &quot;contact&quot;</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">↑</kbd>
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">Enter</kbd>
                    Select
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">Esc</kbd>
                  Close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
