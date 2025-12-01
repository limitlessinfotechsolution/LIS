# Database Setup Guide

## 📊 Database Configuration for Limitless Infotech

This guide covers setting up PostgreSQL database for your application.

---

## 🚀 Quick Start

### 1. Choose Database Provider

**Recommended Options:**
- **Supabase** - Free tier, easy setup, managed PostgreSQL
- **Railway** - Simple deployment, good free tier
- **Neon** - Serverless PostgreSQL, generous free tier
- **Self-hosted** - Full control, requires server management

### 2. Get Database URL

After creating your database, you'll get a connection string like:
```
postgresql://username:password@host:port/database
```

### 3. Configure Environment

Create `.env.local` file:
```env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-secret-key-here
```

### 4. Run Setup Script

```bash
npm run db:setup
```

This will:
- Create all required tables
- Set up indexes and constraints
- Create default admin user
- Add sample data

---

## 🗄️ Database Schema

### Tables

#### 1. admin_users
Stores admin user accounts for the admin panel.

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. inquiries
Stores contact form submissions and inquiries.

```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  service VARCHAR(100) NOT NULL,
  budget VARCHAR(50),
  timeline VARCHAR(50),
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  priority VARCHAR(20) DEFAULT 'normal',
  assigned_to UUID REFERENCES admin_users(id),
  notes TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  replied_at TIMESTAMP
);
```

#### 3. newsletter_subscribers
Stores newsletter subscription data.

```sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active',
  source VARCHAR(50),
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP
);
```

#### 4. blog_posts
Stores blog articles and content.

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES admin_users(id),
  featured_image VARCHAR(500),
  category VARCHAR(100),
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔧 Manual Setup

If you prefer manual setup or the script fails:

### Step 1: Create Database

```bash
# PostgreSQL command line
createdb limitless_infotech

# Or using psql
psql -U postgres
CREATE DATABASE limitless_infotech;
```

### Step 2: Run Schema File

```bash
psql -U postgres -d limitless_infotech -f lib/database/schema.sql
```

### Step 3: Create Admin User

```bash
npm run db:create-admin
```

Or manually:
```sql
INSERT INTO admin_users (username, email, password_hash, role)
VALUES (
  'admin',
  'admin@limitlessinfotech.com',
  '$2b$10$...',  -- bcrypt hash of your password
  'admin'
);
```

---

## 🌐 Database Providers Setup

### Supabase (Recommended)

1. **Create Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for free account

2. **Create Project**
   - Click "New Project"
   - Choose organization
   - Set database password
   - Select region (closest to your users)

3. **Get Connection String**
   - Go to Project Settings → Database
   - Copy "Connection string" under "Connection pooling"
   - Replace `[YOUR-PASSWORD]` with your database password

4. **Run SQL**
   - Go to SQL Editor
   - Paste contents of `lib/database/schema.sql`
   - Click "Run"

5. **Configure App**
   ```env
   DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
   ```

### Railway

1. **Create Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create Database**
   - New Project → Provision PostgreSQL
   - Wait for deployment

3. **Get Connection Details**
   - Click on PostgreSQL service
   - Copy "Postgres Connection URL"

4. **Configure App**
   ```env
   DATABASE_URL=postgresql://postgres:password@containers-us-west-xxx.railway.app:7431/railway
   ```

### Neon

1. **Create Account**
   - Go to [neon.tech](https://neon.tech)
   - Sign up for free

2. **Create Project**
   - New Project
   - Choose region
   - Set name

3. **Get Connection String**
   - Copy connection string from dashboard

4. **Configure App**
   ```env
   DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb
   ```

### Self-Hosted

1. **Install PostgreSQL**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   
   # macOS
   brew install postgresql
   brew services start postgresql
   
   # Windows
   # Download from postgresql.org
   ```

2. **Create Database and User**
   ```bash
   sudo -u postgres psql
   ```
   ```sql
   CREATE DATABASE limitless_infotech;
   CREATE USER limitless_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE limitless_infotech TO limitless_user;
   ```

3. **Configure Connection**
   ```env
   DATABASE_URL=postgresql://limitless_user:your_password@localhost:5432/limitless_infotech
   ```

---

## 🔐 Security Best Practices

### 1. Strong Passwords
```bash
# Generate secure password
openssl rand -base64 32
```

### 2. SSL/TLS Connection
```env
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
```

### 3. Connection Pooling
```javascript
// Already configured in lib/database/connection.ts
max: 20,  // Maximum connections
idleTimeoutMillis: 30000,
connectionTimeoutMillis: 2000
```

### 4. Environment Variables
- Never commit `.env.local` to git
- Use different credentials for dev/prod
- Rotate passwords regularly

### 5. Database Backups
```bash
# Automated backup script
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Restore from backup
psql $DATABASE_URL < backup_20241128.sql
```

---

## 🧪 Testing Database Connection

### Test Script

```bash
# Create test file
cat > test-db.js << 'EOF'
require('dotenv').config({ path: '.env.local' })
const { testConnection } = require('./lib/database/connection')

testConnection()
  .then(success => {
    if (success) {
      console.log('✅ Database connection successful!')
      process.exit(0)
    } else {
      console.error('❌ Database connection failed!')
      process.exit(1)
    }
  })
EOF

# Run test
node test-db.js
```

### Manual Test

```bash
# Using psql
psql $DATABASE_URL -c "SELECT NOW();"

# Using Node.js
node -e "
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query('SELECT NOW()', (err, res) => {
  console.log(err ? err : res.rows[0]);
  pool.end();
});
"
```

---

## 📊 Database Maintenance

### Regular Tasks

1. **Vacuum Database**
   ```sql
   VACUUM ANALYZE;
   ```

2. **Check Table Sizes**
   ```sql
   SELECT 
     schemaname,
     tablename,
     pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
   FROM pg_tables
   WHERE schemaname = 'public'
   ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
   ```

3. **Monitor Connections**
   ```sql
   SELECT count(*) FROM pg_stat_activity;
   ```

4. **Check Slow Queries**
   ```sql
   SELECT query, calls, total_time, mean_time
   FROM pg_stat_statements
   ORDER BY mean_time DESC
   LIMIT 10;
   ```

---

## 🐛 Troubleshooting

### Connection Refused
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Check port
sudo netstat -plnt | grep 5432

# Check firewall
sudo ufw status
```

### Authentication Failed
- Verify username and password
- Check `pg_hba.conf` settings
- Ensure user has proper permissions

### SSL Error
```env
# Disable SSL for local development
DATABASE_URL=postgresql://user:pass@localhost:5432/db?sslmode=disable

# Require SSL for production
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
```

### Too Many Connections
```javascript
// Reduce pool size in connection.ts
max: 10,  // Instead of 20
```

---

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Guides](https://supabase.com/docs)
- [Node-postgres (pg) Documentation](https://node-postgres.com/)
- [Database Security Best Practices](https://www.postgresql.org/docs/current/security.html)

---

**Need Help?**
- Email: info@limitlessinfotech.com
- Phone: +91 7710909492
