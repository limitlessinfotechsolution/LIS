# ⚡ Quick Reference Guide

## 🚀 Getting Started (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# 3. Run development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

---

## 📦 NPM Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm test             # Run unit tests (watch mode)
npm run test:ci      # Run tests with coverage
npm run test:e2e     # Run E2E tests
npm run test:e2e:ui  # Run E2E tests with UI
npm run db:setup     # Setup database
npm run db:create-admin  # Create admin user
```

---

## 🔑 Key Features & Usage

### Two-Factor Authentication
```typescript
import TwoFactorSetup from '@/components/TwoFactorSetup'
<TwoFactorSetup />
```

### Analytics
```typescript
import { analytics } from '@/lib/advancedAnalytics'
analytics.track('event_name', { key: 'value' })
```

### Push Notifications
```typescript
import { subscribeToPush, showNotification } from '@/lib/pushNotifications'
await subscribeToPush()
await showNotification({ title: 'Hello', body: 'World' })
```

### Caching
```typescript
import { cache, CacheKeys, CacheTTL } from '@/lib/cache'
await cache.set('key', data, CacheTTL.LONG)
const data = await cache.get('key')
```

### Internationalization
```typescript
import { i18n } from '@/lib/i18n'
await i18n.init('en')
const text = i18n.t('key', { param: 'value' })
```

### Monitoring
```typescript
import monitoring from '@/lib/monitoring'
monitoring.info('message', { context })
monitoring.error('error', { context })
```

---

## 🎨 Components

### Booking System
```typescript
import BookingSystem from '@/components/BookingSystem'
<BookingSystem />
```

### Quote Builder
```typescript
import QuoteBuilder from '@/components/QuoteBuilder'
<QuoteBuilder />
```

### Analytics Dashboard
```typescript
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
<AnalyticsDashboard />
```

### Theme Customizer
```typescript
import ThemeCustomizer from '@/components/ThemeCustomizer'
<ThemeCustomizer />
```

### Knowledge Base
```typescript
import KnowledgeBase from '@/components/KnowledgeBase'
<KnowledgeBase />
```

### API Documentation
```typescript
import APIDocumentation from '@/components/APIDocumentation'
<APIDocumentation />
```

---

## 🔌 API Endpoints

### Bookings
```bash
POST /api/bookings
GET  /api/bookings?date=2025-12-15
```

### Analytics
```bash
POST /api/analytics
GET  /api/analytics/dashboard?range=7d
```

### 2FA
```bash
POST /api/auth/2fa/setup
POST /api/auth/2fa/verify
```

### Push Notifications
```bash
POST /api/push/send
```

### Webhooks
```bash
POST /api/webhooks
GET  /api/webhooks
```

### Health Check
```bash
GET /api/health
```

---

## 🔧 Configuration Files

### Environment Variables (.env.local)
```env
DATABASE_URL=postgresql://...
JWT_SECRET=...
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=...
EMAIL_PASSWORD=...
REDIS_URL=redis://localhost:6379
SENTRY_DSN=...
NEXT_PUBLIC_VAPID_PUBLIC_KEY=...
```

### Jest (jest.config.js)
```javascript
// Already configured
// Run: npm test
```

### Playwright (playwright.config.ts)
```typescript
// Already configured
// Run: npm run test:e2e
```

### CI/CD (.github/workflows/ci-cd.yml)
```yaml
# Already configured
# Runs automatically on push/PR
```

---

## 📁 Important Directories

```
/app          - Next.js pages and API routes
/components   - React components
/lib          - Utility libraries
/public       - Static assets
/e2e          - E2E tests
/__tests__    - Unit tests
/.github      - CI/CD workflows
```

---

## 🐛 Common Issues & Solutions

### Port Already in Use
```bash
npx kill-port 3000
# or
PORT=3001 npm run dev
```

### Database Connection Error
```bash
# Check PostgreSQL is running
psql -l

# Verify DATABASE_URL in .env.local
```

### Redis Connection Error
```bash
# Check Redis is running
redis-cli ping

# App will fallback to memory cache if Redis unavailable
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Test Failures
```bash
# Update snapshots
npm test -- -u

# Run specific test
npm test -- path/to/test.ts
```

---

## 🔐 Security Best Practices

1. ✅ Never commit `.env.local`
2. ✅ Use strong JWT_SECRET (32+ chars)
3. ✅ Enable 2FA for admin accounts
4. ✅ Keep dependencies updated
5. ✅ Use HTTPS in production
6. ✅ Configure CORS properly
7. ✅ Validate all inputs
8. ✅ Sanitize user data
9. ✅ Use rate limiting
10. ✅ Monitor error logs

---

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Logs
```typescript
import monitoring from '@/lib/monitoring'
monitoring.getLogs(100)
monitoring.getMetrics(100)
monitoring.getHealthStatus()
```

### Sentry (Production)
```typescript
// Automatically captures errors
// View in Sentry dashboard
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```bash
docker build -t app .
docker run -p 3000:3000 app
```

### Manual
```bash
npm run build
npm start
```

---

## 📚 Documentation Links

- **Installation**: See INSTALLATION_GUIDE.md
- **All Features**: See ALL_FEATURES_IMPLEMENTED.md
- **Complete Summary**: See COMPLETE_IMPLEMENTATION_SUMMARY.md
- **Project README**: See README.md

---

## 🆘 Support

- **Email**: support@limitlessinfotech.com
- **Documentation**: Check /docs folder
- **Issues**: GitHub Issues
- **Community**: Discord/Slack (if available)

---

## ✅ Pre-Launch Checklist

- [ ] Environment variables configured
- [ ] Database setup complete
- [ ] Tests passing
- [ ] Build successful
- [ ] Security audit done
- [ ] Performance optimized
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Email sending tested
- [ ] Payment gateway tested (if applicable)
- [ ] Error tracking configured
- [ ] Analytics configured
- [ ] Documentation reviewed

---

## 🎯 Quick Commands

```bash
# Development
npm run dev

# Testing
npm test && npm run test:e2e

# Production Build
npm run build && npm start

# Type Check
npm run type-check

# Lint
npm run lint

# Database
npm run db:setup && npm run db:create-admin

# Deploy
vercel --prod
```

---

## 📈 Performance Tips

1. Use caching for expensive operations
2. Implement lazy loading for images
3. Use code splitting for large components
4. Enable Redis for production
5. Use CDN for static assets
6. Optimize images (WebP format)
7. Minimize bundle size
8. Use server-side rendering
9. Implement pagination
10. Monitor Core Web Vitals

---

## 🎉 You're Ready!

Everything is set up and ready to go. Start building amazing features!

**Happy Coding!** 🚀

---

**Built with ❤️ by Limitless Infotech Solution Pvt Ltd**
