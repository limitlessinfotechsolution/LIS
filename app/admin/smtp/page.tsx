'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaServer, FaSave, FaCheckCircle, FaPaperPlane, FaExclamationTriangle
} from 'react-icons/fa'
import AdminLayout from '../../../components/AdminLayout'

interface SMTPConfig {
  host: string
  port: number
  secure: boolean
  username: string
  password: string
  fromEmail: string
  fromName: string
}

export default function SMTPConfigPage() {
  const [config, setConfig] = useState<SMTPConfig>({
    host: '',
    port: 587,
    secure: false,
    username: '',
    password: '',
    fromEmail: '',
    fromName: 'Limitless Infotech'
  })
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testEmail, setTestEmail] = useState('')

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/admin/smtp', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      const data = await response.json()
      if (data) {
        setConfig(data)
      }
    } catch (error) {
      console.error('Failed to fetch SMTP config:', error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/smtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(config)
      })

      if (response.ok) {
        alert('SMTP configuration saved successfully!')
      } else {
        alert('Failed to save SMTP configuration')
      }
    } catch (error) {
      alert('An error occurred while saving')
    } finally {
      setLoading(false)
    }
  }

  const handleTest = async () => {
    if (!testEmail) {
      alert('Please enter a test email address')
      return
    }

    setTesting(true)
    try {
      const response = await fetch('/api/admin/smtp/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ email: testEmail })
      })

      if (response.ok) {
        alert('Test email sent successfully!')
      } else {
        alert('Failed to send test email')
      }
    } catch (error) {
      alert('An error occurred while testing')
    } finally {
      setTesting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="p-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            SMTP Configuration
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configure email server settings for sending emails
          </p>
        </div>

        {/* Configuration Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg mb-6">
          <div className="space-y-6">
            {/* Server Settings */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaServer className="text-[#2A52BE]" />
                Server Settings
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Host */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    value={config.host}
                    onChange={(e) => setConfig({ ...config, host: e.target.value })}
                    placeholder="smtp.gmail.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#2A52BE] focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>

                {/* Port */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Port
                  </label>
                  <input
                    type="number"
                    value={config.port}
                    onChange={(e) => setConfig({ ...config, port: parseInt(e.target.value) })}
                    placeholder="587"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#2A52BE] focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>
              </div>

              {/* Secure Connection */}
              <div className="mt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.secure}
                    onChange={(e) => setConfig({ ...config, secure: e.target.checked })}
                    className="w-5 h-5 text-[#2A52BE] rounded focus:ring-[#2A52BE]"
                  />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Use Secure Connection (TLS/SSL)
                  </span>
                </label>
              </div>
            </div>

            {/* Authentication */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Authentication
              </h2>
              
              <div className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Username / Email
                  </label>
                  <input
                    type="text"
                    value={config.username}
                    onChange={(e) => setConfig({ ...config, username: e.target.value })}
                    placeholder="your-email@gmail.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#2A52BE] focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Password / App Password
                  </label>
                  <input
                    type="password"
                    value={config.password}
                    onChange={(e) => setConfig({ ...config, password: e.target.value })}
                    placeholder="••••••••••••••••"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#2A52BE] focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    For Gmail, use an App Password instead of your regular password
                  </p>
                </div>
              </div>
            </div>

            {/* Sender Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Sender Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* From Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    From Email
                  </label>
                  <input
                    type="email"
                    value={config.fromEmail}
                    onChange={(e) => setConfig({ ...config, fromEmail: e.target.value })}
                    placeholder="noreply@limitlessinfotech.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#2A52BE] focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>

                {/* From Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    From Name
                  </label>
                  <input
                    type="text"
                    value={config.fromName}
                    onChange={(e) => setConfig({ ...config, fromName: e.target.value })}
                    placeholder="Limitless Infotech"
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#2A52BE] focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
              >
                <FaSave />
                {loading ? 'Saving...' : 'Save Configuration'}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Test Email */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <FaPaperPlane className="text-[#2A52BE]" />
            Test Email Configuration
          </h2>
          
          <div className="flex gap-4">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Enter test email address"
              className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#2A52BE] focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTest}
              disabled={testing}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {testing ? 'Sending...' : 'Send Test Email'}
            </motion.button>
          </div>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300 flex items-start gap-2">
              <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
              <span>
                Make sure to save your configuration before testing. The test email will be sent using the current settings.
              </span>
            </p>
          </div>
        </div>

        {/* Common SMTP Providers */}
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">
            Common SMTP Providers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300">Gmail</p>
              <p className="text-gray-600 dark:text-gray-400">Host: smtp.gmail.com</p>
              <p className="text-gray-600 dark:text-gray-400">Port: 587 (TLS) or 465 (SSL)</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300">SendGrid</p>
              <p className="text-gray-600 dark:text-gray-400">Host: smtp.sendgrid.net</p>
              <p className="text-gray-600 dark:text-gray-400">Port: 587</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300">Mailgun</p>
              <p className="text-gray-600 dark:text-gray-400">Host: smtp.mailgun.org</p>
              <p className="text-gray-600 dark:text-gray-400">Port: 587</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300">Outlook</p>
              <p className="text-gray-600 dark:text-gray-400">Host: smtp-mail.outlook.com</p>
              <p className="text-gray-600 dark:text-gray-400">Port: 587</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
