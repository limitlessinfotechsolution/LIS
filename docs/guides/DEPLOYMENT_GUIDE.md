# Deployment Guide - Limitless Infotech

## 🚀 Production Deployment

This guide covers deploying your Limitless Infotech website to production.

---

## 📋 Pre-Deployment Checklist

### ✅ **Required Steps**

- [ ] Database set up and configured
- [ ] Environment variables configured
- [ ] SMTP email configured and tested
- [ ] Admin user created
- [ ] All content updated (images, text, contact info)
- [ ] Analytics configured (Google Analytics)
- [ ] Domain name purchased and configured
- [ ] SSL certificate ready
- [ ] Build tested locally

### ✅ **Security Checklist**

- [ ] Strong JWT_SECRET generated
- [ ] Admin password changed from default
- [ ] Database credentials secured
- [ ] SMTP credentials secured
- [ ] API keys secured
- [ ] Environment variables not committed to git

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Pros:**
- Easy deployment
- Automatic HTTPS
- Global CDN
- Serverless functions
- Free tier available

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**
   ```bash
   # In Vercel dashboard or CLI
   vercel env add JWT_SECRET
   vercel env add DATABASE_URL
   vercel env add SMTP_HOST
   # ... add all required variables
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

**Steps:**

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=.next
   ```

### Option 3: Self-Hosted (VPS/Dedicated Server)

**Requirements:**
- Ubuntu/CentOS server
- Node.js 18+
- PostgreSQL
- Nginx
- PM2 (process manager)

**Steps:**

