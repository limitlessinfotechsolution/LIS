'use client'
import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

interface Tab {
  id: string
  label: string
  icon?: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  variant?: 'default' | 'pills' | 'underline'
  className?: string
}

export default function Tabs({
  tabs,
  defaultTab,
  variant = 'default',
  className = ''
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const variants = {
    default: {
      container: 'bg-gray-100 dark:bg-gray-800 p-1 rounded-xl',
      tab: 'px-4 py-2 rounded-lg',
      active: 'bg-white dark:bg-gray-700 shadow-sm'
    },
    pills: {
      container: 'gap-2',
      tab: 'px-4 py-2 rounded-full',
      active: 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white'
    },
    underline: {
      container: 'border-b border-gray-200 dark:border-gray-700',
      tab: 'px-4 py-3 border-b-2 border-transparent',
      active: 'border-[#2A52BE] dark:border-[#F97316] text-[#2A52BE] dark:text-[#F97316]'
    }
  }

  const config = variants[variant]

  return (
    <div className={className}>
      <div className={`flex ${config.container}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative font-medium text-sm transition-colors
              ${config.tab}
              ${activeTab === tab.id 
                ? config.active 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }
            `}
          >
            {activeTab === tab.id && variant === 'default' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span className="material-symbols-rounded text-xl">{tab.icon}</span>}
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-6"
      >
        {tabs.find(tab => tab.id === activeTab)?.content}
      </motion.div>
    </div>
  )
}
