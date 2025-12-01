'use client'
import { ReactNode, useEffect, useState } from 'react'
import SideNav from './SideNav'
import Header from './Header'

interface HybridNavLayoutProps {
  children: ReactNode
}

export default function HybridNavLayout({ children }: HybridNavLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      {isMobile ? (
        // Mobile: Use top navigation (Header)
        <>
          <Header />
          <main className="w-full overflow-x-hidden">
            {children}
          </main>
        </>
      ) : (
        // Desktop: Use side navigation
        <div className="flex min-h-screen">
          <SideNav />
          <main className="flex-1 ml-20 transition-all duration-300">
            {children}
          </main>
        </div>
      )}
    </>
  )
}
