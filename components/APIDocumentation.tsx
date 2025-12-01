'use client'

import { useState } from 'react'
import { FaCode, FaPlay, FaCopy, FaCheck } from 'react-icons/fa'

interface APIEndpoint {
  method: string
  path: string
  description: string
  auth: boolean
  parameters?: Array<{
    name: string
    type: string
    required: boolean
    description: string
  }>
  example: {
    request: string
    response: string
  }
}

export default function APIDocumentation() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null)
  const [copied, setCopied] = useState(false)

  const endpoints: APIEndpoint[] = [
    {
      method: 'POST',
      path: '/api/bookings',
      description: 'Create a new booking',
      auth: false,
      parameters: [
        { name: 'name', type: 'string', required: true, description: 'Customer name' },
        { name: 'email', type: 'string', required: true, description: 'Customer email' },
        { name: 'service', type: 'string', required: true, description: 'Service type' },
        { name: 'date', type: 'string', required: true, description: 'Booking date (YYYY-MM-DD)' },
        { name: 'time', type: 'string', required: true, description: 'Booking time' }
      ],
      example: {
        request: `{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "Web Development",
  "date": "2025-12-15",
  "time": "10:00 AM"
}`,
        response: `{
  "success": true,
  "bookingId": "BOOK-1234567890",
  "message": "Booking confirmed"
}`
      }
    },
    {
      method: 'GET',
      path: '/api/analytics/dashboard',
      description: 'Get analytics dashboard data',
      auth: true,
      parameters: [
        { name: 'range', type: 'string', required: false, description: 'Time range (24h, 7d, 30d, 90d)' }
      ],
      example: {
        request: 'GET /api/analytics/dashboard?range=7d',
        response: `{
  "visitors": { "total": 12543, "change": 15.3 },
  "pageViews": { "total": 45678, "change": 23.1 },
  "avgDuration": { "value": "3m 24s", "change": 8.5 },
  "bounceRate": { "value": 42, "change": -5.2 }
}`
      }
    },
    {
      method: 'POST',
      path: '/api/auth/2fa/setup',
      description: 'Setup two-factor authentication',
      auth: true,
      parameters: [
        { name: 'method', type: 'string', required: true, description: 'Method: totp, sms, or email' }
      ],
      example: {
        request: `{
  "method": "totp"
}`,
        response: `{
  "qrCode": "otpauth://totp/...",
  "backupCodes": ["ABC123", "DEF456", ...]
}`
      }
    },
    {
      method: 'POST',
      path: '/api/push/send',
      description: 'Send push notification',
      auth: true,
      parameters: [
        { name: 'subscription', type: 'object', required: true, description: 'Push subscription' },
        { name: 'payload', type: 'object', required: true, description: 'Notification payload' }
      ],
      example: {
        request: `{
  "subscription": { ... },
  "payload": {
    "title": "New Message",
    "body": "You have a new message"
  }
}`,
        response: `{
  "success": true
}`
      }
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
        <p className="text-gray-600 text-lg">
          Complete reference for our REST API endpoints
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Endpoints List */}
        <div className="md:col-span-1">
          <h2 className="font-bold mb-4">Endpoints</h2>
          <div className="space-y-2">
            {endpoints.map((endpoint, i) => (
              <button
                key={i}
                onClick={() => setSelectedEndpoint(endpoint)}
                className={`w-full p-4 rounded-lg text-left border-2 transition ${
                  selectedEndpoint === endpoint
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    endpoint.method === 'GET' ? 'bg-green-100 text-green-700' :
                    endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                    endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {endpoint.method}
                  </span>
                  {endpoint.auth && (
                    <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-700">
                      Auth
                    </span>
                  )}
                </div>
                <div className="font-mono text-sm">{endpoint.path}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Endpoint Details */}
        <div className="md:col-span-2">
          {!selectedEndpoint ? (
            <div className="bg-gray-50 rounded-lg p-12 text-center text-gray-500">
              <FaCode className="text-5xl mx-auto mb-4 opacity-50" />
              <p>Select an endpoint to view details</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded font-bold ${
                    selectedEndpoint.method === 'GET' ? 'bg-green-100 text-green-700' :
                    selectedEndpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                    selectedEndpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedEndpoint.method}
                  </span>
                  <code className="text-lg font-mono">{selectedEndpoint.path}</code>
                </div>
                <p className="text-gray-600">{selectedEndpoint.description}</p>
              </div>

              {/* Parameters */}
              {selectedEndpoint.parameters && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-bold mb-4">Parameters</h3>
                  <div className="space-y-3">
                    {selectedEndpoint.parameters.map((param, i) => (
                      <div key={i} className="border-l-4 border-blue-600 pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="font-mono font-semibold">{param.name}</code>
                          <span className="text-sm text-gray-600">{param.type}</span>
                          {param.required && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{param.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Example Request */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Example Request</h3>
                  <button
                    onClick={() => copyToClipboard(selectedEndpoint.example.request)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center gap-2"
                  >
                    {copied ? <FaCheck className="text-green-600" /> : <FaCopy />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{selectedEndpoint.example.request}</code>
                </pre>
              </div>

              {/* Example Response */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold mb-4">Example Response</h3>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <code>{selectedEndpoint.example.response}</code>
                </pre>
              </div>

              {/* Try It Out */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <FaPlay className="text-blue-600" />
                  Try It Out
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Test this endpoint directly from your browser console or API client
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Open in API Explorer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
