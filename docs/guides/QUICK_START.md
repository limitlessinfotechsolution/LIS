# ⚡ Quick Start - Limitless Infotech

## 🚀 Launch in 3 Steps (10 minutes)

### Step 1: Database Setup (5 min)
```bash
# 1. Create Supabase account: https://supabase.com
# 2. Create new project
# 3. Copy DATABASE_URL from Settings → Database
# 4. Add to .env.local:
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
JWT_SECRET=your-strong-secret-key-here

# 5. Run setup:
npm run db:setup
```

### Step 2: Email Setup (3 min)
```bash
# Add to .env.local:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=noreply@limitlessinfotech.com
NEXT_PUBLIC_SITE_URL=https://limitlessinfotech.com
CONTACT_EMAIL=info@limitlessinfotech.com
```

### Step 3: Deploy (2 min)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Add environment variables in Vercel dashboard
```

**Done! Your website is live! 🎉**

---

## 📋 Essential Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:setup         # Set up database (tables + admin user)
npm run db:create-admin  # Create new admin user

# Quality
npm run lint             # Check code quality
npm run type-check       # Check TypeScript
```

---

## 🔐 Admin Access

```
URL: http://localhost:3000/admin
Username: admin
Password: admin123

⚠️ Change password after first login!
```

---

## 📚 Key Documentation

- **[LAUNCH_READY.md](./LAUNCH_READY.md)** - Complete launch guide
- **[PROJECT_COMPLETE.md](./PROJECT_COMPLETE.md)** - Full project overview
- **[README.md](./README.md)** - Main documentation
- **[docs/](./docs/)** - All guides (15+ documents)

---

## 🆘 Quick Troubleshooting

**Build fails?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Database connection error?**
- Check DATABASE_URL format
- Verify database exists
- Run `npm run db:setup`

**Admin login not working?**
- Verify JWT_SECRET is set
- Check admin user exists
- Clear browser cache

**Email not sending?**
- Test SMTP credentials
- Check spam folder
- Use admin SMTP test

---

## 📊 What You Have

✅ 22 pages (18 public + 4 admin)  
✅ 11 API endpoints  
✅ PostgreSQL database  
✅ Admin CMS panel  
✅ 70+ features  
✅ Complete documentation  
✅ Production ready  

---

## 🎯 Next Actions

1. [ ] Set up database
2. [ ] Configure email
3. [ ] Deploy to Vercel
4. [ ] Change admin password
5. [ ] Test everything
6. [ ] Go live!

---

**Need help?**  
📧 info@limitlessinfotech.com  
📞 +91 7710909492

**Ready to launch!** 🚀
