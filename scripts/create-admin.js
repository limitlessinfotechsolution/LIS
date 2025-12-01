#!/usr/bin/env node

/**
 * Create Admin User Script
 * 
 * This script creates a new admin user
 * Run with: node scripts/create-admin.js
 */

const { Pool } = require('pg')
const bcrypt = require('bcrypt')
const readline = require('readline')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve)
  })
}

async function createAdmin() {
  console.log('🔐 Create New Admin User')
  console.log('========================\n')

  try {
    // Test connection
    await pool.query('SELECT 1')
    console.log('✅ Database connected\n')

    // Get user input
    const username = await askQuestion('Username: ')
    const email = await askQuestion('Email: ')
    const password = await askQuestion('Password: ')
    const role = await askQuestion('Role (admin): ') || 'admin'

    console.log('\n⏳ Creating admin user...')

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert admin user
    const result = await pool.query(`
      INSERT INTO admin_users (username, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role, created_at
    `, [username, email, hashedPassword, role])

    const admin = result.rows[0]

    console.log('\n✅ Admin user created successfully!')
    console.log('=================================')
    console.log(`ID: ${admin.id}`)
    console.log(`Username: ${admin.username}`)
    console.log(`Email: ${admin.email}`)
    console.log(`Role: ${admin.role}`)
    console.log(`Created: ${admin.created_at}\n`)

  } catch (error) {
    if (error.code === '23505') {
      console.error('❌ Username or email already exists')
    } else {
      console.error('❌ Failed to create admin user:', error.message)
    }
  } finally {
    rl.close()
    await pool.end()
  }
}

// Check if DATABASE_URL is provided
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment variables')
  console.log('Please set DATABASE_URL in .env.local\n')
  process.exit(1)
}

// Run script
createAdmin()
