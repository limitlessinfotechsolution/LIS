'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  href?: string
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  href,
  className = ''
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-300 relative overflow-hidden group'
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  }

  const variantStyles = {
    primary: 'bg-[#2A52BE] text-white hover:bg-[#1e3a8a] shadow-lg hover:shadow-xl',
    secondary: 'bg-[#F97316] text-white hover:bg-[#ea580c] shadow-lg hover:shadow-xl',
    outline: 'bg-transparent border-2 border-[#2A52BE] text-[#2A52BE] dark:border-[#F97316] dark:text-[#F97316] hover:bg-[#2A52BE] hover:text-white dark:hover:bg-[#F97316] dark:hover:text-white',
    ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
    gradient: 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white shadow-lg hover:shadow-2xl'
  }

  const disabledStyles = 'opacity-50 cursor-not-allowed'
  const widthStyles = fullWidth ? 'w-full' : ''

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${disabled || loading ? disabledStyles : ''} ${widthStyles} ${className}`

  const content = (
    <>
      {/* Shine effect */}
      {!disabled && !loading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* Loading spinner */}
      {loading && (
        <motion.div
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Icon left */}
      {icon && iconPosition === 'left' && !loading && (
        <motion.span
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.span>
      )}

      {/* Text */}
      <span className="relative z-10">{children}</span>

      {/* Icon right */}
      {icon && iconPosition === 'right' && !loading && (
        <motion.span
          whileHover={{ scale: 1.1, x: 3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.span>
      )}

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 1 }}
        whileTap={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.4 }}
      />
    </>
  )

  const MotionComponent = motion.button

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        className={combinedStyles}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <MotionComponent
      className={combinedStyles}
      onClick={!disabled && !loading ? onClick : undefined}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
    >
      {content}
    </MotionComponent>
  )
}
