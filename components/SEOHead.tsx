'use client'
import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
  canonical?: string
  noindex?: boolean
  structuredData?: object
}

// SEO: Dynamic meta tags component
export default function SEOHead({
  title = 'Limitless Infotech - Innovative IT Solutions',
  description = 'Leading IT solutions provider specializing in custom software development, web applications, mobile apps, and cloud solutions.',
  keywords = [],
  ogImage = '/og-image.jpg',
  ogType = 'website',
  canonical,
  noindex = false,
  structuredData
}: SEOHeadProps) {
  const fullTitle = title.includes('Limitless Infotech') 
    ? title 
    : `${title} | Limitless Infotech`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  )
}
