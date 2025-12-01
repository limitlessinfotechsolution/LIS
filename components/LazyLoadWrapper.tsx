'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'

interface LazyLoadWrapperProps {
  children: ReactNode
  threshold?: number
  rootMargin?: string
  placeholder?: ReactNode
}

export default function LazyLoadWrapper({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  placeholder
}: LazyLoadWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return (
    <div ref={ref}>
      {isVisible ? children : (placeholder || <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />)}
    </div>
  )
}
