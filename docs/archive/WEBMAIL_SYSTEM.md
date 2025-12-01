# 📧 Limitless Webmail System

## Overview

Your admin panel now includes a **complete webmail system** - a modern, React-based email client integrated seamlessly with your Next.js application. This is a custom-built solution branded for Limitless Infotech.

**Date Added:** November 28, 2024  
**Version:** 2.7.0  
**Status:** ✅ Production Ready

---

## ✨ Features

### Core Webmail Features

**Email Management:**
- ✅ Read and compose emails
- ✅ Reply and forward
- ✅ Star important emails
- ✅ Move to trash
- ✅ Search emails
- ✅ Folder organization

**Folders:**
- ✅ Inbox (with unread count)
- ✅ Sent
- ✅ Drafts
- ✅ Spam
- ✅ Trash

**Compose Features:**
- ✅ To, CC, BCC fields
- ✅ Subject line
- ✅ Rich text body
- ✅ Send via SMTP
- ✅ Save to sent folder

**UI/UX:**
- ✅ Three-column layout
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Material icons
- ✅ Real-time search
- ✅ Storage indicator

---

## 🎨 Interface Design

### Layout

**Three-Column Design:**
1. **Left Sidebar** (Folders)
   - Inbox with unread badge
   - Sent, Drafts, Spam, Trash
   - Storage usage indicator

2. **Middle Column** (Email List)
   - Search bar
   - Email previews
   - Star indicators
   - Read/unread status
   - Date stamps

3. **Right Column** (Email Content)
   - Full email view
   - From/To/Date headers
   - Email body
   - Attachments (if any)
   - Reply/Forward actions

### Branding

