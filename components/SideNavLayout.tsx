'use client'
import { ReactNode } from 'react'
import SideNav from './SideNav'

interface SideNavLayoutProps {
  children: ReactNode
}

export default function SideNavLayout({ children }: SideNavLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-20 lg:ml-20 transition-all duration-300">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}
