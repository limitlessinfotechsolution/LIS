export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
  }
  category: string
  tags: string[]
  image: string
  publishedAt: string
  readTime: string
  featured: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-web-development-2025',
    title: 'The Future of Web Development in 2025: Trends You Can\'t Ignore',
    excerpt: 'Explore the cutting-edge technologies and methodologies shaping the future of web development, from AI integration to serverless architectures.',
    content: `
# The Future of Web Development in 2025

The web development landscape is evolving at an unprecedented pace. As we move through 2025, several key trends are reshaping how we build and deploy web applications.

## 1. AI-Powered Development

Artificial Intelligence is no longer just a buzzword—it's becoming an integral part of the development process. From code completion to automated testing, AI tools are making developers more productive than ever.

## 2. Serverless Architecture

Serverless computing continues to gain traction, allowing developers to focus on code rather than infrastructure management. This approach reduces costs and improves scalability.

## 3. Progressive Web Apps (PWAs)

PWAs are bridging the gap between web and native applications, offering offline functionality, push notifications, and app-like experiences directly in the browser.

## 4. WebAssembly

WebAssembly is enabling high-performance applications in the browser, opening doors for complex applications that were previously only possible with native code.

## Conclusion

The future of web development is exciting and full of opportunities. Staying updated with these trends will help you build better, faster, and more efficient applications.
    `,
    author: {
      name: 'Sarah Johnson',
      avatar: '/team/sarah-johnson.jpg',
      role: 'CEO & Tech Lead'
    },
    category: 'Technology',
    tags: ['Web Development', 'AI', 'Trends', 'Future Tech'],
    image: '/blog/web-dev-future.jpg',
    publishedAt: '2025-11-20',
    readTime: '8 min read',
    featured: true
  },
  {
    id: '2',
    slug: 'mobile-app-development-best-practices',
    title: 'Mobile App Development: Best Practices for 2025',
    excerpt: 'Learn the essential best practices for building modern mobile applications that users love and that scale effectively.',
    content: `
# Mobile App Development Best Practices

Building successful mobile applications requires more than just coding skills. Here are the best practices that will set your app apart in 2025.

## User-Centric Design

Always put your users first. Conduct thorough user research and testing to ensure your app meets real needs.

## Performance Optimization

Users expect fast, responsive apps. Optimize images, minimize API calls, and implement efficient caching strategies.

## Security First

With increasing cyber threats, security should be a top priority from day one. Implement proper authentication, encryption, and secure data storage.

## Cross-Platform Development

Consider frameworks like React Native or Flutter to build for both iOS and Android simultaneously, reducing development time and costs.
    `,
    author: {
      name: 'Michael Chen',
      avatar: '/team/michael-chen.jpg',
      role: 'CTO'
    },
    category: 'Mobile Development',
    tags: ['Mobile Apps', 'Best Practices', 'iOS', 'Android'],
    image: '/blog/mobile-dev.jpg',
    publishedAt: '2025-11-15',
    readTime: '6 min read',
    featured: true
  },
  {
    id: '3',
    slug: 'ui-ux-design-principles',
    title: '10 UI/UX Design Principles Every Developer Should Know',
    excerpt: 'Master these fundamental design principles to create intuitive, beautiful, and user-friendly interfaces.',
    content: `
# 10 UI/UX Design Principles

Great design is not just about aesthetics—it's about creating experiences that users love. Here are 10 essential principles.

## 1. Consistency

Maintain consistent design patterns throughout your application to reduce cognitive load.

## 2. Feedback

Always provide clear feedback for user actions. Users should never wonder if their action was successful.

## 3. Accessibility

Design for everyone. Follow WCAG guidelines to ensure your app is usable by people with disabilities.

## 4. Simplicity

Keep interfaces simple and focused. Remove unnecessary elements that don't serve a clear purpose.

## 5. Visual Hierarchy

Use size, color, and spacing to guide users' attention to the most important elements.
    `,
    author: {
      name: 'Emily Rodriguez',
      avatar: '/team/emily-rodriguez.jpg',
      role: 'Lead Designer'
    },
    category: 'Design',
    tags: ['UI/UX', 'Design', 'User Experience', 'Best Practices'],
    image: '/blog/ui-ux-principles.jpg',
    publishedAt: '2025-11-10',
    readTime: '10 min read',
    featured: false
  },
  {
    id: '4',
    slug: 'cloud-computing-guide',
    title: 'Complete Guide to Cloud Computing for Startups',
    excerpt: 'Everything you need to know about choosing and implementing cloud solutions for your startup.',
    content: `
# Cloud Computing for Startups

Cloud computing has revolutionized how startups build and scale their infrastructure. This guide covers everything you need to know.

## Why Cloud?

Cloud computing offers scalability, cost-effectiveness, and flexibility that traditional infrastructure can't match.

## Choosing a Provider

AWS, Azure, and Google Cloud each have their strengths. Consider your specific needs, budget, and technical expertise.

## Cost Optimization

Learn strategies to keep your cloud costs under control while maintaining performance and reliability.

## Security Best Practices

Implement proper security measures including IAM, encryption, and regular audits.
    `,
    author: {
      name: 'James Wilson',
      avatar: '/team/james-wilson.jpg',
      role: 'DevOps Engineer'
    },
    category: 'Cloud Computing',
    tags: ['Cloud', 'AWS', 'Azure', 'Infrastructure'],
    image: '/blog/cloud-computing.jpg',
    publishedAt: '2025-11-05',
    readTime: '12 min read',
    featured: false
  },
  {
    id: '5',
    slug: 'agile-project-management',
    title: 'Agile Project Management: A Practical Guide',
    excerpt: 'Learn how to implement Agile methodologies effectively in your development team.',
    content: `
# Agile Project Management

Agile has become the standard for software development. Here's how to implement it effectively.

## Scrum Framework

Learn the basics of Scrum, including sprints, daily standups, and retrospectives.

## Kanban Boards

Visualize your workflow and identify bottlenecks with Kanban boards.

## Team Collaboration

Foster a culture of collaboration and continuous improvement.

## Measuring Success

Track velocity, burndown charts, and other metrics to measure team performance.
    `,
    author: {
      name: 'Lisa Thompson',
      avatar: '/team/lisa-thompson.jpg',
      role: 'Project Manager'
    },
    category: 'Project Management',
    tags: ['Agile', 'Scrum', 'Project Management', 'Team'],
    image: '/blog/agile-management.jpg',
    publishedAt: '2025-11-01',
    readTime: '7 min read',
    featured: false
  },
  {
    id: '6',
    slug: 'cybersecurity-essentials',
    title: 'Cybersecurity Essentials for Modern Web Applications',
    excerpt: 'Protect your web applications from common security threats with these essential practices.',
    content: `
# Cybersecurity Essentials

Security breaches can be devastating. Here's how to protect your web applications.

## Common Threats

Understand SQL injection, XSS, CSRF, and other common attack vectors.

## Authentication & Authorization

Implement secure authentication using OAuth, JWT, and multi-factor authentication.

## Data Encryption

Encrypt sensitive data both in transit and at rest.

## Regular Audits

Conduct regular security audits and penetration testing.
    `,
    author: {
      name: 'David Kumar',
      avatar: '/team/david-kumar.jpg',
      role: 'Senior Developer'
    },
    category: 'Security',
    tags: ['Security', 'Cybersecurity', 'Web Security', 'Best Practices'],
    image: '/blog/cybersecurity.jpg',
    publishedAt: '2025-10-28',
    readTime: '9 min read',
    featured: true
  }
]

export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured)
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getBlogCategories(): string[] {
  return Array.from(new Set(blogPosts.map(post => post.category)))
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category)
}

export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit)
}
