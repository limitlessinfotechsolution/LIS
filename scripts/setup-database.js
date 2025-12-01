#!/usr/bin/env node

/**
 * Database Setup Script
 * 
 * This script helps set up the database for Limitless Infotech
 * Run with: node scripts/setup-database.js
 */

const { Pool } = require('pg')
const bcrypt = require('bcrypt')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

async function setupDatabase() {
  console.log('🚀 Setting up Limitless Infotech Database...')
  console.log('=====================================\n')

  try {
    // Test connection
    console.log('1. Testing database connection...')
    const testResult = await pool.query('SELECT NOW() as current_time')
    console.log('✅ Database connected successfully')
    console.log(`   Current time: ${testResult.rows[0].current_time}\n`)

    // Read and execute schema
    console.log('2. Creating database schema...')
    const schemaPath = path.join(__dirname, '..', 'lib', 'database', 'schema.sql')
    
    if (!fs.existsSync(schemaPath)) {
      throw new Error('Schema file not found at: ' + schemaPath)
    }

    const schema = fs.readFileSync(schemaPath, 'utf8')
    await pool.query(schema)
    console.log('✅ Database schema created successfully\n')

    // Create default admin user
    console.log('3. Creating default admin user...')
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    try {
      await pool.query(`
        INSERT INTO admin_users (username, email, password_hash, role)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO UPDATE SET
          password_hash = EXCLUDED.password_hash,
          updated_at = CURRENT_TIMESTAMP
      `, [
        'admin',
        'admin@limitlessinfotech.com',
        hashedPassword,
        'admin'
      ])
      console.log('✅ Default admin user created/updated')
      console.log('   Username: admin')
      console.log(`   Password: ${adminPassword}\n`)
    } catch (adminError) {
      console.log('⚠️  Admin user already exists or error occurred:', adminError.message)
    }

    // Insert sample data
    console.log('4. Inserting sample data...')
    
    // Sample inquiry
    try {
      await pool.query(`
        INSERT INTO inquiries (name, email, phone, company, service, message, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT DO NOTHING
      `, [
        'John Doe',
        'john@example.com',
        '+1 234 567 8900',
        'Tech Corp',
        'Web Development',
        'We need a custom web application for our business.',
        'pending'
      ])
      console.log('✅ Sample inquiry added')
    } catch (inquiryError) {
      console.log('⚠️  Sample inquiry not added:', inquiryError.message)
    }

    // Sample newsletter subscriber
    try {
      await pool.query(`
        INSERT INTO newsletter_subscribers (email, name, status, source)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (email) DO NOTHING
      `, [
        'subscriber@example.com',
        'Jane Smith',
        'active',
        'website'
      ])
      console.log('✅ Sample subscriber added\n')
    } catch (subError) {
      console.log('⚠️  Sample subscriber not added:', subError.message)
    }

    // Verify setup
    console.log('5. Verifying setup...')
    const adminCount = await pool.query('SELECT COUNT(*) FROM admin_users')
    const inquiryCount = await pool.query('SELECT COUNT(*) FROM inquiries')
    const subscriberCount = await pool.query('SELECT COUNT(*) FROM newsletter_subscribers')

    console.log(`✅ Admin users: ${adminCount.rows[0].count}`)
    console.log(`✅ Inquiries: ${inquiryCount.rows[0].count}`)
    console.log(`✅ Subscribers: ${subscriberCount.rows[0].count}\n`)

    console.log('🎉 Database setup completed successfully!')
    console.log('=====================================\n')
    console.log('Next steps:')
    console.log('1. Start your application: npm run dev')
    console.log('2. Access admin panel: http://localhost:3000/admin')
    console.log('3. Login with username: admin, password:', adminPassword)
    console.log('\n')

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    console.log('\nTroubleshooting:')
    console.log('1. Make sure PostgreSQL is running')
    console.log('2. Check your DATABASE_URL in .env.local')
    console.log('3. Ensure the database exists')
    console.log('4. Check database permissions\n')
    process.exit(1)
  } finally {
    await pool.end()
  }
}

// Check if DATABASE_URL is provided
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment variables')
  console.log('\nPlease:')
  console.log('1. Create .env.local file')
  console.log('2. Add: DATABASE_URL=postgresql://user:password@localhost:5432/your_db')
  console.log('3. Run this script again\n')
  process.exit(1)
}

// Run setup
setupDatabase()
