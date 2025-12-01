'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface IconBoxProps {
  icon: ReactNode
  variant?: 'gradient' | 'solid' | 'outline' | 'glass'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
  glow?: boolean
  className?: string
}

export default function IconBox({
  icon,
  variant = 'gradient',
  size = 'md',
  animate = true,
  glow = false,
  className = ''
}: IconBoxProps) {
  const sizeStyles = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl',
    xl: 'w-24 h-24 text-4xl'
  }

  const variantStyles = {
    gradient: 'bg-gradient-to-br from-[#2A52BE] to-[#F97316] text-white shadow-lg',
    solid: 'bg-[#2A52BE] text-white shadow-lg',
    outline: 'bg-transparent border-2 border-[#2A52BE] text-[#2A52BE] dark:border-[#F97316] dark:text-[#F97316]',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20 text-[#2A52BE] dark:text-[#F97316] shadow-xl'
  }

  const baseStyles = 'rounded-2xl flex items-center justify-center relative overflow-hidden'
  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`

  return (
    <motion.div
      className="relative inline-block"
      initial={animate ? { scale: 0, rotate: -180 } : {}}
      whileInView={animate ? { scale: 1, rotate: 0 } : {}}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#2A52BE] to-[#F97316] rounded-2xl blur-xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      )}

      {/* Main icon box */}
      <motion.div
        className={combinedStyles}
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6 }}
        />

        {/* Icon */}
        <motion.div
          className="relative z-10"
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>

        {/* Particles */}
        {animate && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${20 + i * 30}%`,
                  left: `${10 + i * 30}%`
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [-10, -20, -30]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
