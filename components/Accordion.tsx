'use client'
import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'

interface AccordionItem {
  title: string
  content: ReactNode
  icon?: ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: number[]
}

// UX: Reusable accordion component
export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [0]
}: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpen)

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      )
    } else {
      setOpenIndexes((prev) =>
        prev.includes(index) ? [] : [index]
      )
    }
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index)

        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3 flex-1">
                {item.icon && (
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                )}
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                  {item.title}
                </h3>
              </div>
              
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 ml-4"
              >
                <FaChevronDown className="text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