1. **Server Setup**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PostgreSQL
   sudo apt install postgresql postgresql-contrib
   
   # Install Nginx
   sudo apt install nginx
   
   # Install PM2
   sudo npm install -g pm2
   ```

2. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/your-repo/limitless-infotech.git
   cd limitless-infotech
   
   # Install dependencies
   npm install
   
   # Set up environment
   cp .env.production.example .env.production
   # Edit .env.production with your values
   
   # Build application
   npm run build
   
   # Start with PM2
   pm2 start npm --name "limitless-infotech" -- start
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx**
   ```nginx
   # /etc/nginx/sites-available/limitlessinfotech.com
   server {
       listen 80;
       server_name limitlessinfotech.com www.limitlessinfotech.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Enable SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d limitlessinfotech.com -d www.limitlessinfotech.com
   ```

---

## 🗄️ Database Setup

### Option 1: Supabase (Recommended)

1. **Create Account**
   - Go to [supabase.com](https://supabase.com)
   - Create new project

2. **Get Connection String**
   ```
   postgresql://postgres:[password]@[host]:5432/postgres
   ```

3. **Run Database Setup**
   ```bash
   # Set DATABASE_URL in .env.local
   npm run db:setup
   ```

### Option 2: Railway

1. **Create Account**
   - Go to [railway.app](https://railway.app)
   - Create PostgreSQL database

2. **Get Connection Details**
   - Copy DATABASE_URL from Railway dashboard

### Option 3: Self-Hosted PostgreSQL

1. **Install PostgreSQL**
   ```bash
   sudo apt install postgresql postgresql-contrib
   ```

2. **Create Database**
   ```bash
   sudo -u postgres createdb limitless_infotech
   sudo -u postgres createuser --interactive
   ```

3. **Set Connection String**
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/limitless_infotech
   ```

---

## 📧 Email Configuration

### Option 1: Gmail SMTP

1. **Enable 2FA**
   - Go to Google Account settings
   - Enable 2-Factor Authentication

2. **Generate App Password**
   - Security → App passwords
   - Generate password for "Mail"

3. **Configure Environment**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

### Option 2: SendGrid

1. **Create Account**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Create API key

2. **Configure Environment**
   ```env
   SENDGRID_API_KEY=SG.your-api-key
   ```

### Option 3: Mailgun

1. **Create Account**
   - Go to [mailgun.com](https://mailgun.com)
   - Get SMTP credentials

2. **Configure Environment**
   ```env
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_USER=your-username
   SMTP_PASS=your-password
   ```

---

## 🔐 Environment Variables

### Required Variables

```env
# Security
JWT_SECRET=your-strong-secret

# Database
DATABASE_URL=postgresql://...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password

# Site
NEXT_PUBLIC_SITE_URL=https://limitlessinfotech.com
CONTACT_EMAIL=info@limitlessinfotech.com
```

### Optional Variables

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Social
NEXT_PUBLIC_TWITTER_HANDLE=@limitlessinfotech
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/limitlessinfotech

# API Keys
GOOGLE_MAPS_API_KEY=your-key
RECAPTCHA_SITE_KEY=your-key
```

---

## 📊 Analytics Setup

### Google Analytics 4

1. **Create GA4 Property**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create new property

2. **Get Measurement ID**
   - Copy G-XXXXXXXXXX ID

3. **Add to Environment**
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Google Search Console

1. **Add Property**
   - Go to [search.google.com/search-console](https://search.google.com/search-console)
   - Add your domain

2. **Verify Ownership**
   - Upload verification file or add DNS record

3. **Submit Sitemap**
   - Submit `https://limitlessinfotech.com/sitemap.xml`

---

## 🔒 Security Configuration

### SSL/HTTPS

**Vercel/Netlify:**
- Automatic HTTPS
- No configuration needed

**Self-Hosted:**
```bash
# Let's Encrypt
sudo certbot --nginx -d limitlessinfotech.com
```

### Security Headers

Add to `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  }
}
```

---

## 🚀 Deployment Commands

### Build and Test Locally

```bash
# Install dependencies
npm install

# Set up database
npm run db:setup

# Build application
npm run build

# Test production build
npm start

# Check for errors
npm run type-check
```

### Deploy to Vercel

```bash
# Deploy to production
vercel --prod

# Check deployment status
vercel ls
```

### Deploy to Self-Hosted

```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build application
npm run build

# Restart PM2
pm2 restart limitless-infotech
pm2 logs limitless-infotech
```

---

## 🧪 Testing Deployment

### Pre-Launch Tests

1. **Homepage**
   - [ ] Loads correctly
   - [ ] All images display
   - [ ] Navigation works
   - [ ] Mobile responsive

2. **Contact Form**
   - [ ] Form submits successfully
   - [ ] Email notifications received
   - [ ] Data saved to database
   - [ ] Validation works

3. **Admin Panel**
   - [ ] Login works
   - [ ] Dashboard displays stats
   - [ ] Inquiries list loads
   - [ ] Can update inquiry status

4. **Performance**
   - [ ] Page load time < 3s
   - [ ] Lighthouse score > 90
   - [ ] No console errors
   - [ ] SEO meta tags present

### Testing Tools

```bash
# Lighthouse audit
npx lighthouse https://limitlessinfotech.com --view

# Check broken links
npx broken-link-checker https://limitlessinfotech.com

# Security headers
curl -I https://limitlessinfotech.com
```

---

## 📈 Post-Deployment

### Monitoring

1. **Set up monitoring**
   - Uptime monitoring (UptimeRobot, Pingdom)
   - Error tracking (Sentry)
   - Performance monitoring (Vercel Analytics)

2. **Configure alerts**
   - Downtime alerts
   - Error rate alerts
   - Performance degradation alerts

### Backups

1. **Database backups**
   ```bash
   # Automated daily backups
   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
   ```

2. **Code backups**
   - Git repository (GitHub/GitLab)
   - Regular commits and tags

### Maintenance

1. **Regular updates**
   ```bash
   # Update dependencies
   npm update
   npm audit fix
   ```

2. **Security patches**
   - Monitor security advisories
   - Apply patches promptly

---

## 🐛 Troubleshooting

### Common Issues

**Build Fails**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**Database Connection Error**
- Check DATABASE_URL format
- Verify database is running
- Check firewall rules
- Verify SSL settings

**Email Not Sending**
- Test SMTP credentials
- Check spam folder
- Verify SMTP port not blocked
- Check email service logs

**Admin Login Not Working**
- Verify JWT_SECRET is set
- Check admin user exists in database
- Verify password is correct
- Check browser console for errors

### Debug Mode

```bash
# Enable debug logging
NODE_ENV=development npm run dev

# Check database connection
npm run db:test

# View PM2 logs
pm2 logs limitless-infotech
```

---

## 📞 Support

For deployment assistance:
- Email: info@limitlessinfotech.com
- Phone: +91 7710909492

---

## 📚 Additional Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/getting-started/)

---

**Last Updated:** November 2024
