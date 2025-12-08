'use client'
import { motion } from 'framer-motion'
import { InputHTMLAttributes, ReactNode, useState } from 'react'
import MaterialIcon from '../MaterialIcon'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: string
  rightIcon?: string
  onRightIconClick?: () => void
  fullWidth?: boolean
}

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconClick,
  fullWidth = false,
  className = '',
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <motion.label
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <MaterialIcon icon={leftIcon} size={20} />
          </div>
        )}
        
        <input
          {...props}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          style={{
            transform: isFocused ? 'scale(1.01)' : 'scale(1)',
            transition: 'transform 0.2s'
          }}
          className={`
            w-full px-4 py-3 rounded-xl
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            bg-white dark:bg-gray-800
            border-2 transition-all duration-200
            ${error 
              ? 'border-red-500 focus:border-red-600' 
              : isFocused
                ? 'border-[#2A52BE] dark:border-[#F97316]'
                : 'border-gray-200 dark:border-gray-700'
            }
            text-gray-900 dark:text-white
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:outline-none focus:ring-4
            ${error
              ? 'focus:ring-red-500/20'
              : 'focus:ring-[#2A52BE]/20 dark:focus:ring-[#F97316]/20'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
        />
        
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <MaterialIcon icon={rightIcon} size={20} />
          </button>
        )}
      </div>
      
      {(error || helperText) && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-2 text-sm ${
            error 
              ? 'text-red-500 dark:text-red-400' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {error || helperText}
        </motion.p>
      )}
    </div>
  )
}
