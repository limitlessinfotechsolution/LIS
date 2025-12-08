'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FaCalendar, FaClock, FaTag, FaArrowLeft, FaArrowRight, FaShare, FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { getBlogPost, getRelatedPosts } from '../../../lib/blog'

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug as string
  const post = getBlogPost(slug)

  if (!post) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-[#2A52BE] hover:underline">
          ← Back to Blog
        </Link>
      </div>
    )
  }

  const relatedPosts = getRelatedPosts(post)

  return (
    <div className="py-16">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link href="/blog">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#2A52BE] transition-colors"
          >
            <FaArrowLeft /> Back to Blog
          </motion.button>
        </Link>
      </motion.div>

      {/* Article Header */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-2 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-full text-sm font-bold mb-6"
        >
          {post.category}
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-6 text-gray-800 dark:text-white">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2A52BE] to-[#F97316] flex items-center justify-center text-white font-bold">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-800 dark:text-white">
                {post.author.name}
              </div>
              <div className="text-sm">{post.author.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendar />
            <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-3xl mb-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-9xl">📝</div>
          </div>
        </motion.div>

        {/* Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-200 dark:border-gray-700"
        >
          <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <FaShare /> Share:
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <FaFacebook />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
          >
            <FaTwitter />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
          >
            <FaLinkedin />
          </motion.button>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
        >
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-gray-200 dark:border-gray-700"
        >
          <span className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <FaTag /> Tags:
          </span>
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-[#2A52BE] hover:text-white transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 mb-12"
        >
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2A52BE] to-[#F97316] flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                {post.author.name}
              </h3>
              <p className="text-[#F97316] font-semibold mb-3">{post.author.role}</p>
              <p className="text-gray-600 dark:text-gray-400">
                {post.author.name} is a passionate technology leader with years of experience in software development and team management. 
                They regularly share insights on modern development practices and industry trends.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost, idx) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border-2 border-gray-200 dark:border-gray-700"
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl">📝</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-[#F97316] font-semibold mb-2">
                      {relatedPost.category}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <FaClock />
                      {relatedPost.readTime}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
