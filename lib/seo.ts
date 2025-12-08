// SEO utilities and metadata generators

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
  twitterCard?: string
  canonical?: string
  noindex?: boolean
}

export const defaultSEO: SEOConfig = {
  title: 'Limitless Infotech - Innovative IT Solutions & Software Development',
  description: 'Leading IT solutions provider specializing in custom software development, web applications, mobile apps, cloud solutions, and AI integration. Transform your business with cutting-edge technology.',
  keywords: [
    'IT solutions',
    'software development',
    'web development',
    'mobile app development',
    'cloud computing',
    'AI integration',
    'custom software',
    'enterprise solutions'
  ],
  ogImage: '/og-image.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image'
}

export function generateMetadata(config: Partial<SEOConfig> = {}) {
  const seo = { ...defaultSEO, ...config }
  
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: seo.ogType,
      images: seo.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
    twitter: {
      card: seo.twitterCard,
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : undefined,
    },
    ...(seo.canonical && { alternates: { canonical: seo.canonical } }),
    ...(seo.noindex && { robots: { index: false, follow: false } })
  }
}

export const pageSEO = {
  home: {
    title: 'Limitless Infotech - Transform Your Business with Innovative IT Solutions',
    description: 'Expert software development, web & mobile apps, cloud solutions, and AI integration. We deliver cutting-edge technology solutions that drive business growth and innovation.',
    keywords: ['IT company', 'software development company', 'tech solutions', 'digital transformation']
  },
  
  about: {
    title: 'About Us - Limitless Infotech | Our Story & Mission',
    description: 'Learn about Limitless Infotech\'s journey, mission, and the expert team behind innovative IT solutions. Discover our values and commitment to excellence.',
    keywords: ['about us', 'company profile', 'our team', 'mission', 'values']
  },
  
  services: {
    title: 'Our Services - Comprehensive IT Solutions | Limitless Infotech',
    description: 'Explore our full range of IT services: custom software development, web & mobile apps, cloud solutions, AI/ML, cybersecurity, and DevOps. End-to-end technology solutions.',
    keywords: ['IT services', 'software services', 'development services', 'tech consulting']
  },
  
  portfolio: {
    title: 'Portfolio - Our Work & Success Stories | Limitless Infotech',
    description: 'Browse our portfolio of successful projects across web development, mobile apps, and enterprise solutions. See how we\'ve helped businesses transform digitally.',
    keywords: ['portfolio', 'case studies', 'projects', 'success stories', 'client work']
  },
  
  team: {
    title: 'Our Team - Meet the Experts | Limitless Infotech',
    description: 'Meet the talented professionals behind Limitless Infotech. Our team of developers, designers, and strategists dedicated to delivering exceptional results.',
    keywords: ['team', 'developers', 'experts', 'professionals', 'staff']
  },
  
  blog: {
    title: 'Blog - Tech Insights & Tutorials | Limitless Infotech',
    description: 'Stay updated with the latest technology trends, development tutorials, best practices, and industry insights from our expert team.',
    keywords: ['tech blog', 'development blog', 'tutorials', 'tech news', 'insights']
  },
  
  contact: {
    title: 'Contact Us - Get in Touch | Limitless Infotech',
    description: 'Ready to start your project? Contact Limitless Infotech today. Get a free consultation and discover how we can help transform your business.',
    keywords: ['contact', 'get in touch', 'consultation', 'quote', 'inquiry']
  },
  
  faq: {
    title: 'FAQ - Frequently Asked Questions | Limitless Infotech',
    description: 'Find answers to common questions about our services, processes, pricing, and more. Get the information you need to make informed decisions.',
    keywords: ['FAQ', 'questions', 'answers', 'help', 'support']
  }
}

export function generateBlogPostMetadata(post: {
  title: string
  excerpt: string
  author: { name: string }
  publishedAt: string
  tags: string[]
  image?: string
}) {
  return generateMetadata({
    title: `${post.title} | Limitless Infotech Blog`,
    description: post.excerpt,
    keywords: post.tags,
    ogImage: post.image,
    ogType: 'article'
  })
}

export function generateStructuredData(type: 'Organization' | 'WebSite' | 'Article', data: Record<string, unknown>) {
  const baseUrl = 'https://limitlessinfotech.com'
  
  const schemas = {
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Limitless Infotech',
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description: defaultSEO.description,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'info@limitlessinfotech.com'
      },
      sameAs: [
        'https://twitter.com/limitlessinfotech',
        'https://linkedin.com/company/limitlessinfotech',
        'https://github.com/limitlessinfotech'
      ]
    },
    
    WebSite: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Limitless Infotech',
      url: baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },
    
    Article: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      description: data.excerpt,
      image: data.image,
      datePublished: data.publishedAt,
      author: {
        '@type': 'Person',
        name: (data.author as { name: string })?.name || 'Limitless Infotech'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Limitless Infotech',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/logo.png`
        }
      }
    }
  }
  
  return schemas[type]
}
