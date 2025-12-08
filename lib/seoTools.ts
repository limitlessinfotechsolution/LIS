/**
 * Advanced SEO Tools
 * Schema markup, meta tags, and SEO optimization utilities
 */

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product' | 'profile'
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

/**
 * Generate JSON-LD schema markup
 */
export function generateSchema(type: string, data: Record<string, unknown>): string {
  const schemas: Record<string, unknown> = {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: data.name || 'Limitless Infotech Solution Pvt Ltd',
      url: data.url || 'https://limitlessinfotech.com',
      logo: data.logo || '/logo.png',
      description: data.description,
      address: data.address && {
        '@type': 'PostalAddress',
        streetAddress: (data.address as { street: string }).street,
        addressLocality: (data.address as { city: string }).city,
        addressRegion: (data.address as { state: string }).state,
        postalCode: (data.address as { zip: string }).zip,
        addressCountry: (data.address as { country: string }).country
      },
      contactPoint: data.contact && {
        '@type': 'ContactPoint',
        telephone: (data.contact as { phone: string }).phone,
        contactType: 'customer service',
        email: (data.contact as { email: string }).email
      },
      sameAs: data.socialLinks || []
    },
    
    website: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: data.name,
      url: data.url,
      description: data.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${data.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },
    
    article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.description,
      image: data.image,
      author: {
        '@type': 'Person',
        name: data.author
      },
      publisher: {
        '@type': 'Organization',
        name: 'Limitless Infotech Solution Pvt Ltd',
        logo: {
          '@type': 'ImageObject',
          url: '/logo.png'
        }
      },
      datePublished: data.publishedTime,
      dateModified: data.modifiedTime
    },
    
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: (data.items as Array<{ name: string; url: string }>).map((item, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    },
    
    faq: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (data.questions as Array<{ question: string; answer: string }>).map((q) => ({
        '@type': 'Question',
        name: q.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: q.answer
        }
      }))
    },
    
    service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: data.name,
      description: data.description,
      provider: {
        '@type': 'Organization',
        name: 'Limitless Infotech Solution Pvt Ltd'
      },
      areaServed: data.areaServed || 'Worldwide',
      serviceType: data.serviceType
    },
    
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: data.name,
      image: data.image,
      '@id': data.url,
      url: data.url,
      telephone: data.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: (data.address as { street: string })?.street,
        addressLocality: (data.address as { city: string })?.city,
        addressRegion: (data.address as { state: string })?.state,
        postalCode: (data.address as { zip: string })?.zip,
        addressCountry: (data.address as { country: string })?.country
      },
      geo: data.geo && {
        '@type': 'GeoCoordinates',
        latitude: (data.geo as { lat: number }).lat,
        longitude: (data.geo as { lng: number }).lng
      },
      openingHoursSpecification: data.hours
    }
  }
  
  return JSON.stringify(schemas[type] || {})
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(config: SEOConfig): Record<string, string> {
  return {
    'og:title': config.title,
    'og:description': config.description,
    'og:type': config.type || 'website',
    'og:url': config.url || '',
    'og:image': config.image || '/og-image.jpg',
    'og:site_name': 'Limitless Infotech Solution',
    ...(config.author && { 'article:author': config.author }),
    ...(config.publishedTime && { 'article:published_time': config.publishedTime }),
    ...(config.modifiedTime && { 'article:modified_time': config.modifiedTime }),
    ...(config.section && { 'article:section': config.section }),
    ...(config.tags && { 'article:tag': config.tags.join(',') })
  }
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterTags(config: SEOConfig): Record<string, string> {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': config.title,
    'twitter:description': config.description,
    'twitter:image': config.image || '/og-image.jpg',
    'twitter:site': '@limitlessinfotech',
    'twitter:creator': config.author || '@limitlessinfotech'
  }
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://limitlessinfotech.com'
  return `${baseUrl}${path}`
}

/**
 * Generate robots meta tag
 */
export function generateRobotsMeta(options: {
  index?: boolean
  follow?: boolean
  noarchive?: boolean
  nosnippet?: boolean
}): string {
  const parts: string[] = []
  
  parts.push(options.index !== false ? 'index' : 'noindex')
  parts.push(options.follow !== false ? 'follow' : 'nofollow')
  
  if (options.noarchive) parts.push('noarchive')
  if (options.nosnippet) parts.push('nosnippet')
  
  return parts.join(', ')
}

/**
 * SEO Audit - Check page SEO health
 */
export function auditSEO(html: string): {
  score: number
  issues: string[]
  warnings: string[]
  passed: string[]
} {
  const issues: string[] = []
  const warnings: string[] = []
  const passed: string[] = []
  
  // Check title
  const titleMatch = html.match(/<title>(.*?)<\/title>/)
  if (!titleMatch) {
    issues.push('Missing <title> tag')
  } else {
    const titleLength = titleMatch[1].length
    if (titleLength < 30) warnings.push('Title too short (< 30 chars)')
    else if (titleLength > 60) warnings.push('Title too long (> 60 chars)')
    else passed.push('Title length optimal')
  }
  
  // Check meta description
  const descMatch = html.match(/<meta name="description" content="(.*?)"/)
  if (!descMatch) {
    issues.push('Missing meta description')
  } else {
    const descLength = descMatch[1].length
    if (descLength < 120) warnings.push('Description too short (< 120 chars)')
    else if (descLength > 160) warnings.push('Description too long (> 160 chars)')
    else passed.push('Description length optimal')
  }
  
  // Check h1
  const h1Count = (html.match(/<h1/g) || []).length
  if (h1Count === 0) issues.push('Missing <h1> tag')
  else if (h1Count > 1) warnings.push('Multiple <h1> tags found')
  else passed.push('Single <h1> tag present')
  
  // Check images alt text
  const imgTags = html.match(/<img[^>]*>/g) || []
  const imgsWithoutAlt = imgTags.filter(img => !img.includes('alt=')).length
  if (imgsWithoutAlt > 0) {
    warnings.push(`${imgsWithoutAlt} images missing alt text`)
  } else if (imgTags.length > 0) {
    passed.push('All images have alt text')
  }
  
  // Check canonical
  if (!html.includes('rel="canonical"')) {
    warnings.push('Missing canonical URL')
  } else {
    passed.push('Canonical URL present')
  }
  
  // Check Open Graph
  if (!html.includes('og:title')) {
    warnings.push('Missing Open Graph tags')
  } else {
    passed.push('Open Graph tags present')
  }
  
  // Calculate score
  const totalChecks = issues.length + warnings.length + passed.length
  const score = Math.round((passed.length / totalChecks) * 100)
  
  return { score, issues, warnings, passed }
}

/**
 * Extract keywords from text
 */
export function extractKeywords(text: string, limit = 10): string[] {
  // Remove common words
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ])
  
  // Extract words
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word))
  
  // Count frequency
  const frequency: Record<string, number> = {}
  for (const word of words) {
    frequency[word] = (frequency[word] || 0) + 1
  }
  
  // Sort by frequency
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word)
}
