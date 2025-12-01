'use client'
import { motion } from 'framer-motion'
import SideNav from '../../components/SideNav'
import MaterialIcon from '../../components/MaterialIcon'

export default function DemoSideNav() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <SideNav />
      
      {/* Main Content */}
      <main className="flex-1 ml-20 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
              Dual-Tier Side Navigation Demo
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Hover over the sidebar to expand it and see the full navigation menu
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: 'auto_awesome',
                title: 'Auto Expand',
                description: 'Sidebar automatically expands on hover'
              },
              {
                icon: 'category',
                title: 'Organized Sections',
                description: 'Navigation items grouped by category'
              },
              {
                icon: 'animation',
                title: 'Smooth Animations',
                description: 'Fluid transitions and micro-interactions'
              },
              {
                icon: 'palette',
                title: 'Modern Design',
                description: 'Clean, professional Material Design'
              },
              {
                icon: 'devices',
                title: 'Responsive',
                description: 'Works perfectly on all screen sizes'
              },
              {
                icon: 'accessibility',
                title: 'Accessible',
                description: 'WCAG compliant with keyboard navigation'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2A52BE] to-[#F97316] flex items-center justify-center mb-4">
                  <MaterialIcon icon={feature.icon} className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-2xl p-8 text-white"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MaterialIcon icon="info" size={28} />
              How to Use
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MaterialIcon icon="mouse" size={20} />
                <p>Hover over the sidebar to expand and see full menu</p>
              </div>
              <div className="flex items-start gap-3">
                <MaterialIcon icon="touch_app" size={20} />
                <p>Click on any menu item to navigate</p>
              </div>
              <div className="flex items-start gap-3">
                <MaterialIcon icon="smartphone" size={20} />
                <p>On mobile, tap the menu button to toggle sidebar</p>
              </div>
              <div className="flex items-start gap-3">
                <MaterialIcon icon="keyboard" size={20} />
                <p>Use Tab key for keyboard navigation</p>
              </div>
            </div>
          </motion.div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 bg-gray-900 rounded-2xl p-6 overflow-x-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">Implementation</h3>
              <span className="text-xs text-gray-400">app/layout.tsx</span>
            </div>
            <pre className="text-sm text-gray-300">
              <code>{`import SideNavLayout from '@/components/SideNavLayout'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SideNavLayout>
          {children}
        </SideNavLayout>
      </body>
    </html>
  )
}`}</code>
            </pre>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
