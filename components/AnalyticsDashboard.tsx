'use client'

import { useState, useEffect } from 'react'
import { FaUsers, FaEye, FaClock, FaChartLine, FaGlobe, FaMobile, FaDesktop } from 'react-icons/fa'

interface AnalyticsData {
  visitors: { total: number; change: number }
  pageViews: { total: number; change: number }
  avgDuration: { value: string; change: number }
  bounceRate: { value: number; change: number }
  topPages: Array<{ path: string; views: number }>
  devices: { desktop: number; mobile: number; tablet: number }
  countries: Array<{ name: string; visitors: number }>
  realtimeUsers: number
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState('7d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/analytics/dashboard?range=${timeRange}`)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Users */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
          <span className="text-lg">Real-time Users</span>
        </div>
        <div className="text-4xl font-bold mt-2">{data.realtimeUsers}</div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <MetricCard
          icon={FaUsers}
          title="Total Visitors"
          value={data.visitors.total.toLocaleString()}
          change={data.visitors.change}
          color="blue"
        />
        <MetricCard
          icon={FaEye}
          title="Page Views"
          value={data.pageViews.total.toLocaleString()}
          change={data.pageViews.change}
          color="purple"
        />
        <MetricCard
          icon={FaClock}
          title="Avg. Duration"
          value={data.avgDuration.value}
          change={data.avgDuration.change}
          color="green"
        />
        <MetricCard
          icon={FaChartLine}
          title="Bounce Rate"
          value={`${data.bounceRate.value}%`}
          change={data.bounceRate.change}
          color="orange"
          inverse
        />
      </div>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Top Pages</h3>
          <div className="space-y-3">
            {data.topPages.map((page, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-gray-600 truncate flex-1">{page.path}</span>
                <span className="font-semibold ml-4">{page.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Devices</h3>
          <div className="space-y-4">
            <DeviceBar
              icon={FaDesktop}
              label="Desktop"
              value={data.devices.desktop}
              total={data.devices.desktop + data.devices.mobile + data.devices.tablet}
              color="blue"
            />
            <DeviceBar
              icon={FaMobile}
              label="Mobile"
              value={data.devices.mobile}
              total={data.devices.desktop + data.devices.mobile + data.devices.tablet}
              color="green"
            />
            <DeviceBar
              icon={FaMobile}
              label="Tablet"
              value={data.devices.tablet}
              total={data.devices.desktop + data.devices.mobile + data.devices.tablet}
              color="purple"
            />
          </div>
        </div>
      </div>

      {/* Countries */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">
          <FaGlobe className="inline mr-2" />
          Top Countries
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {data.countries.map((country, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">{country.name}</span>
              <span className="text-gray-600">{country.visitors.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  value: string
  change: number
  color: 'blue' | 'purple' | 'green' | 'orange'
  inverse?: boolean
}

function MetricCard({ icon: Icon, title, value, change, color, inverse = false }: MetricCardProps) {
  const isPositive = inverse ? change < 0 : change > 0
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600'
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className={`w-12 h-12 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
        <Icon className="text-2xl" />
      </div>
      <div className="text-gray-600 text-sm mb-1">{title}</div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(change)}% vs previous period
      </div>
    </div>
  )
}

interface DeviceBarProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  total: number
  color: 'blue' | 'green' | 'purple'
}

function DeviceBar({ icon: Icon, label, value, total, color }: DeviceBarProps) {
  const percentage = Math.round((value / total) * 100)
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="text-gray-600" />
          <span className="font-medium">{label}</span>
        </div>
        <span className="text-gray-600">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClasses[color as keyof typeof colorClasses]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
