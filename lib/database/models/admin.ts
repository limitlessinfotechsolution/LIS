// Admin user model for database operations
import { query } from '../connection'
import bcrypt from 'bcrypt'

export interface AdminUser {
  id: string
  username: string
  email: string
  password_hash: string
  role: string
  is_active: boolean
  last_login?: Date
  created_at: Date
  updated_at: Date
}

export interface CreateAdminData {
  username: string
  email: string
  password: string
  role?: string
}

/**
 * Get admin user by username
 */
export async function getAdminByUsername(username: string): Promise<AdminUser | null> {
  const result = await query(
    'SELECT * FROM admin_users WHERE username = $1 AND is_active = true',
    [username]
  )
  return result.rows[0] || null
}

/**
 * Get admin user by email
 */
export async function getAdminByEmail(email: string): Promise<AdminUser | null> {
  const result = await query(
    'SELECT * FROM admin_users WHERE email = $1 AND is_active = true',
    [email]
  )
  return result.rows[0] || null
}

/**
 * Verify admin password
 */
export async function verifyAdminPassword(
  username: string, 
  password: string
): Promise<AdminUser | null> {
  const admin = await getAdminByUsername(username)
  
  if (!admin) {
    return null
  }

  // For development, allow plain text password comparison
  if (process.env.NODE_ENV === 'development' && password === 'admin123') {
    await updateLastLogin(admin.id)
    return admin
  }

  // For production, use bcrypt
  const isValid = await bcrypt.compare(password, admin.password_hash)
  
  if (isValid) {
    await updateLastLogin(admin.id)
    return admin
  }

  return null
}

/**
 * Create new admin user
 */
export async function createAdmin(data: CreateAdminData): Promise<AdminUser> {
  const saltRounds = 10
  const password_hash = await bcrypt.hash(data.password, saltRounds)

  const result = await query(`
    INSERT INTO admin_users (username, email, password_hash, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [
    data.username,
    data.email,
    password_hash,
    data.role || 'admin'
  ])

  return result.rows[0]
}

/**
 * Update admin last login
 */
export async function updateLastLogin(adminId: string): Promise<void> {
  await query(
    'UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
    [adminId]
  )
}

/**
 * Get all admin users
 */
export async function getAllAdmins(): Promise<AdminUser[]> {
  const result = await query(
    'SELECT id, username, email, role, is_active, last_login, created_at FROM admin_users ORDER BY created_at DESC'
  )
  return result.rows
}

/**
 * Update admin user
 */
export async function updateAdmin(
  id: string,
  data: Partial<CreateAdminData>
): Promise<AdminUser | null> {
  const updates: string[] = []
  const values: unknown[] = []
  let paramIndex = 1

  if (data.username) {
    updates.push(`username = $${paramIndex}`)
    values.push(data.username)
    paramIndex++
  }

  if (data.email) {
    updates.push(`email = $${paramIndex}`)
    values.push(data.email)
    paramIndex++
  }

  if (data.password) {
    const password_hash = await bcrypt.hash(data.password, 10)
    updates.push(`password_hash = $${paramIndex}`)
    values.push(password_hash)
    paramIndex++
  }

  if (data.role) {
    updates.push(`role = $${paramIndex}`)
    values.push(data.role)
    paramIndex++
  }

  if (updates.length === 0) {
    return null
  }

  updates.push(`updated_at = CURRENT_TIMESTAMP`)
  values.push(id)

  const result = await query(`
    UPDATE admin_users 
    SET ${updates.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING id, username, email, role, is_active, last_login, created_at, updated_at
  `, values)

  return result.rows[0] || null
}

/**
 * Deactivate admin user
 */
export async function deactivateAdmin(id: string): Promise<boolean> {
  const result = await query(
    'UPDATE admin_users SET is_active = false WHERE id = $1',
    [id]
  )
  return result.rowCount !== null && result.rowCount > 0
}
