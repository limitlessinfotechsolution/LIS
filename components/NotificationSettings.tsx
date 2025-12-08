'use client'

import { useState, useEffect } from 'react'
import { FaCheck, FaTimes, FaEnvelope, FaBell, FaMobile, FaDesktop } from 'react-icons/fa'
import { requestNotificationPermission, subscribeToPush } from '@/lib/pushNotifications'

interface NotificationPreferences {
  email: {
    marketing: boolean
    updates: boolean
    security: boolean
  }
  push: {
    enabled: boolean
    marketing: boolean
    updates: boolean
    security: boolean
  }
  sms: {
    enabled: boolean
    security: boolean
  }
}

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: {
      marketing: true,
      updates: true,
      security: true
    },
    push: {
      enabled: false,
      marketing: false,
      updates: true,
      security: true
    },
    sms: {
      enabled: false,
      security: true
    }
  })
  const [pushSupported, setPushSupported] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setPushSupported('Notification' in window && 'serviceWorker' in navigator)
    loadPreferences()
  }, [])

  const loadPreferences = async () => {
    try {
      const response = await fetch('/api/notifications/preferences')
      const data = await response.json()
      setPreferences(data)
    } catch (error) {
      console.error('Failed to load preferences:', error)
    }
  }

  const handleEnablePush = async () => {
    try {
      const permission = await requestNotificationPermission()
      
      if (permission === 'granted') {
        const subscription = await subscribeToPush()
        
        if (subscription) {
          // Save subscription to server
          await fetch('/api/notifications/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subscription })
          })
          
          setPreferences({
            ...preferences,
            push: { ...preferences.push, enabled: true }
          })
        }
      }
    } catch (error) {
      console.error('Failed to enable push notifications:', error)
      alert('Failed to enable push notifications')
    }
  }

  const savePreferences = async () => {
    setSaving(true)
    try {
      await fetch('/api/notifications/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      })
      alert('Preferences saved successfully!')
    } catch (error) {
      console.error('Failed to save preferences:', error)
      alert('Failed to save preferences')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Notification Settings</h1>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <FaEnvelope className="text-2xl text-blue-600" />
            <h2 className="text-xl font-bold">Email Notifications</h2>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <div>
                <div className="font-medium">Marketing Emails</div>
                <div className="text-sm text-gray-600">Promotions and special offers</div>
              </div>
              <input
                type="checkbox"
                checked={preferences.email.marketing}
                onChange={(e) => setPreferences({
                  ...preferences,
                  email: { ...preferences.email, marketing: e.target.checked }
                })}
                className="w-5 h-5"
              />
            </label>
            
            <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <div>
                <div className="font-medium">Product Updates</div>
                <div className="text-sm text-gray-600">New features and improvements</div>
              </div>
              <input
                type="checkbox"
                checked={preferences.email.updates}
                onChange={(e) => setPreferences({
                  ...preferences,
                  email: { ...preferences.email, updates: e.target.checked }
                })}
                className="w-5 h-5"
              />
            </label>
            
            <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <div>
                <div className="font-medium">Security Alerts</div>
                <div className="text-sm text-gray-600">Important security notifications</div>
              </div>
              <input
                type="checkbox"
                checked={preferences.email.security}
                onChange={(e) => setPreferences({
                  ...preferences,
                  email: { ...preferences.email, security: e.target.checked }
                })}
                className="w-5 h-5"
                disabled
              />
            </label>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <FaDesktop className="text-2xl text-purple-600" />
            <h2 className="text-xl font-bold">Push Notifications</h2>
          </div>

          {!pushSupported ? (
            <div className="text-gray-600">
              Push notifications are not supported in your browser
            </div>
          ) : !preferences.push.enabled ? (
            <button
              onClick={handleEnablePush}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Enable Push Notifications
            </button>
          ) : (
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <div>
                  <div className="font-medium">Marketing</div>
                  <div className="text-sm text-gray-600">Promotions and offers</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.push.marketing}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    push: { ...preferences.push, marketing: e.target.checked }
                  })}
                  className="w-5 h-5"
                />
              </label>
              
              <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <div>
                  <div className="font-medium">Updates</div>
                  <div className="text-sm text-gray-600">New features</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.push.updates}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    push: { ...preferences.push, updates: e.target.checked }
                  })}
                  className="w-5 h-5"
                />
              </label>
              
              <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <div>
                  <div className="font-medium">Security</div>
                  <div className="text-sm text-gray-600">Security alerts</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.push.security}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    push: { ...preferences.push, security: e.target.checked }
                  })}
                  className="w-5 h-5"
                  disabled
                />
              </label>
            </div>
          )}
        </div>

        {/* SMS Notifications */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-3 mb-4">
            <FaMobile className="text-2xl text-green-600" />
            <h2 className="text-xl font-bold">SMS Notifications</h2>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
              <div>
                <div className="font-medium">Enable SMS</div>
                <div className="text-sm text-gray-600">Receive text messages</div>
              </div>
              <input
                type="checkbox"
                checked={preferences.sms.enabled}
                onChange={(e) => setPreferences({
                  ...preferences,
                  sms: { ...preferences.sms, enabled: e.target.checked }
                })}
                className="w-5 h-5"
              />
            </label>
            
            {preferences.sms.enabled && (
              <label className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <div>
                  <div className="font-medium">Security Alerts</div>
                  <div className="text-sm text-gray-600">Critical security notifications</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.sms.security}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    sms: { ...preferences.sms, security: e.target.checked }
                  })}
                  className="w-5 h-5"
                />
              </label>
            )}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={savePreferences}
          disabled={saving}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  )
}
