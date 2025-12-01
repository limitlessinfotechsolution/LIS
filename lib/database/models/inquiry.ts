// Inquiry model for database operations
import { query } from '../connection'

export interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  budget?: string
  timeline?: string
  message: string
  status: 'pending' | 'read' | 'replied' | 'archived'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  assigned_to?: string
  notes?: string
  ip_address?: string
  user_agent?: string
  created_at: Date
  updated_at: Date
  replied_at?: Date
}

export interface CreateInquiryData {
  name: string
  email: string
  phone?: string
  company?: string
  service: string
  budget?: string
  timeline?: string
  message: string
  ip_address?: string
  user_agent?: string
}

/**
 * Get all inquiries with pagination
 */
export async function getInquiries(
  page: number = 1,
  limit: number = 20,
  status?: string,
  search?: string
) {
  const offset = (page - 1) * limit
  let whereClause = 'WHERE 1=1'
  const params: unknown[] = []
  let paramIndex = 1

  if (status && status !== 'all') {
    whereClause += ` AND status = $${paramIndex}`
    params.push(status)
    paramIndex++
  }

  if (search) {
    whereClause += ` AND (name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR company ILIKE $${paramIndex})`
    params.push(`%${search}%`)
    paramIndex++
  }

  const countQuery = `SELECT COUNT(*) FROM inquiries ${whereClause}`
  const dataQuery = `
    SELECT * FROM inquiries 
    ${whereClause}
    ORDER BY created_at DESC 
    LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
  `

  params.push(limit, offset)

  const [countResult, dataResult] = await Promise.all([
    query(countQuery, params.slice(0, -2)),
    query(dataQuery, params)
  ])

  return {
    inquiries: dataResult.rows,
    total: parseInt(countResult.rows[0].count),
    page,
    limit,
    totalPages: Math.ceil(parseInt(countResult.rows[0].count) / limit)
  }
}

/**
 * Get inquiry by ID
 */
export async function getInquiryById(id: string): Promise<Inquiry | null> {
  const result = await query('SELECT * FROM inquiries WHERE id = $1', [id])
  return result.rows[0] || null
}

/**
 * Create new inquiry
 */
export async function createInquiry(data: CreateInquiryData): Promise<Inquiry> {
  const result = await query(`
    INSERT INTO inquiries (
      name, email, phone, company, service, budget, timeline, 
      message, ip_address, user_agent
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `, [
    data.name,
    data.email,
    data.phone,
    data.company,
    data.service,
    data.budget,
    data.timeline,
    data.message,
    data.ip_address,
    data.user_agent
  ])

  return result.rows[0]
}

/**
 * Update inquiry status
 */
export async function updateInquiryStatus(
  id: string, 
  status: Inquiry['status'],
  notes?: string
): Promise<Inquiry | null> {
  const result = await query(`
    UPDATE inquiries 
    SET status = $1, notes = COALESCE($2, notes), updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *
  `, [status, notes, id])

  return result.rows[0] || null
}

/**
 * Delete inquiry
 */
export async function deleteInquiry(id: string): Promise<boolean> {
  const result = await query('DELETE FROM inquiries WHERE id = $1', [id])
  return result.rowCount !== null && result.rowCount > 0
}

/**
 * Get inquiry statistics
 */
export async function getInquiryStats() {
  const result = await query('SELECT * FROM inquiry_stats')
  return result.rows[0]
}

/**
 * Mark inquiry as replied
 */
export async function markInquiryReplied(id: string): Promise<Inquiry | null> {
  const result = await query(`
    UPDATE inquiries 
    SET status = 'replied', replied_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `, [id])

  return result.rows[0] || null
}
