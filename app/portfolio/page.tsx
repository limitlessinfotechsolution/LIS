'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaExternalLinkAlt, FaGithub, FaFilter, FaStar } from 'react-icons/fa'

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')

  const categories = [
    { id: 'all', name: 'All Projects', count: 12 },
    { id: 'web', name: 'Web Development', count: 5 },
    { id: 'mobile', name: 'Mobile Apps', count: 3 },
    { id: 'enterprise', name: 'Enterprise', count: 2 },
    { id: 'ecommerce', name: 'E-commerce', count: 2 }
  ]

  const projects = [
    {
      id: 1,
      title: 'FinTech Banking Platform',
      category: 'enterprise',
      description: 'Complete digital banking solution with real-time transactions, multi-currency support, and advanced security features.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      client: 'Global Bank Ltd',
      duration: '8 months',
      team: '12 developers',
      results: ['40% faster transactions', '99.9% uptime', '2M+ users'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Healthcare Management System',
      category: 'enterprise',
      description: 'Comprehensive hospital management system with patient records, appointment scheduling, and telemedicine integration.',
      technologies: ['Next.js', 'Python', 'MongoDB', 'Azure'],
      client: 'MediCare Hospital',
      duration: '6 months',
      team: '8 developers',
      results: ['50% efficiency increase', 'HIPAA compliant', '10K+ patients'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'E-commerce Marketplace',
      category: 'ecommerce',
      description: 'Multi-vendor marketplace with advanced search, payment integration, and real-time inventory management.',
      technologies: ['React', 'Express', 'MySQL', 'Stripe'],
      client: 'ShopHub Inc',
      duration: '4 months',
      team: '6 developers',
      results: ['300% sales increase', '50K+ products', '24/7 support'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Food Delivery Mobile App',
      category: 'mobile',
      description: 'Cross-platform food delivery app with real-time tracking, payment integration, and restaurant management.',
      technologies: ['React Native', 'Firebase', 'Google Maps', 'Stripe'],
      client: 'QuickEats',
      duration: '3 months',
      team: '4 developers',
      results: ['100K+ downloads', '4.8★ rating', '500+ restaurants'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Corporate Website & CMS',
      category: 'web',
      description: 'Modern corporate website with custom CMS, blog system, and advanced SEO optimization.',
      technologies: ['Next.js', 'Sanity', 'Tailwind', 'Vercel'],
      client: 'TechCorp Solutions',
      duration: '2 months',
      team: '3 developers',
      results: ['200% traffic increase', 'Top 5 Google ranking', '95 Lighthouse score'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Fitness Tracking App',
      category: 'mobile',
      description: 'Comprehensive fitness app with workout tracking, nutrition planning, and social features.',
      technologies: ['Flutter', 'Firebase', 'ML Kit', 'HealthKit'],
      client: 'FitLife Pro',
      duration: '5 months',
      team: '5 developers',
      results: ['250K+ users', '4.9★ rating', 'Featured by Apple'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

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
          <FaFilter className="text-4xl text-white" />
        </motion.div>

        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
          Our Portfolio
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Showcasing our best work across web development, mobile apps, and enterprise solutions
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(category.id)}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
              activeFilter === category.id
                ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#2A52BE]'
            }`}
          >
            {category.name}
            <span className="ml-2 text-sm opacity-75">({category.count})</span>
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -10 }}
            className={`group relative card-base card-md hover:shadow-2xl transition-all overflow-hidden ${
              project.featured ? 'border-[#2A52BE]' : ''
            }`}
          >
            {project.featured && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-full text-sm font-bold flex items-center gap-1"
              >
                <FaStar /> Featured
              </motion.div>
            )}

            {/* Project Image Placeholder */}
            <div className="aspect-wide bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl text-gray-400 dark:text-gray-500">📱</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Project Info */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-[#2A52BE] transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <motion.a
                    href={project.liveUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-[#2A52BE] hover:text-white transition-colors"
                  >
                    <FaExternalLinkAlt className="text-sm" />
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-[#2A52BE] hover:text-white transition-colors"
                  >
                    <FaGithub className="text-sm" />
                  </motion.a>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project Details */}
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div><strong>Client:</strong> {project.client}</div>
                <div><strong>Duration:</strong> {project.duration}</div>
                <div><strong>Team:</strong> {project.team}</div>
              </div>

              {/* Results */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-sm mb-2 text-gray-800 dark:text-white">Key Results:</h4>
                <ul className="space-y-1">
                  {project.results.map((result, resultIdx) => (
                    <li key={resultIdx} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 text-center bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-3xl p-12"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
          Let&apos;s discuss how we can bring your vision to life with our proven expertise and innovative approach.
        </p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-10 py-4 bg-white text-[#2A52BE] rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
        >
          Get Started Today
        </motion.a>
      </motion.div>
    </div>
  )
}
