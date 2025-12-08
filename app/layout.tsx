import './globals.css'
import type { Metadata } from 'next'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import SkipToContent from '../components/SkipToContent'
import BackToTop from '../components/BackToTop'
import CookieConsent from '../components/CookieConsent'
import ProgressBar from '../components/ProgressBar'
import PremiumNavbar from '../components/PremiumNavbar'
import PerformanceMonitor from '../components/PerformanceMonitor'
import AuralisChat from '../components/AuralisChat'
import PWAInstallPrompt from '../components/PWAInstallPrompt'
import ServiceWorkerRegister from '../components/ServiceWorkerRegister'
import ErrorBoundaryWrapper from '../components/ErrorBoundaryWrapper'
import Script from 'next/script'
import React from 'react'

export const metadata: Metadata = {
  metadataBase: new URL('https://limitlessinfotech.com'),
  title: {
    default: 'Limitless Infotech Solution - Professional IT Solutions & Software Development',
    template: '%s | Limitless Infotech Solution'
  },
  description: 'Professional IT services, custom software development, cloud solutions, and digital transformation. Trusted by 120+ enterprises. ISO 27001 certified. Based in Mumbai, India.',
  keywords: ['IT solutions', 'software development', 'cloud services', 'web development', 'mobile apps', 'digital transformation', 'IT consulting', 'Mumbai', 'India'],
  authors: [{ name: 'Limitless Infotech Solution Pvt Ltd' }],
  creator: 'Limitless Infotech Solution',
  publisher: 'Limitless Infotech Solution Pvt Ltd.',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://limitlessinfotech.com',
    title: 'Limitless Infotech Solution - Where Innovation Meets Execution',
    description: 'Professional IT solutions, software development, and cloud services. Trusted by 120+ global enterprises.',
    siteName: 'Limitless Infotech Solution',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Limitless Infotech Solution - IT Tech Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limitless Infotech Solution - Professional IT Solutions',
    description: 'Custom software development, cloud solutions, and digital transformation services.',
    images: ['/twitter-image.jpg'],
    creator: '@limitlessinfotech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Material Symbols */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2A52BE" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Limitless IT" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-screen font-sans bg-white dark:bg-gray-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        
        {/* Accessibility: Skip to content link */}
        <SkipToContent />
        
        {/* UX: Reading progress bar */}
        <ProgressBar />
        
        {/* Error Boundary */}
        <ErrorBoundaryWrapper>
          {/* Premium Navigation */}
          <PremiumNavbar />
          {children}
        </ErrorBoundaryWrapper>
        
        {/* Footer (shown on all devices) */}
        <Footer />
        
        {/* UX Enhancements */}
        <ScrollToTop />
        <BackToTop />
        <AuralisChat />
        
        {/* Performance Monitoring */}
        <PerformanceMonitor />
        
        {/* PWA Features */}
        <PWAInstallPrompt />
        <ServiceWorkerRegister />
        
        {/* Compliance: Cookie consent */}
        <CookieConsent />
      </body>
    </html>
  )
}
