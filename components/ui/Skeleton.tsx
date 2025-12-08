'use client'
import { motion } from 'framer-motion'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  animation?: 'pulse' | 'wave' | 'none'
  width?: string | number
  height?: string | number
}

export default function Skeleton({
  className = '',
  variant = 'rectangular',
  animation = 'pulse',
  width,
  height
}: SkeletonProps) {
  const variants = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl'
  }

  const animations = {
    pulse: 'animate-pulse',
    wave: 'animate-gradient bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700',
    none: ''
  }

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`
        bg-gray-200 dark:bg-gray-700
        ${variants[variant]}
        ${animations[animation]}
        ${className}
      `}
      style={style}
    />
  )
}

// Preset skeleton components
export function SkeletonCard() {
  return (
    <div className="card-base card-md space-y-4">
      <Skeleton variant="rounded" height={200} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="40%" />
    </div>
  )
}

export function SkeletonAvatar({ size = 48 }: { size?: number }) {
  return (
    <Skeleton 
      variant="circular" 
      width={size} 
      height={size}
    />
  )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i}
          variant="text" 
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  )
}
