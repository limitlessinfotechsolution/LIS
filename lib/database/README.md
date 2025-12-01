# Database Integration

## 📊 Overview

This directory contains all database-related code for Limitless Infotech, including connection management, models, and schema definitions.

---

## 📁 Structure

```
lib/database/
├── connection.ts       # Database connection pool and utilities
├── schema.sql         # Database schema (tables, indexes, views)
├── models/
│   ├── admin.ts       # Admin user operations
│   └── inquiry.ts     # Inquiry/contact form operations
└── README.md          # This file
```

---

## 🚀 Quick Start

### 1. Set Up Environment

Create `.env.local`:
```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-secret-key
```

### 2. Run Setup Script

```bash
npm run db:setup
```

This creates:
- All database tables
- Indexes and constraints
- Default admin user (username: admin, password: admin123)
- Sample data

### 3. Test Connection

```javascript
import { testConnection } from './lib/database/connection'

await testConnection() // Returns true if successful
```

---

## 🔌 Connection Management

### Getting a Connection

```javascript
import { query, getClient, getPool } from './lib/database/connection'

// Simple query
const result = await query('SELECT * FROM inquiries WHERE status = $1', ['pending'])

// Transaction
const client = await getClient()
try {
  await client.query('BEGIN')
  await client.query('INSERT INTO ...')
  await client.query('UPDATE ...')
  await client.query('COMMIT')
} catch (e) {
  await client.query('ROLLBACK')
  throw e
} finally {
  client.release()
}

// Direct pool access
const pool = getPool()
const result = await pool.query('SELECT NOW()')
```

### Connection Pool Configuration

```javascript
{
  max: 20,                      // Maximum connections
  idleTimeoutMillis: 30000,     // Close idle connections after 30s
  connectionTimeoutMillis: 2000 // Timeout after 2s
}
```

---

## 📝 Models

### Admin Model

```javascript
import {
  getAdminByUsername,
  verifyAdminPassword,
  createAdmin,
  getAllAdmins,
  updateAdmin,
  deactivateAdmin
} from './lib/database/models/admin'

// Verify login
const admin = await verifyAdminPassword('admin', 'password123')

// Create new admin
const newAdmin = await createAdmin({
  username: 'john',
  email: 'john@example.com',
  password: 'securepass',
  role: 'admin'
})

// Get all admins
const admins = await getAllAdmins()

// Update admin
await updateAdmin(adminId, { email: 'newemail@example.com' })

// Deactivate admin
await deactivateAdmin(adminId)
```

### Inquiry Model

```javascript
import {
  getInquiries,
  getInquiryById,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
  getInquiryStats,
  markInquiryReplied
} from './lib/database/models/inquiry'

// Get paginated inquiries
const result = await getInquiries(1, 20, 'pending', 'search term')
// Returns: { inquiries, total, page, limit, totalPages }

// Get single inquiry
const inquiry = await getInquiryById('uuid')

// Create inquiry
const newInquiry = await createInquiry({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  company: 'Tech Corp',
  service: 'Web Development',
  message: 'Need a website...',
  ip_address: '192.168.1.1',
  user_agent: 'Mozilla/5.0...'
})

// Update status
await updateInquiryStatus('uuid', 'read', 'Contacted client')

// Mark as replied
await markInquiryReplied('uuid')

// Delete inquiry
await deleteInquiry('uuid')

// Get statistics
const stats = await getInquiryStats()
// Returns: { total_inquiries, pending_inquiries, read_inquiries, ... }
```

---

## 🗄️ Database Schema

### Tables

#### admin_users
- `id` (UUID, PK)
- `username` (VARCHAR, UNIQUE)
- `email` (VARCHAR, UNIQUE)
- `password_hash` (VARCHAR)
- `role` (VARCHAR)
- `is_active` (BOOLEAN)
- `last_login` (TIMESTAMP)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### inquiries
- `id` (UUID, PK)
- `name` (VARCHAR)
- `email` (VARCHAR)
- `phone` (VARCHAR)
- `company` (VARCHAR)
- `service` (VARCHAR)
- `budget` (VARCHAR)
- `timeline` (VARCHAR)
- `message` (TEXT)
- `status` (VARCHAR) - pending, read, replied, archived
- `priority` (VARCHAR) - low, normal, high, urgent
- `assigned_to` (UUID, FK → admin_users)
- `notes` (TEXT)
- `ip_address` (VARCHAR)
- `user_agent` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `replied_at` (TIMESTAMP)

#### newsletter_subscribers
- `id` (UUID, PK)
- `email` (VARCHAR, UNIQUE)
- `name` (VARCHAR)
- `status` (VARCHAR) - active, unsubscribed
- `source` (VARCHAR)
- `subscribed_at` (TIMESTAMP)
- `unsubscribed_at` (TIMESTAMP)

