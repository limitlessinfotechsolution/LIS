# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The website will be available at: **http://localhost:3000**

### 3. Build for Production
```bash
npm run build
npm start
```

## 🎨 Customization Checklist

### Essential Updates
- [ ] Replace logo in `/public/LIS-LOGO.png`
- [ ] Update company name and branding colors
- [ ] Add real contact information
- [ ] Configure email service for contact form
- [ ] Update testimonials with real client reviews
- [ ] Add actual project statistics

### Content Updates

#### 1. Contact Information
**File:** `app/contact/page.tsx`
```typescript
// Update these values:
- Office address
- Email addresses
- Phone numbers
- Business hours
```

#### 2. Services
**File:** `components/ServicesGrid.tsx`
```typescript
// Modify the services array with your offerings
```

#### 3. Technologies
**File:** `components/TechStack.tsx`
```typescript
// Update the technologies array with your tech stack
```

#### 4. Testimonials
**File:** `components/Testimonials.tsx`
```typescript
// Replace with real client testimonials
```

### 5. Email Configuration
**File:** `app/api/contact/route.ts`

Replace the console.log with actual email service:

```typescript
// Example with SendGrid
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const msg = {
  to: 'your-email@company.com',
  from: 'noreply@company.com',
  subject: 'New Contact Form Submission',
  text: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
}

await sgMail.send(msg)
```

## 🎯 Key Features

### Animations
All animations are powered by **Framer Motion**. To customize:
- Adjust `initial`, `animate`, and `transition` props
- Modify durations and delays
- Change easing functions

### Colors
**File:** `app/globals.css`
```css
:root {
  --limitless-blue: #0096D6;  /* Change primary color */
  --limitless-gold: #F3B300;  /* Change accent color */
}
```

### Responsive Breakpoints
Using Tailwind CSS defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🐛 Troubleshooting

### Issue: Animations not working
**Solution:** Ensure Framer Motion is installed:
```bash
npm install framer-motion
```

### Issue: Icons not displaying
**Solution:** Install React Icons:
```bash
npm install react-icons
```

### Issue: Build errors
**Solution:** Clear cache and rebuild:
```bash
rm -rf .next
npm run build
```

## 📦 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Other Platforms
- **Netlify:** Connect GitHub repo
- **AWS Amplify:** Use the Amplify Console
- **Docker:** Use the included Dockerfile (if added)

## 🔧 Environment Variables

Create `.env.local` for sensitive data:
```env
SENDGRID_API_KEY=your_key_here
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_key_here
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Icons](https://react-icons.github.io/react-icons/)

## 💡 Tips

1. **Performance:** Use Next.js Image component for optimized images
2. **SEO:** Update metadata in each page's layout
3. **Analytics:** Add Google Analytics or Plausible
4. **Testing:** Test on multiple devices and browsers
5. **Accessibility:** Ensure keyboard navigation works

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review component files for inline comments
- Test in development mode before deploying

---

Happy coding! 🎉
