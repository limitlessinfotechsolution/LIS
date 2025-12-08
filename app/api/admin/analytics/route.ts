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

    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '30d'

    // Calculate date range
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Fetch inquiry analytics
    const inquiryStats = await query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE created_at >= $1) as recent
      FROM inquiries
    `, [startDate])

    const inquiryByStatus = await query(`
      SELECT status, COUNT(*) as count
      FROM inquiries
      WHERE created_at >= $1
      GROUP BY status
    `)

    const inquiryByService = await query(`
      SELECT service, COUNT(*) as count
      FROM inquiries
      WHERE created_at >= $1
      GROUP BY service
      ORDER BY count DESC
      LIMIT 5
    `, [startDate])

    const inquiryTrend = await query(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count
      FROM inquiries
      WHERE created_at >= $1
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `, [startDate])

    // Fetch newsletter analytics
    const newsletterStats = await query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'active') as active
      FROM newsletter_subscribers
    `)

    const newsletterGrowth = await query(`
      SELECT 
        DATE(subscribed_at) as date,
        COUNT(*) as count
      FROM newsletter_subscribers
      WHERE subscribed_at >= $1
      GROUP BY DATE(subscribed_at)
      ORDER BY date ASC
    `, [startDate])

    // Fetch blog analytics
    const blogStats = await query(`
      SELECT 
        COUNT(*) as total_posts,
        COALESCE(SUM(views), 0) as total_views
      FROM blog_posts
      WHERE status = 'published'
    `)

    const topPosts = await query(`
      SELECT title, slug, views
      FROM blog_posts
      WHERE status = 'published'
      ORDER BY views DESC
      LIMIT 5
    `)

    // Mock traffic data (integrate with Google Analytics in production)
    const trafficData = {
      pageViews: 12543,
      uniqueVisitors: 8234,
      bounceRate: 42,
      avgSessionDuration: 185 // seconds
    }

    // Format response
    const analytics = {
      inquiries: {
        total: parseInt(inquiryStats.rows[0]?.total || 0),
        byStatus: inquiryByStatus.rows.reduce((acc: Record<string, number>, row: { status: string; count: string }) => {
          acc[row.status] = parseInt(row.count)
          return acc
        }, {}),
        byService: inquiryByService.rows.reduce((acc: Record<string, number>, row: { service: string; count: string }) => {
          acc[row.service] = parseInt(row.count)
          return acc
        }, {}),
        trend: inquiryTrend.rows.map((row: { date: string; count: string }) => ({
          date: new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          count: parseInt(row.count)
        }))
      },
      newsletter: {
        total: parseInt(newsletterStats.rows[0]?.total || 0),
        active: parseInt(newsletterStats.rows[0]?.active || 0),
        growth: newsletterGrowth.rows.map((row: { date: string; count: string }) => ({
          date: new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          count: parseInt(row.count)
        }))
      },
      blog: {
        totalPosts: parseInt(blogStats.rows[0]?.total_posts || 0),
        totalViews: parseInt(blogStats.rows[0]?.total_views || 0),
        topPosts: topPosts.rows.map((row: { title: string; slug: string; views: string }) => ({
          title: row.title,
          slug: row.slug,
          views: parseInt(String(row.views || '0'))
        }))
      },
      traffic: trafficData
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Failed to fetch analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