#### blog_posts
- `id` (UUID, PK)
- `title` (VARCHAR)
- `slug` (VARCHAR, UNIQUE)
- `excerpt` (TEXT)
- `content` (TEXT)
- `author_id` (UUID, FK → admin_users)
- `featured_image` (VARCHAR)
- `category` (VARCHAR)
- `tags` (TEXT[])
- `status` (VARCHAR) - draft, published
- `published_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Views

#### inquiry_stats
Aggregated statistics for inquiries:
```sql
SELECT 
  COUNT(*) as total_inquiries,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_inquiries,
  COUNT(*) FILTER (WHERE status = 'read') as read_inquiries,
  COUNT(*) FILTER (WHERE status = 'replied') as replied_inquiries,
  COUNT(*) FILTER (WHERE status = 'archived') as archived_inquiries,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as inquiries_this_week,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as inquiries_this_month
FROM inquiries;
```

### Indexes

- `idx_inquiries_status` on inquiries(status)
- `idx_inquiries_created_at` on inquiries(created_at)
- `idx_inquiries_email` on inquiries(email)
- `idx_newsletter_email` on newsletter_subscribers(email)
- `idx_blog_slug` on blog_posts(slug)
- `idx_blog_status` on blog_posts(status)

---

## 🔐 Security

### Password Hashing

```javascript
import bcrypt from 'bcrypt'

// Hash password (done automatically in createAdmin)
const hash = await bcrypt.hash(password, 10)

// Verify password (done automatically in verifyAdminPassword)
const isValid = await bcrypt.compare(password, hash)
```

### SQL Injection Prevention

All queries use parameterized statements:

```javascript
// ✅ SAFE - Parameterized query
await query('SELECT * FROM users WHERE email = $1', [userEmail])

// ❌ UNSAFE - String concatenation
await query(`SELECT * FROM users WHERE email = '${userEmail}'`)
```

### Connection Security

```javascript
// Production: SSL required
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require

// Development: SSL optional
DATABASE_URL=postgresql://user:pass@localhost:5432/db?sslmode=disable
```

---

## 🧪 Testing

### Test Connection

```bash
node -e "
require('dotenv').config({ path: '.env.local' });
const { testConnection } = require('./lib/database/connection');
testConnection().then(success => {
  console.log(success ? '✅ Connected' : '❌ Failed');
  process.exit(success ? 0 : 1);
});
"
```

### Test Queries

```javascript
import { query } from './lib/database/connection'

// Test simple query
const result = await query('SELECT NOW()')
console.log('Current time:', result.rows[0].now)

// Test with parameters
const inquiries = await query(
  'SELECT * FROM inquiries WHERE status = $1 LIMIT $2',
  ['pending', 10]
)
console.log('Pending inquiries:', inquiries.rows.length)
```

---

## 🔧 Maintenance

### Backup Database

```bash
# Full backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Schema only
pg_dump --schema-only $DATABASE_URL > schema_backup.sql

# Data only
pg_dump --data-only $DATABASE_URL > data_backup.sql
```

### Restore Database

```bash
# Restore full backup
psql $DATABASE_URL < backup_20241128.sql

# Restore specific table
pg_restore --table=inquiries backup.dump
```

### Vacuum and Analyze

```sql
-- Reclaim space and update statistics
VACUUM ANALYZE;

-- Specific table
VACUUM ANALYZE inquiries;
```

### Monitor Performance

```sql
-- Active connections
SELECT count(*) FROM pg_stat_activity;

-- Table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Slow queries (requires pg_stat_statements extension)
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

---

## 🐛 Troubleshooting

### Connection Issues

```javascript
// Enable debug logging
process.env.DEBUG = 'pg:*'

// Test connection with detailed error
const { Pool } = require('pg')
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

pool.query('SELECT NOW()')
  .then(res => console.log('✅ Connected:', res.rows[0]))
  .catch(err => console.error('❌ Error:', err.message, err.stack))
  .finally(() => pool.end())
```

### Common Errors

**"password authentication failed"**
- Check username and password in DATABASE_URL
- Verify user exists: `SELECT * FROM pg_user WHERE usename = 'your_user';`

**"database does not exist"**
- Create database: `createdb your_database`
- Or: `CREATE DATABASE your_database;`

**"too many connections"**
- Reduce pool size in connection.ts
- Check active connections: `SELECT count(*) FROM pg_stat_activity;`
- Kill idle connections: `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'idle';`

**"SSL connection required"**
- Add to DATABASE_URL: `?sslmode=require`
- Or disable for local: `?sslmode=disable`

---

## 📚 Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres (pg)](https://node-postgres.com/)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)
- [SQL Best Practices](https://www.postgresql.org/docs/current/sql.html)

---

## 📞 Support

Need help with database setup?
- Email: info@limitlessinfotech.com
- Phone: +91 7710909492
- Documentation: `/docs/DATABASE_SETUP.md`
