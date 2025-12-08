'use client'

import { useState } from 'react'
import { FaShieldAlt, FaMobileAlt, FaEnvelope, FaKey, FaQrcode } from 'react-icons/fa'

interface TwoFactorMethod {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

export default function TwoFactorSetup() {
  const [step, setStep] = useState<'select' | 'setup' | 'verify' | 'complete'>('select')
  const [method, setMethod] = useState<string>('')
  const [code, setCode] = useState('')
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [_qrCode, setQrCode] = useState('')

  const methods: TwoFactorMethod[] = [
    {
      id: 'totp',
      name: 'Authenticator App',
      icon: FaMobileAlt,
      description: 'Use Google Authenticator, Authy, or similar apps'
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: FaMobileAlt,
      description: 'Receive codes via text message'
    },
    {
      id: 'email',
      name: 'Email',
      icon: FaEnvelope,
      description: 'Receive codes via email'
    }
  ]

  const handleMethodSelect = async (methodId: string) => {
    setMethod(methodId)
    setStep('setup')

    if (methodId === 'totp') {
      // Generate QR code
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'totp' })
      })
      const data = await response.json()
      setQrCode(data.qrCode)
      setBackupCodes(data.backupCodes)
    }
  }

  const handleVerify = async () => {
    const response = await fetch('/api/auth/2fa/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method, code })
    })

    if (response.ok) {
      setStep('complete')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <FaShieldAlt className="text-5xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Two-Factor Authentication</h2>
        <p className="text-gray-600">Add an extra layer of security to your account</p>
      </div>

      {/* Select Method */}
      {step === 'select' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Choose Your Method</h3>
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => handleMethodSelect(m.id)}
              className="w-full p-6 border-2 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left flex items-start gap-4"
            >
              <m.icon className="text-3xl text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">{m.name}</h4>
                <p className="text-gray-600">{m.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Setup TOTP */}
      {step === 'setup' && method === 'totp' && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Setup Authenticator App</h3>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="mb-4">1. Install an authenticator app on your phone</p>
            <p className="mb-4">2. Scan this QR code with your app:</p>
            <div className="bg-white p-4 inline-block rounded-lg">
              <FaQrcode className="text-9xl text-gray-400" />
              {/* In production, display actual QR code */}
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Enter the 6-digit code from your app
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full p-3 border rounded-lg text-center text-2xl tracking-widest"
              placeholder="000000"
              maxLength={6}
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={code.length !== 6}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Verify & Enable
          </button>
        </div>
      )}

      {/* Setup SMS/Email */}
      {step === 'setup' && (method === 'sms' || method === 'email') && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">
            Verify Your {method === 'sms' ? 'Phone Number' : 'Email'}
          </h3>
          
          <p className="text-gray-600">
            We&apos;ve sent a verification code to your {method === 'sms' ? 'phone' : 'email'}.
          </p>

          <div>
            <label className="block mb-2 font-medium">
              Enter the 6-digit code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full p-3 border rounded-lg text-center text-2xl tracking-widest"
              placeholder="000000"
              maxLength={6}
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={code.length !== 6}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Verify & Enable
          </button>
        </div>
      )}

      {/* Complete */}
      {step === 'complete' && (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <FaShieldAlt className="text-4xl text-green-600" />
          </div>
          
          <h3 className="text-2xl font-bold">2FA Enabled Successfully!</h3>
          <p className="text-gray-600">Your account is now more secure</p>

          {backupCodes.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-left">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FaKey className="text-yellow-600" />
                Save Your Backup Codes
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Store these codes in a safe place. You can use them to access your account if you lose your device.
              </p>
              <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                {backupCodes.map((code, i) => (
                  <div key={i} className="bg-white p-2 rounded">
                    {code}
                  </div>
                ))}
              </div>
              <button className="mt-4 text-blue-600 hover:underline text-sm">
                Download Backup Codes
              </button>
            </div>
          )}

          <button
            onClick={() => window.location.href = '/portal/settings'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Settings
          </button>
        </div>
      )}
    </div>
  )
}
