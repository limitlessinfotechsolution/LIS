# 🚀 Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy from Local
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to deploy
```

### Option 2: Deploy from GitHub
1. Push code to GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

**Done!** Your site will be live in ~2 minutes.

---

## Environment Variables

If you configure email service, add these to Vercel:

```env
SENDGRID_API_KEY=your_key_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Custom Domain

### On Vercel:
1. Go to Project Settings
2. Click "Domains"
3. Add your domain (e.g., limitlessinfotech.com)
4. Update DNS records as instructed

---

## Other Platforms

### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

### AWS Amplify
1. Connect GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Deploy

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Pre-Deployment Checklist

### Required Updates
- [ ] Replace logo in `/public/LIS-LOGO.png`
- [ ] Update contact email in contact form
- [ ] Configure email service in `/app/api/contact/route.ts`
- [ ] Add Google Analytics (optional)
- [ ] Test all pages and forms

### Optional Enhancements
- [ ] Add real client testimonials
- [ ] Add portfolio/case studies
- [ ] Integrate CRM system
- [ ] Add blog section
- [ ] Set up monitoring (Sentry, LogRocket)

---

## Post-Deployment

### 1. Test Everything
- [ ] All pages load correctly
- [ ] Contact form works
- [ ] Mobile responsive
- [ ] All links work
- [ ] Images load

### 2. SEO Setup
- [ ] Submit sitemap to Google
- [ ] Add Google Search Console
- [ ] Add meta descriptions
- [ ] Add Open Graph tags

### 3. Analytics
- [ ] Set up Google Analytics
- [ ] Configure conversion tracking
- [ ] Monitor performance

### 4. Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error tracking
- [ ] Monitor performance metrics

---

## Performance Tips

### Images
```tsx
// Use Next.js Image component
import Image from 'next/image'

<Image 
  src="/logo.png" 
  alt="Logo" 
  width={200} 
  height={50}
  priority
/>
```

### Fonts
```tsx
// In app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

### Caching
Vercel automatically handles caching. For other platforms:
```js
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
}
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Images Not Loading
- Check file paths are correct
- Ensure images are in `/public` folder
- Use relative paths: `/image.png` not `./image.png`

### Animations Not Working
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check browser compatibility
- Test in production mode

---

## Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

### Backup
- Keep code in Git repository
- Regular database backups (if applicable)
- Document any custom configurations

---

## Support Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## Quick Commands Reference

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

---

**Your website is ready to go live!** 🎉

Choose your deployment platform and follow the steps above. The entire process takes less than 5 minutes with Vercel.
