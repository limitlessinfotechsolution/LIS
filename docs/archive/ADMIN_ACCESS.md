# 🔐 Admin Panel - Quick Access Guide

## 🚀 Quick Start

### Access Admin Panel
```
URL: http://localhost:3000/admin
```

### Login Credentials
```
Username: admin
Password: admin123
```

---

## 📋 Available Features

### 1. Dashboard (`/admin/dashboard`)
- View statistics
- Monitor system status
- See recent inquiries
- Quick navigation

### 2. Inquiries (`/admin/inquiries`)
- View all inquiries
- Search and filter
- Update status
- Reply via email
- Delete inquiries

### 3. SMTP Config (`/admin/smtp`)
- Configure email server
- Test email sending
- Save settings

---

## 🔧 Common Tasks

### Configure Email (Gmail)
1. Go to `/admin/smtp`
2. Enter:
   - Host: `smtp.gmail.com`
   - Port: `587`
   - Username: `your-email@gmail.com`
   - Password: `your-app-password`
3. Click "Save Configuration"
4. Test with your email

### Manage Inquiries
1. Go to `/admin/inquiries`
2. Click eye icon to view details
3. Update status as needed
4. Click "Reply via Email" to respond

---

## 📧 SMTP Setup (Gmail)

### Generate App Password
1. Go to Google Account Settings
2. Security → 2-Step Verification
3. App passwords → Generate
4. Use generated password in admin panel

---

## 🔒 Security Notes

### For Development
- Demo credentials are fine
- Data stored in memory

### For Production
1. Change admin credentials
2. Use bcrypt for passwords
3. Set strong JWT_SECRET
4. Set up database
5. Enable HTTPS

---

## 📚 Documentation

- **Full Guide**: `docs/CMS_ADMIN_PANEL.md`
- **Quick Start**: `docs/ADMIN_QUICK_START.md`
- **API Docs**: See admin panel documentation

---

## 🆘 Troubleshooting

### Can't Login?
- Check credentials (admin/admin123)
- Clear browser cache
- Check console for errors

### SMTP Not Working?
- Verify credentials
- Use App Password (Gmail)
- Check port and host
- Test configuration

---

## 📞 Support

**Email**: info@limitlessinfotech.com  
**Phone**: +91 7710909492

---

**Version**: 2.2.0  
**Last Updated**: November 27, 2025
