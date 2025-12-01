import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '../../../../lib/auth'
import { query } from '../../../../lib/database/connection'

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !verifyToken(authHeader.replace('Bearer ', ''))) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    let whereClause = 'WHERE 1=1'
    const params: unknown[] = []
    let paramIndex = 1

    if (status && status !== 'all') {
      whereClause += ` AND status = $${paramIndex}`
      params.push(status)
      paramIndex++
    }

    if (category) {
      whereClause += ` AND category = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    const result = await query(`
      SELECT 
        id, title, slug, excerpt, category, tags, 
        featured_image, status, published_at, created_at, author_id
      FROM blog_posts 
      ${whereClause}
      ORDER BY created_at DESC
    `, params)

    return NextResponse.json({ posts: result.rows })
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()

    // Get author ID from token (simplified - in production, decode JWT)
    const authorId = 'admin-user-id' // TODO: Get from decoded JWT

    const result = await query(`
      INSERT INTO blog_posts (
        title, slug, excerpt, content, category, tags,
        featured_image, status, author_id, published_at,
        seo_title, seo_description, seo_keywords
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `, [
      data.title,
      data.slug,
      data.excerpt,
      data.content,
      data.category,
      data.tags || [],
      data.featured_image || null,
      data.status,
      authorId,
      data.status === 'published' ? new Date() : null,
      data.seo_title || data.title,
      data.seo_description || data.excerpt,
      data.seo_keywords || ''
    ])

    return NextResponse.json({
      success: true,
      post: result.rows[0]
    })
  } catch (error) {
    console.error('Failed to create blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}
