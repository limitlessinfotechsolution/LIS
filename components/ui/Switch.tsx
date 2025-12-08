'use client'
import { motion } from 'framer-motion'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'gradient'
}

export default function Switch({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  variant = 'default'
}: SwitchProps) {
  const sizes = {
    sm: { width: 36, height: 20, circle: 16 },
    md: { width: 44, height: 24, circle: 20 },
    lg: { width: 52, height: 28, circle: 24 }
  }

  const { width, height, circle } = sizes[size]

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        
        <motion.div
          animate={{
            backgroundColor: checked 
              ? variant === 'gradient' ? '#2A52BE' : '#2A52BE'
              : '#d1d5db'
          }}
          style={{ width, height }}
          className={`
            rounded-full transition-colors duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${variant === 'gradient' && checked ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316]' : ''}
          `}
        >
          <motion.div
            animate={{
              x: checked ? width - circle - 2 : 2
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{ width: circle, height: circle }}
            className="absolute top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md"
          />
        </motion.div>
      </div>
      
      {label && (
        <span className={`
          text-sm font-medium text-gray-700 dark:text-gray-300
          ${disabled ? 'opacity-50' : ''}
        `}>
          {label}
        </span>
      )}
    </label>
  )
}
