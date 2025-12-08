'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { FaBlog, FaCalendar, FaClock, FaTag, FaSearch } from 'react-icons/fa'
import { getBlogPosts, getBlogCategories } from '../../lib/blog'

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const posts = getBlogPosts()
  const categories = ['All', ...getBlogCategories()]

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-full mb-6"
        >
          <FaBlog className="text-4xl text-white" />
        </motion.div>

        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
          Our Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Insights, tutorials, and updates from our team of experts
        </p>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#2A52BE] focus:outline-none transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-2xl font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#2A52BE]'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            className="group card-base card-md hover:shadow-2xl transition-all overflow-hidden"
          >
            <Link href={`/blog/${post.slug}`}>
              {/* Featured Badge */}
              {post.featured && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-full text-sm font-bold">
                  Featured
                </div>
              )}

              {/* Image */}
              <div className="aspect-wide bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl">📝</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-sm font-semibold text-[#2A52BE]">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-[#2A52BE] transition-colors line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <FaCalendar />
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2A52BE] to-[#F97316] flex items-center justify-center text-white font-bold">
                    {post.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800 dark:text-white">
                      {post.author.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {post.author.role}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs flex items-center gap-1"
                    >
                      <FaTag className="text-[10px]" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <motion.div
                  className="mt-4 text-[#2A52BE] dark:text-[#F97316] font-semibold text-sm flex items-center gap-2"
                  whileHover={{ x: 5 }}
                >
                  Read More →
                </motion.div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
            No articles found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}

      {/* Newsletter CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-3xl p-12 text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Never Miss an Update
        </h2>
        <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
          Subscribe to our newsletter and get the latest articles, tutorials, and insights delivered to your inbox.
        </p>
        <Link href="/#newsletter">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-[#2A52BE] rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
          >
            Subscribe Now
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}
