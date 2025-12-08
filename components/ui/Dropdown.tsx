'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState, useRef, useEffect } from 'react'
import MaterialIcon from '../MaterialIcon'

interface DropdownItem {
  id: string
  label: string
  icon?: string
  onClick?: () => void
  disabled?: boolean
  divider?: boolean
}

interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  position?: 'left' | 'right'
  className?: string
}

export default function Dropdown({
  trigger,
  items,
  position = 'left',
  className = ''
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled) {
      item.onClick?.()
      setIsOpen(false)
    }
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`
              absolute top-full mt-2 min-w-[200px]
              bg-white dark:bg-gray-800 rounded-xl shadow-xl
              border border-gray-200 dark:border-gray-700
              py-2 z-50
              ${position === 'right' ? 'right-0' : 'left-0'}
            `}
          >
            {items.map((item, index) => (
              <div key={item.id}>
                {item.divider ? (
                  <div className="my-2 border-t border-gray-200 dark:border-gray-700" />
                ) : (
                  <button
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    className={`
                      w-full px-4 py-2.5 text-left flex items-center gap-3
                      transition-colors
                      ${item.disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer'
                      }
                    `}
                  >
                    {item.icon && (
                      <MaterialIcon 
                        icon={item.icon} 
                        size={20}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.label}
                    </span>
                  </button>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
