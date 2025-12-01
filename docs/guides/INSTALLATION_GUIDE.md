# 📦 Installation & Setup Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git
- PostgreSQL database (optional, for production)
- Redis (optional, for caching)

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- Next.js 15
- React 18
- Testing libraries (Jest, Playwright)
- TypeScript
- And all other dependencies

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Redis (Optional)
REDIS_URL=redis://localhost:6379

# Sentry (Optional)
SENTRY_DSN=your-sentry-dsn

# Push Notifications (Optional)
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your-vapid-public-key
VAPID_PRIVATE_KEY=your-vapid-private-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Limitless Infotech Solution
```

### 3. Database Setup

```bash
# Run database setup script
npm run db:setup

# Create admin user
npm run db:create-admin
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing Setup

### Install Playwright Browsers

```bash
npx playwright install
```

### Run Tests

```bash
# Unit tests (watch mode)
npm test

# Unit tests (CI mode with coverage)
npm run test:ci

# E2E tests
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui
```

---

## 🔧 Optional Services

### Redis Setup (for caching)

**Using Docker:**
```bash
docker run -d -p 6379:6379 redis:alpine
```

**Using Homebrew (Mac):**
```bash
brew install redis
brew services start redis
```

**Using apt (Ubuntu):**
```bash
sudo apt install redis-server
sudo systemctl start redis
```

### PostgreSQL Setup

**Using Docker:**
```bash
docker run -d \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=limitless \
  postgres:15-alpine
```

**Using Homebrew (Mac):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

---

## 🚢 Production Deployment

### Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set Environment Variables:**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add all variables from `.env.local`

### Docker Deployment

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run:**
   ```bash
   docker build -t limitless-infotech .
   docker run -p 3000:3000 limitless-infotech
   ```

---

## 🔐 Security Configuration

### Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Generate VAPID Keys (for Push Notifications)

```bash
npx web-push generate-vapid-keys
```

---

## 📊 Monitoring Setup

### Sentry Integration

1. **Create Sentry Account:** https://sentry.io
2. **Create New Project**
3. **Copy DSN**
4. **Add to `.env.local`:**
   ```env
   SENTRY_DSN=your-sentry-dsn
   ```

### Analytics Setup

The platform includes built-in analytics. No additional setup required!

---

## 🌍 Internationalization

### Add New Language

1. **Create translation file:**
   ```bash
   mkdir -p locales
   touch locales/es.json
   ```

2. **Add translations:**
   ```json
   {
     "common": {
       "welcome": "Bienvenido",
       "login": "Iniciar sesión"
     }
   }
   ```

3. **Use in code:**
   ```typescript
   import { i18n } from '@/lib/i18n'
   await i18n.setLocale('es')
   const text = i18n.t('common.welcome')
   ```

---

## 🔄 CI/CD Setup

### GitHub Actions

The CI/CD pipeline is already configured in `.github/workflows/ci-cd.yml`

**Required GitHub Secrets:**
- `VERCEL_TOKEN` - Get from Vercel account settings
- `VERCEL_ORG_ID` - Get from Vercel project settings
- `VERCEL_PROJECT_ID` - Get from Vercel project settings
- `SNYK_TOKEN` - (Optional) Get from Snyk.io

**To add secrets:**
1. Go to GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret

---

## 📱 PWA Configuration

### Service Worker

The service worker is already configured in `public/sw.js`

### Manifest

The manifest is already configured in `public/manifest.json`

### Testing PWA

1. Build for production: `npm run build`
2. Start production server: `npm start`
3. Open in Chrome
4. DevTools → Application → Service Workers
5. Check "Offline" and reload

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Database Connection Error

1. Check PostgreSQL is running
2. Verify DATABASE_URL in `.env.local`
3. Check database exists: `psql -l`

### Redis Connection Error

1. Check Redis is running: `redis-cli ping`
2. Verify REDIS_URL in `.env.local`
3. The app will fallback to memory cache if Redis is unavailable

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## 📚 Additional Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **React Documentation:** https://react.dev
- **TypeScript Documentation:** https://www.typescriptlang.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Jest Testing:** https://jestjs.io/docs
- **Playwright Testing:** https://playwright.dev/docs

---

## 🆘 Support

If you encounter any issues:

1. Check this guide
2. Check the documentation in code comments
3. Review error messages carefully
4. Check GitHub Issues
5. Contact support: support@limitlessinfotech.com

---

## ✅ Verification Checklist

After installation, verify everything works:

- [ ] Development server runs (`npm run dev`)
- [ ] Homepage loads at http://localhost:3000
- [ ] Unit tests pass (`npm run test:ci`)
- [ ] E2E tests pass (`npm run test:e2e`)
- [ ] Build succeeds (`npm run build`)
- [ ] Production server runs (`npm start`)
- [ ] Database connection works
- [ ] Email sending works (test contact form)
- [ ] PWA installs correctly
- [ ] All pages load without errors

---

**Installation Complete!** 🎉

Your platform is now ready for development or deployment.

**Next Steps:**
1. Customize branding and content
2. Configure email templates
3. Set up monitoring
4. Deploy to production
5. Start building!

---

**Built with ❤️ by Limitless Infotech Solution Pvt Ltd**
