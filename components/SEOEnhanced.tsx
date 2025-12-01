import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
  noindex?: boolean
}

export function generateSEO({
  title,
  description,
  keywords = [],
  ogImage = '/og-image.jpg',
  canonical,
  noindex = false
}: SEOProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://limitlessinfotech.com'
  const fullTitle = `${title} | Limitless Infotech Solution`
  
  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Limitless Infotech Solution Pvt Ltd' }],
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: canonical || siteUrl
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || siteUrl,
      siteName: 'Limitless Infotech Solution',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@limitlessinfotech'
    }
  }
}

// JSON-LD Schema Generator
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Limitless Infotech Solution Pvt Ltd',
    url: 'https://limitlessinfotech.com',
    logo: 'https://limitlessinfotech.com/LIS-LOGO.png',
    description: 'Professional IT solutions, software development, and cloud services',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-7710909492',
      contactType: 'Customer Service',
      email: 'Info@limitlessinfotech.com',
      availableLanguage: ['English', 'Hindi']
    },
    sameAs: [
      'https://www.linkedin.com/company/limitless-infotech',
      'https://twitter.com/limitlessinfotech',
      'https://github.com/limitless-infotech'
    ],
    foundingDate: '2016',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '50-100'
    }
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateServiceSchema(service: {
  name: string
  description: string
  provider: string
  areaServed: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: service.provider
    },
    areaServed: service.areaServed,
    serviceType: 'IT Services'
  }
}
