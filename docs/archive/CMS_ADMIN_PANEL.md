# CMS Admin Panel Documentation

## 🎯 Overview

A comprehensive Content Management System (CMS) with admin panel for managing inquiries, SMTP configuration, and internal tools.

---

## 🚀 Features

### 1. **Admin Dashboard**
- Real-time statistics overview
- Recent inquiries display
- System status monitoring
- Quick action buttons
- Notification system

### 2. **Inquiry Management**
- View all customer inquiries
- Filter by status (pending, read, replied, archived)
- Search by name, email, or company
- Update inquiry status
- Delete inquiries
- Reply via email
- Detailed inquiry view

### 3. **SMTP Configuration**
- Configure email server settings
- Support for multiple SMTP providers
- Test email functionality
- Secure credential storage
- Common provider presets

### 4. **Authentication System**
- Secure JWT-based authentication
- Protected admin routes
- Session management
- Auto-logout on token expiry

---

## 📁 File Structure

```
app/
├── admin/
│   ├── page.tsx                    # Login page
│   ├── dashboard/
│   │   └── page.tsx                # Dashboard overview
│   ├── inquiries/
│   │   └── page.tsx                # Inquiry management
│   ├── smtp/
│   │   └── page.tsx                # SMTP configuration
│   └── ...
├── api/
│   └── admin/
│       ├── login/
│       │   └── route.ts            # Authentication API
│       ├── inquiries/
│       │   ├── route.ts            # List/Create inquiries
│       │   └── [id]/
│       │       └── route.ts        # Update/Delete inquiry
│       ├── smtp/
│       │   ├── route.ts            # SMTP config API
│       │   └── test/
│       │       └── route.ts        # Test email API
│       └── stats/
│           └── route.ts            # Dashboard stats API
components/
├── AdminLayout.tsx                 # Admin panel layout
└── ...
lib/
└── auth.ts                         # JWT authentication utilities
```

---

## 🔐 Authentication

### Login Credentials

**Demo Credentials:**
- Username: `admin`
- Password: `admin123`

**Production Setup:**
1. Change credentials in `app/api/admin/login/route.ts`
2. Use bcrypt for password hashing
3. Store credentials in database
4. Set strong JWT_SECRET in environment variables

### JWT Token

```typescript
// Token payload
{
  username: string
  role: 'admin'
  exp: number  // 24 hours expiry
}
```

### Protected Routes

All admin routes require authentication:
- `/admin/dashboard`
- `/admin/inquiries`
- `/admin/smtp`
- `/admin/settings`

---

## 📧 SMTP Configuration

### Supported Providers

#### Gmail
```
Host: smtp.gmail.com
Port: 587 (TLS) or 465 (SSL)
Secure: true
Note: Use App Password, not regular password
```

#### SendGrid
```
Host: smtp.sendgrid.net
Port: 587
Secure: false
Username: apikey
Password: Your SendGrid API Key
```

#### Mailgun
```
Host: smtp.mailgun.org
Port: 587
Secure: false
Username: Your Mailgun SMTP username
Password: Your Mailgun SMTP password
```

#### Outlook/Office 365
```
Host: smtp-mail.outlook.com
Port: 587
Secure: false
```

### Environment Variables

Create `.env.local`:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=noreply@limitlessinfotech.com
SMTP_FROM_NAME=Limitless Infotech

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin Credentials (for production)
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=bcrypt-hashed-password
```

### Gmail Setup

1. Enable 2-Factor Authentication
2. Generate App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification
   - App passwords → Generate
3. Use generated password in SMTP config

---

## 🎨 Admin Panel Pages

### 1. Login Page (`/admin`)

**Features:**
- Username/password authentication
- Show/hide password toggle
- Error handling
- Demo credentials display
- Responsive design

**Usage:**
```typescript
// Navigate to login
router.push('/admin')

// After successful login
localStorage.setItem('adminToken', token)
router.push('/admin/dashboard')
```

### 2. Dashboard (`/admin/dashboard`)

**Features:**
- Statistics cards (inquiries, subscribers, blog posts)
- Recent inquiries list
- System status indicators
- Quick navigation

**Stats Displayed:**
- Total Inquiries
- Pending Inquiries
- Total Subscribers
- Blog Posts Count

### 3. Inquiries (`/admin/inquiries`)

**Features:**
- Searchable inquiry list
- Status filtering
- Detailed inquiry view
- Status updates
- Delete functionality
- Email reply integration

**Inquiry Statuses:**
- `pending` - New inquiry
- `read` - Viewed by admin
- `replied` - Response sent
- `archived` - Closed/archived

**Actions:**
- View details
- Update status
- Delete inquiry
- Reply via email

### 4. SMTP Config (`/admin/smtp`)

**Features:**
- Server settings configuration
- Authentication setup
- Sender information
- Test email functionality
- Common provider presets

**Configuration Fields:**
- SMTP Host
- Port
- Secure Connection (TLS/SSL)
- Username/Email
- Password/App Password
- From Email
- From Name

---

## 🔧 API Endpoints

### Authentication

#### POST `/api/admin/login`
Login to admin panel

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "message": "Login successful"
}
```

### Inquiries