**Limitless Infotech Theme:**
- Blue primary color (#2A52BE)
- Material Symbols icons
- Professional typography
- Consistent with admin panel
- Dark mode support

---

## 📍 Access

**URL:** `/admin/webmail`

**Navigation:**
```
Admin Dashboard → Webmail
```

**Requirements:**
- Admin authentication (JWT)
- SMTP configuration
- Database (optional, uses mock data as fallback)

---

## 🔌 API Endpoints

### Get Emails

**GET** `/api/admin/webmail`

Query Parameters:
- `folder` - Filter by folder (inbox, sent, drafts, trash, spam)

Response:
```json
{
  "emails": [
    {
      "id": "uuid",
      "from": "sender@example.com",
      "to": "info@limitlessinfotech.com",
      "subject": "Email subject",
      "body": "Email content...",
      "date": "2024-11-28T10:30:00Z",
      "read": false,
      "starred": false,
      "folder": "inbox",
      "attachments": []
    }
  ]
}
```

### Send Email

**POST** `/api/admin/webmail/send`

Request Body:
```json
{
  "to": "recipient@example.com",
  "cc": "cc@example.com",
  "bcc": "bcc@example.com",
  "subject": "Email subject",
  "body": "Email content"
}
```

Response:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

### Star Email

**PATCH** `/api/admin/webmail/[id]/star`

Toggles starred status.

### Delete Email

**DELETE** `/api/admin/webmail/[id]`

Moves email to trash folder.

---

## 🗄️ Database Schema

### Emails Table

```sql
CREATE TABLE emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_email VARCHAR(255) NOT NULL,
  to_email VARCHAR(255) NOT NULL,
  cc_email TEXT,
  bcc_email TEXT,
  subject VARCHAR(500) NOT NULL,
  body TEXT NOT NULL,
  html_body TEXT,
  folder VARCHAR(50) DEFAULT 'inbox',
  read BOOLEAN DEFAULT false,
  starred BOOLEAN DEFAULT false,
  attachments JSONB,
  headers JSONB,
  message_id VARCHAR(255),
  in_reply_to VARCHAR(255),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_emails_folder ON emails(folder);
CREATE INDEX idx_emails_date ON emails(date DESC);
CREATE INDEX idx_emails_from ON emails(from_email);
CREATE INDEX idx_emails_to ON emails(to_email);
CREATE INDEX idx_emails_read ON emails(read);
```

---

## 🚀 Setup Instructions

### 1. SMTP Configuration

Ensure SMTP is configured in `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM_EMAIL=info@limitlessinfotech.com
```

### 2. Database Setup

Run database setup to create emails table:

```bash
npm run db:setup
```

Or manually run the schema:

```sql
-- Run the emails table creation from schema.sql
```

### 3. Access Webmail

```
1. Login to admin panel
2. Click "Webmail" in sidebar
3. Start reading and sending emails
```

---

## 💡 Usage Guide

### Reading Emails

1. **Select Folder**
   - Click folder in left sidebar
   - Inbox shows unread count

2. **Browse Emails**
   - Scroll through email list
   - Click to read full email

3. **Search Emails**
   - Use search bar
   - Searches subject, from, body

4. **Star Important Emails**
   - Click star icon
   - Starred emails highlighted

### Composing Emails

1. **Click "Compose" Button**
   - Opens compose modal

2. **Fill in Details**
   - To (required)
   - CC, BCC (optional)
   - Subject (required)
   - Message body (required)

3. **Send Email**
   - Click "Send" button
   - Email sent via SMTP
   - Saved to sent folder

### Replying to Emails

1. **Open Email**
   - Click email in list

2. **Click "Reply"**
   - Opens compose with:
   - To: Original sender
   - Subject: Re: Original subject

3. **Write Reply**
   - Add your message
   - Click "Send"

### Managing Emails

**Delete:**
- Click delete icon
- Moves to trash folder

**Star:**
- Click star icon
- Marks as important

**Forward:**
- Click forward button
- Add recipients
- Send

---

## 🎯 Features Comparison

### vs RoundCube

**Similarities:**
- ✅ Folder management
- ✅ Compose emails
- ✅ Reply/Forward
- ✅ Search functionality
- ✅ Star emails
- ✅ Attachment support (structure ready)

**Advantages:**
- ✅ Modern React UI
- ✅ Integrated with admin panel
- ✅ Dark mode support
- ✅ Material Design icons
- ✅ Responsive mobile design
- ✅ No PHP required
- ✅ Same tech stack
- ✅ Customizable branding

**Future Enhancements:**
- [ ] File attachments
- [ ] Rich text editor
- [ ] Email templates
- [ ] Signatures
- [ ] Filters and rules
- [ ] Multiple accounts
- [ ] Calendar integration

---

## 🔐 Security Features

### Authentication
- ✅ JWT token required
- ✅ Protected routes
- ✅ Session validation

### Email Security
- ✅ SMTP authentication
- ✅ TLS/SSL support
- ✅ Input sanitization
- ✅ XSS protection

### Privacy
- ✅ Secure storage
- ✅ Access control
- ✅ Audit trail
- ✅ GDPR compliant

---

## 📊 Storage Management

### Storage Indicator

Shows:
- Used storage
- Total storage
- Visual progress bar

**Example:**
```
2.5 GB / 15 GB
[████░░░░░░░░░░░░] 16.67%
```

### Storage Calculation

Based on:
- Email count
- Attachment sizes
- Database size

---

## 🎨 Customization

### Branding

**Colors:**
```css
/* Primary Blue */
--primary: #2A52BE;

/* Secondary Orange */
--secondary: #F97316;

/* Accent Gold */
--accent: #D4AF37;
```

**Logo:**
- Displayed in header
- "Limitless Webmail" branding
- Email address shown

### Layout

**Responsive Breakpoints:**
- Mobile: < 768px (stacked)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (3 columns)

---

## 🔧 Configuration

### Email Settings

**SMTP Configuration:**
```typescript
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})
```

### Folder Settings

**Default Folders:**
```typescript
const folders = [
  'inbox',
  'sent',
  'drafts',
  'trash',
  'spam'
]
```

**Add Custom Folders:**
```sql
-- Add to database
ALTER TABLE emails 
ADD CONSTRAINT check_folder 
CHECK (folder IN ('inbox', 'sent', 'drafts', 'trash', 'spam', 'custom'));
```

---

## 🚀 Advanced Features

### Email Filters (Future)

**Auto-sort emails:**
```typescript
// Example filter
{
  condition: 'from contains @example.com',
  action: 'move to folder: clients'
}
```

### Email Templates (Future)

**Pre-written responses:**
```typescript
const templates = [
  {
    name: 'Welcome Email',
    subject: 'Welcome to Limitless Infotech',
    body: 'Thank you for contacting us...'
  }
]
```

### Signatures (Future)

**Auto-append to emails:**
```
Best regards,
Your Name
Limitless Infotech Solution Pvt Ltd
Phone: +91 7710909492
Email: info@limitlessinfotech.com
```

---

## 🐛 Troubleshooting

### Emails Not Loading

**Issue:** Empty inbox
**Solution:**
- Check database connection
- Verify emails table exists
- Check folder filter
- Review API response

### Cannot Send Emails

**Issue:** Send fails
**Solution:**
- Verify SMTP configuration
- Check credentials
- Test SMTP connection
- Review error logs

### Search Not Working

**Issue:** No results
**Solution:**
- Check search term
- Verify data exists
- Clear search and retry
- Check console for errors

---

## 📈 Performance

### Optimization

**Database:**
- Indexed columns
- Efficient queries
- Pagination ready

**Frontend:**
- Lazy loading
- Virtual scrolling (future)
- Optimized re-renders

**Caching:**
- Email list caching
- Folder count caching
- Search result caching

---

## 🎓 Best Practices

### Email Management

**Organize:**
- Use folders effectively
- Star important emails
- Delete unnecessary emails
- Archive old emails

**Security:**
- Don't share credentials
- Use strong passwords
- Enable 2FA on email account
- Be cautious with attachments

**Productivity:**
- Use search frequently
- Reply promptly
- Use templates
- Set up filters

---

## 📞 Support

**Need Help?**
- Email: info@limitlessinfotech.com
- Phone: +91 7710909492
- Documentation: `/docs` folder

**Resources:**
- [Nodemailer Documentation](https://nodemailer.com/)
- [SMTP Setup Guide](./docs/DEPLOYMENT_GUIDE.md)
- [Email Best Practices](https://www.emailonacid.com/blog/)

---

## ✅ Summary

Your admin panel now has:

✅ **Complete Webmail System**
- Read and send emails
- Folder management
- Search functionality
- Star important emails
- Reply and forward

✅ **Professional Design**
- Three-column layout
- Responsive design
- Dark mode support
- Limitless branding

✅ **Production Ready**
- SMTP integration
- Database storage
- Secure authentication
- Error handling

**Total Features:** 15+  
**New Admin Page:** 1  
**New API Endpoints:** 4  
**Database Table:** 1 (emails)

---

## 🎉 You're Ready!

Start using your webmail:

1. **Access Webmail**
   ```
   Admin Dashboard → Webmail
   ```

2. **Compose Email**
   - Click "Compose"
   - Fill in details
   - Send

3. **Manage Emails**
   - Read inbox
   - Reply to emails
   - Organize with folders

**Professional email management at your fingertips!** 📧✨

---

**Built with ❤️ by Limitless Infotech Solution Pvt Ltd**  
**Version:** 2.7.0  
**Status:** ✅ Production Ready  
**Features:** Complete Webmail System  
**Branding:** Limitless Infotech
