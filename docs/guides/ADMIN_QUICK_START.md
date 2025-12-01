# Admin Panel Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Environment Variables

Create `.env.local` in the root directory:

```env
# JWT Secret (Change this!)
JWT_SECRET=your-super-secret-key-change-this

# SMTP Configuration (Optional - for email functionality)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=noreply@limitlessinfotech.com
SMTP_FROM_NAME=Limitless Infotech
```

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4: Access Admin Panel

Open browser and navigate to:
```
http://localhost:3000/admin
```

### Step 5: Login

Use demo credentials:
- **Username**: `admin`
- **Password**: `admin123`

---

## 🎯 What You Can Do

### 1. View Dashboard
- See real-time statistics
- Monitor system status
- View recent inquiries

### 2. Manage Inquiries
- View all customer inquiries
- Filter and search
- Update status
- Reply via email
- Delete inquiries

### 3. Configure SMTP
- Set up email server
- Test email sending
- Use common providers (Gmail, SendGrid, etc.)

---

## 📧 SMTP Setup (Gmail Example)

### Enable Gmail SMTP

1. **Enable 2-Factor Authentication**
   - Go to Google Account Settings
   - Security → 2-Step Verification
   - Turn on 2FA

2. **Generate App Password**
   - Security → 2-Step Verification
   - App passwords
   - Select "Mail" and "Other"
   - Generate password

3. **Configure in Admin Panel**
   - Go to `/admin/smtp`
   - Enter settings:
     - Host: `smtp.gmail.com`
     - Port: `587`
     - Secure: `false` (TLS)
     - Username: `your-email@gmail.com`
     - Password: `generated-app-password`
   - Save configuration
   - Test with your email

---

## 🔐 Security Notes

### For Development
- Demo credentials are fine
- JWT_SECRET can be simple

### For Production
1. **Change Admin Credentials**
   - Edit `app/api/admin/login/route.ts`
   - Use bcrypt for password hashing
   - Store in database

2. **Strong JWT Secret**
   ```bash
   # Generate strong secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Environment Variables**
   - Never commit `.env.local` to git
   - Use secure hosting environment variables

4. **HTTPS Only**
   - Always use HTTPS in production
   - Enable HSTS headers

---

## 📱 Admin Panel Features

### Dashboard
- **Statistics Cards**: Total inquiries, pending, subscribers, blog posts
- **Recent Activity**: Latest inquiries
- **System Status**: SMTP, Database, API, Backup status
- **Quick Actions**: Navigate to different sections

### Inquiry Management
- **List View**: All inquiries in table format
- **Search**: By name, email, or company
- **Filter**: By status (pending, read, replied, archived)
- **Detail View**: Full inquiry information
- **Actions**: View, update status, delete, reply

### SMTP Configuration
- **Server Settings**: Host, port, secure connection
- **Authentication**: Username and password
- **Sender Info**: From email and name
- **Test Email**: Send test to verify configuration
- **Provider Presets**: Common SMTP providers

---

## 🎨 Customization

### Change Brand Colors

In admin components, replace:
```typescript
from-[#2A52BE] to-[#F97316]
```

With your brand colors:
```typescript
from-[#YOUR_PRIMARY] to-[#YOUR_SECONDARY]
```

### Add New Admin Pages

1. Create page in `app/admin/your-page/page.tsx`
2. Add menu item in `components/AdminLayout.tsx`
3. Create API route if needed in `app/api/admin/your-endpoint/route.ts`

---

## 🔧 Common Tasks

### Add New Inquiry Status

In `app/admin/inquiries/page.tsx`:
```typescript
const statusColors = {
  pending: 'bg-orange-100 text-orange-600',
  read: 'bg-blue-100 text-blue-600',
  replied: 'bg-green-100 text-green-600',
  archived: 'bg-gray-100 text-gray-600',
  // Add new status
  urgent: 'bg-red-100 text-red-600'
}
```

### Change Session Duration

In `lib/auth.ts`:
```typescript
// Change from 24h to your preferred duration
jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })  // 7 days
```

### Add Email Templates

Create in `lib/email-templates.ts`:
```typescript
export const inquiryReplyTemplate = (name: string) => `
  <h2>Hello ${name},</h2>
  <p>Thank you for contacting us...</p>
`
```

---

## 📊 Database Integration

### Current Setup
- Mock data in memory
- Resets on server restart
- For development only

### Production Setup

1. **Choose Database**
   - PostgreSQL (recommended)
   - MongoDB
   - MySQL

2. **Install Client**
   ```bash
   npm install pg  # PostgreSQL
   ```

3. **Update API Routes**
   ```typescript
   import { Pool } from 'pg'
   
   const pool = new Pool({
     connectionString: process.env.DATABASE_URL
   })
   
   export async function GET() {
     const result = await pool.query('SELECT * FROM inquiries')
     return NextResponse.json(result.rows)
   }
   ```

4. **Create Tables**
   - See `docs/CMS_ADMIN_PANEL.md` for schema

---

## 🧪 Testing

### Test Login
1. Go to `/admin`
2. Enter credentials
3. Should redirect to dashboard

### Test Inquiry Management
1. Submit contact form on website
2. Go to `/admin/inquiries`
3. View new inquiry
4. Update status
5. Delete inquiry

### Test SMTP
1. Go to `/admin/smtp`
2. Enter configuration
3. Save settings
4. Enter test email
5. Click "Send Test Email"
6. Check inbox

---

## 🆘 Troubleshooting

### Can't Login
- Check credentials (admin/admin123)
- Clear browser cache
- Check console for errors
- Verify JWT_SECRET is set

### SMTP Not Working
- Verify credentials
- Check port and host
- Enable "Less secure apps" (Gmail)
- Use App Password (Gmail)
- Check firewall settings

### API Errors
- Check authentication token
- Verify API endpoint
- Check request format
- Review server logs

---

## 📚 Next Steps

1. ✅ Login to admin panel
2. ✅ Explore dashboard
3. ✅ Configure SMTP
4. ✅ Test inquiry management
5. ✅ Customize branding
6. ✅ Set up database (production)
7. ✅ Deploy to production

---

## 🎉 You're Ready!

Your admin panel is now set up and ready to use. For detailed documentation, see:
- `docs/CMS_ADMIN_PANEL.md` - Complete documentation
- `docs/ENHANCEMENTS.md` - Feature guide
- `README.md` - Project overview

---

**Need Help?**
- Email: info@limitlessinfotech.com
- Phone: +91 7710909492

---

**Last Updated**: November 27, 2025  
**Version**: 1.0.0