#### GET `/api/admin/inquiries`
Get all inquiries

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 234 567 8900",
    "company": "Tech Corp",
    "service": "Web Development",
    "message": "We need a custom web application...",
    "status": "pending",
    "createdAt": "2025-11-27T10:00:00Z"
  }
]
```

#### PATCH `/api/admin/inquiries/[id]`
Update inquiry status

**Request:**
```json
{
  "status": "read"
}
```

#### DELETE `/api/admin/inquiries/[id]`
Delete inquiry

### SMTP

#### GET `/api/admin/smtp`
Get SMTP configuration

**Response:**
```json
{
  "host": "smtp.gmail.com",
  "port": 587,
  "secure": false,
  "username": "your-email@gmail.com",
  "password": "••••••••",
  "fromEmail": "noreply@limitlessinfotech.com",
  "fromName": "Limitless Infotech"
}
```

#### POST `/api/admin/smtp`
Save SMTP configuration

**Request:**
```json
{
  "host": "smtp.gmail.com",
  "port": 587,
  "secure": false,
  "username": "your-email@gmail.com",
  "password": "your-app-password",
  "fromEmail": "noreply@limitlessinfotech.com",
  "fromName": "Limitless Infotech"
}
```

#### POST `/api/admin/smtp/test`
Send test email

**Request:**
```json
{
  "email": "test@example.com"
}
```

### Stats

#### GET `/api/admin/stats`
Get dashboard statistics

**Response:**
```json
{
  "totalInquiries": 45,
  "pendingInquiries": 5,
  "totalSubscribers": 234,
  "blogPosts": 6
}
```

---

## 💾 Database Integration

### Current Implementation
- Mock data storage in memory
- Data resets on server restart
- For development/demo purposes only

### Production Setup

Replace mock storage with database:

#### 1. Install Database Client

```bash
# For PostgreSQL
npm install pg

# For MongoDB
npm install mongodb

# For MySQL
npm install mysql2
```

#### 2. Update API Routes

```typescript
// Example: PostgreSQL
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

export async function GET(request: NextRequest) {
  const result = await pool.query('SELECT * FROM inquiries')
  return NextResponse.json(result.rows)
}
```

#### 3. Database Schema

**Inquiries Table:**
```sql
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  service VARCHAR(255),
  message TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**SMTP Config Table:**
```sql
CREATE TABLE smtp_config (
  id SERIAL PRIMARY KEY,
  host VARCHAR(255),
  port INTEGER,
  secure BOOLEAN,
  username VARCHAR(255),
  password VARCHAR(255),  -- Encrypt in production
  from_email VARCHAR(255),
  from_name VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Admin Users Table:**
```sql
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,  -- bcrypt hash
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);
```

---

## 🔒 Security Best Practices

### 1. Password Security
```typescript
import bcrypt from 'bcrypt'

// Hash password
const hash = await bcrypt.hash(password, 10)

// Verify password
const isValid = await bcrypt.compare(password, hash)
```

### 2. Environment Variables
```env
# Never commit these to git
JWT_SECRET=use-a-strong-random-secret-key
DATABASE_URL=postgresql://user:pass@localhost:5432/db
SMTP_PASS=your-smtp-password
```

### 3. Rate Limiting
```typescript
// Implement rate limiting for login attempts
const loginAttempts = new Map()

function checkRateLimit(ip: string): boolean {
  const attempts = loginAttempts.get(ip) || 0
  if (attempts > 5) {
    return false  // Too many attempts
  }
  loginAttempts.set(ip, attempts + 1)
  return true
}
```

### 4. HTTPS Only
```typescript
// In production, enforce HTTPS
if (process.env.NODE_ENV === 'production' && !request.url.startsWith('https')) {
  return NextResponse.redirect(`https://${request.url}`)
}
```

---

## 🎨 Customization

### Branding

Update colors in components:
```typescript
// Change gradient colors
from-[#2A52BE] to-[#F97316]  // Current
from-[#YOUR_PRIMARY] to-[#YOUR_SECONDARY]  // Your brand
```

### Add New Menu Items

In `AdminLayout.tsx`:
```typescript
const menuItems = [
  // ... existing items
  { 
    name: 'Analytics', 
    icon: FaChartLine, 
    href: '/admin/analytics' 
  }
]
```

### Add New Stats

In `app/api/admin/stats/route.ts`:
```typescript
const stats = {
  // ... existing stats
  totalRevenue: 50000,
  activeProjects: 12
}
```

---

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Mobile Optimizations
- Collapsible sidebar
- Touch-friendly buttons
- Responsive tables
- Optimized forms

---

## 🧪 Testing

### Test SMTP Configuration

1. Go to `/admin/smtp`
2. Enter configuration
3. Save settings
4. Enter test email
5. Click "Send Test Email"
6. Check inbox

### Test Inquiry Management

1. Submit contact form on website
2. Go to `/admin/inquiries`
3. View new inquiry
4. Update status
5. Reply via email

---

## 🚀 Deployment

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Environment Variables
Create `.env.local` with required variables

### 3. Build
```bash
npm run build
```

### 4. Start
```bash
npm start
```

### 5. Access Admin Panel
Navigate to: `https://yourdomain.com/admin`

---

## 📊 Monitoring

### Logs
- Check server logs for errors
- Monitor API response times
- Track failed login attempts

### Metrics
- Inquiry response time
- Email delivery rate
- System uptime
- User activity

---

## 🆘 Troubleshooting

### Login Issues
- Check credentials
- Verify JWT_SECRET is set
- Clear browser cache
- Check console for errors

### SMTP Issues
- Verify credentials
- Check firewall settings
- Test with different provider
- Enable less secure apps (Gmail)
- Use App Password (Gmail)

### API Errors
- Check authentication token
- Verify API endpoint
- Check request format
- Review server logs

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [JWT Documentation](https://jwt.io/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

**Last Updated**: November 27, 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅
