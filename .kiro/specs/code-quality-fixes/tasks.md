# Implementation Plan

- [x] 1. Fix JSX unescaped entities in all files
  - Replace all unescaped apostrophes with `&apos;`
  - Replace all unescaped double quotes with `&quot;`
  - Files affected: app/about/page.tsx, app/admin/dashboard/page.tsx, app/contact/page.tsx, app/faq/page.tsx, app/not-found.tsx, app/offline/page.tsx, app/portfolio/page.tsx, app/services/page.tsx, app/team/page.tsx, app/terms/page.tsx, components/BookingSystem.tsx, components/ComparisonSection.tsx, components/ContactForm.tsx, components/CookieConsent.tsx, components/ErrorBoundary.tsx, components/ErrorBoundaryWrapper.tsx, components/MetricsSection.tsx, components/SearchModal.tsx, components/Testimonials.tsx, components/TestimonialsSlider.tsx, components/TwoFactorSetup.tsx
  - _Requirements: 1.1, 1.2_

- [ ] 2. Create TypeScript type definitions file
  - Create lib/types.ts with interfaces for analytics, admin, API responses, cache, monitoring, performance, and webhooks



  - Export all type definitions for use across the codebase
  - _Requirements: 2.1, 2.2_

- [ ] 3. Fix TypeScript explicit any types in lib files
- [ ] 3.1 Fix lib/advancedAnalytics.ts (7 instances)


  - Replace any types with specific interfaces from lib/types.ts
  - _Requirements: 2.1, 2.2_

- [ ] 3.2 Fix lib/analytics.ts (5 instances)
  - Replace any types with specific interfaces
  - _Requirements: 2.1, 2.2_

- [ ] 3.3 Fix lib/auth.ts (2 instances)
  - Replace any types with specific interfaces
  - _Requirements: 2.1, 2.2_

- [ ] 3.4 Fix lib/cache.ts (4 instances)
  - Replace any types with specific interfaces
  - _Requirements: 2.1, 2.2_

- [ ] 3.5 Fix lib/monitoring.ts (15 instances)
  - Replace any types with specific interfaces
  - _Requirements: 2.1, 2.2_

- [ ] 3.6 Fix lib/performance.ts (8 instances)
  - Replace any types with specific interfaces
  - _Requirements: 2.1, 2.2_

