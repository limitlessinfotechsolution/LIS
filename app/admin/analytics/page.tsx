'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface AnalyticsData {
  inquiries: {
    total: number
    byStatus: { [key: string]: number }
    byService: { [key: string]: number }
    trend: { date: string; count: number }[]
  }
  newsletter: {
    total: number
    active: number
    growth: { date: string; count: number }[]
  }
  blog: {
    totalPosts: number
    totalViews: number
    topPosts: { title: string; views: number; slug: string }[]
  }
  traffic: {
    pageViews: number
    uniqueVisitors: number
    bounceRate: number
    avgSessionDuration: number
  }
}

export default function AnalyticsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
      return
    }

    fetchAnalytics()
  }, [router, timeRange])

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !analytics) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    )
  }

  // Chart configurations
  const inquiryTrendData = {
    labels: analytics.inquiries.trend.map(d => d.date),
    datasets: [
      {
        label: 'Inquiries',
        data: analytics.inquiries.trend.map(d => d.count),
        borderColor: 'rgb(42, 82, 190)',
        backgroundColor: 'rgba(42, 82, 190, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const inquiryStatusData = {
    labels: Object.keys(analytics.inquiries.byStatus),
    datasets: [
      {
        data: Object.values(analytics.inquiries.byStatus),
        backgroundColor: [
          'rgba(249, 115, 22, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(156, 163, 175, 0.8)'
        ],
        borderWidth: 0
      }
    ]
  }

  const serviceData = {
    labels: Object.keys(analytics.inquiries.byService),
    datasets: [
      {
        label: 'Inquiries by Service',
        data: Object.values(analytics.inquiries.byService),
        backgroundColor: 'rgba(42, 82, 190, 0.8)',
        borderColor: 'rgb(42, 82, 190)',
        borderWidth: 1
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Analytics Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Track performance and insights
              </p>
            </div>
            <div className="flex gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Inquiries</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.inquiries.total}
                </p>
                <p className="text-sm text-green-600 mt-1">+12% from last period</p>
              </div>
              <span className="material-symbols-outlined text-4xl text-blue-600">
                mail
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Newsletter Subscribers</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.newsletter.total}
                </p>
                <p className="text-sm text-green-600 mt-1">{analytics.newsletter.active} active</p>
              </div>
              <span className="material-symbols-outlined text-4xl text-green-600">
                group
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Blog Posts</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.blog.totalPosts}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {analytics.blog.totalViews} views
                </p>
              </div>
              <span className="material-symbols-outlined text-4xl text-purple-600">
                article
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bounce Rate</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {analytics.traffic.bounceRate}%
                </p>
                <p className="text-sm text-green-600 mt-1">-5% improvement</p>
              </div>
              <span className="material-symbols-outlined text-4xl text-orange-600">
                trending_down
              </span>
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Inquiry Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Inquiry Trend
            </h3>
            <div className="h-64">
              <Line data={inquiryTrendData} options={chartOptions} />
            </div>
          </div>

          {/* Inquiry Status */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Inquiry Status Distribution
            </h3>
            <div className="h-64">
              <Doughnut data={inquiryStatusData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Services */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Inquiries by Service
            </h3>
            <div className="h-64">
              <Bar data={serviceData} options={chartOptions} />
            </div>
          </div>

          {/* Top Blog Posts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Blog Posts
            </h3>
            <div className="space-y-3">
              {analytics.blog.topPosts.map((post, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {post.title}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View post →
                    </Link>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {post.views}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Traffic Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.traffic.pageViews.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Page Views</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.traffic.uniqueVisitors.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Unique Visitors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.traffic.bounceRate}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Bounce Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {Math.floor(analytics.traffic.avgSessionDuration / 60)}m {analytics.traffic.avgSessionDuration % 60}s
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Avg. Session</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