- [ ] 3.7 Fix lib/pushNotifications.ts (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 3.8 Fix lib/rateLimit.ts (3 instances)
  - Replace any types with specific interfaces
  - _Requirements: 2.1, 2.2_

- [ ] 3.9 Fix lib/seo.ts (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 3.10 Fix lib/seoTools.ts (4 instances)
  - Replace any types with specific interfaces
  - _Requirements: 2.1, 2.2_

- [ ] 3.11 Fix lib/utils.ts (4 instances)
  - Replace any types with specific interfaces
  - _Requirements: 2.1, 2.2_

- [ ] 3.12 Fix lib/webhooks.ts (5 instances)
  - Replace any types with specific interfaces
  - _Requirements: 2.1, 2.2_

- [ ] 3.13 Fix lib/database/connection.ts (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 3.14 Fix lib/database/models/admin.ts (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 3.15 Fix lib/database/models/inquiry.ts (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 3.16 Fix lib/i18n.ts (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 4. Fix TypeScript explicit any types in app files
- [ ] 4.1 Fix app/admin/activity/page.tsx (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 4.2 Fix app/admin/analytics/page.tsx (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 4.3 Fix app/api/admin/activity/route.ts (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 4.4 Fix app/api/admin/analytics/route.ts (7 instances)
  - Replace any types with specific interfaces
  - _Requirements: 2.1, 2.2_

- [ ] 4.5 Fix app/api/admin/blog/route.ts (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 4.6 Fix app/api/admin/inquiries/[id]/route.ts (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 4.7 Fix app/api/admin/newsletter/route.ts (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 5. Fix TypeScript explicit any types in components
- [ ] 5.1 Fix components/AnalyticsDashboard.tsx (2 instances)
  - Replace any types with specific interfaces
  - _Requirements: 2.1, 2.2_

- [ ] 5.2 Fix components/ErrorBoundary.tsx (1 instance)
  - Replace any type with Error type
  - _Requirements: 2.1, 2.2_

- [ ] 5.3 Fix components/PerformanceMonitor.tsx (4 instances)
  - Replace any types with specific interfaces
  - _Requirements: 2.1, 2.2_

- [ ] 5.4 Fix components/PWAInstallPrompt.tsx (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 5.5 Fix components/QuoteBuilder.tsx (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 5.6 Fix components/TwoFactorSetup.tsx (1 instance)
  - Replace any type with specific interface
  - _Requirements: 2.1, 2.2_

- [ ] 6. Remove unused variables and imports
- [ ] 6.1 Fix app/admin/layout.tsx
  - Remove unused: FaCog, sidebarWidth, mainMargin
  - _Requirements: 3.1, 3.2_

- [ ] 6.2 Fix app/admin/newsletter/page.tsx
  - Remove unused: selectedSubscribers, setSelectedSubscribers
  - _Requirements: 3.1, 3.2_

- [ ] 6.3 Fix app/admin/smtp/page.tsx
  - Remove unused: FaCheckCircle
  - Remove unused error variables (2 instances)
  - _Requirements: 3.1, 3.2_

- [ ] 6.4 Fix app/admin/page.tsx
  - Remove unused error variable
  - _Requirements: 3.1, 3.2_

- [ ] 6.5 Fix app/blog pages
  - Fix app/blog/page.tsx: Remove unused FaUser
  - Fix app/blog/[slug]/page.tsx: Remove unused FaUser
  - _Requirements: 3.1, 3.2_

- [ ] 6.6 Fix app/contact/page.tsx
  - Remove unused imports: FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaGithub, FaPaperPlane, FaCheckCircle, FaComments
  - Remove unused variables: formData, setFormData, status, setStatus
  - _Requirements: 3.1, 3.2_

- [ ] 6.7 Fix app/services/page.tsx
  - Remove unused: FaUsers, FaServer, FaNetworkWired, FaLock, FaBrain, FaPalette, FaSearch
  - _Requirements: 3.1, 3.2_

- [ ] 6.8 Fix app/team/page.tsx
  - Remove unused: Image
  - _Requirements: 3.1, 3.2_

- [ ] 6.9 Fix app/not-found.tsx
  - Remove unused: FaArrowLeft
  - _Requirements: 3.1, 3.2_

- [ ] 6.10 Fix API route unused variables
  - Fix app/api/admin/inquiries/[id]/route.ts: Remove unused inquiries, status, id variables
  - Fix app/api/admin/inquiries/route.ts: Remove unused error variables (2 instances)
  - Fix app/api/admin/login/route.ts: Remove unused error variable
  - Fix app/api/admin/smtp/route.ts: Remove unused error variables (2 instances)
  - Fix app/api/admin/stats/route.ts: Remove unused error variable
  - Fix app/api/admin/webmail/send/route.ts: Remove unused dbError variable
  - Fix app/api/analytics/dashboard/route.ts: Remove unused range variable
  - Fix app/api/analytics/route.ts: Remove unused sessionId variable
  - Fix app/api/auth/2fa/setup/route.ts: Remove unused code variable
  - Fix app/api/auth/[provider]/callback/route.ts: Remove unused user variable
  - Fix app/api/bookings/route.ts: Remove unused RATE_LIMITS
  - Fix app/api/push/send/route.ts: Remove unused subscription variable
  - Fix app/api/webhooks/route.ts: Remove unused verifyWebhookSignature, request, error
  - _Requirements: 3.1, 3.2_

- [ ] 6.11 Fix component unused variables
  - Fix components/AdminLayout.tsx: Remove unused FaBell
  - Fix components/ContactForm.tsx: Remove unused err variable
  - Fix components/Newsletter.tsx: Remove unused err variable
  - Fix components/NotificationCenter.tsx: Remove unused useEffect
  - Fix components/NotificationSettings.tsx: Remove unused FaBell
  - Fix components/PremiumNavbar.tsx: Remove unused useEffect, FaBell, FaUser
  - Fix components/ProgressBar.tsx: Remove unused useEffect, useState
  - Fix components/QuoteBuilder.tsx: Remove unused FaPlus
  - Fix components/TwoFactorSetup.tsx: Remove unused qrCode
  - _Requirements: 3.1, 3.2_

- [ ] 6.12 Fix lib unused variables
  - Fix lib/auth.ts: Remove unused error variables (2 instances)
  - Fix lib/cache.ts: Remove unused error variable
  - Fix lib/i18n.ts: Remove unused error variable
  - Fix lib/monitoring.ts: Remove unused error variable
  - Fix lib/rateLimit.ts: Remove unused error variable
  - _Requirements: 3.1, 3.2_

- [ ] 7. Fix prefer-const declarations
  - Fix app/api/admin/inquiries/route.ts (change let to const for inquiries)
  - _Requirements: 7.1_

- [ ] 8. Fix React Hook dependency arrays
- [ ] 8.1 Fix app/admin/analytics/page.tsx
  - Add fetchAnalytics to useEffect dependency array
  - _Requirements: 4.1, 4.2_

- [ ] 8.2 Fix app/admin/inquiries/page.tsx
  - Add filterInquiries to useEffect dependency array
  - _Requirements: 4.1, 4.2_

- [ ] 8.3 Fix app/admin/webmail/page.tsx
  - Add fetchEmails to useEffect dependency array
  - _Requirements: 4.1, 4.2_

- [ ] 8.4 Fix components/AdminLayout.tsx
  - Add router to useEffect dependency array
  - _Requirements: 4.1, 4.2_

- [ ] 8.5 Fix components/AnalyticsDashboard.tsx
  - Add fetchAnalytics to useEffect dependency array
  - _Requirements: 4.1, 4.2_

- [ ] 8.6 Fix components/SearchModal.tsx
  - Add searchData to useEffect dependency array
  - _Requirements: 4.1, 4.2_

- [ ] 9. Replace anchor tags with Next.js Link components
- [ ] 9.1 Fix app/offline/page.tsx
  - Replace <a> with Link for internal navigation to "/"
  - _Requirements: 5.1, 5.3_

- [ ] 9.2 Fix components/ErrorBoundaryWrapper.tsx
  - Replace <a> with Link for home navigation to "/"
  - _Requirements: 5.1, 5.3_

- [ ] 10. Replace img tags with Next.js Image components
  - Fix components/Footer.tsx (replace <img> with Image component)
  - Add proper width and height attributes
  - Configure image domains in next.config.js if needed
  - _Requirements: 6.1, 6.3_

- [ ] 11. Fix Google Font configuration
  - Fix app/layout.tsx (add display=optional parameter to Google Font import)
  - _Requirements: 8.1_

- [ ] 12. Run production build and verify zero errors
  - Run `npm run build`
  - Verify zero ESLint errors
  - Verify zero TypeScript errors
  - Verify all pages generate successfully
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 13. Final validation and manual testing
  - Test home page functionality
  - Test admin dashboard
  - Test blog pages
  - Test contact form
  - Test navigation across all pages
  - Verify images load correctly
  - Check browser console for errors
  - _Requirements: 9.4_
