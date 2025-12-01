'use client'

import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa'

interface OAuthButtonsProps {
  redirectTo?: string
}

export default function OAuthButtons({ redirectTo = '/portal' }: OAuthButtonsProps) {
  const providers = [
    {
      id: 'google',
      name: 'Google',
      icon: FaGoogle,
      color: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: FaGithub,
      color: 'bg-gray-900 hover:bg-gray-800 text-white'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: FaLinkedin,
      color: 'bg-[#0077B5] hover:bg-[#006399] text-white'
    }
  ]

  const handleOAuthLogin = (provider: string) => {
    window.location.href = `/api/auth/${provider}?redirect=${encodeURIComponent(redirectTo)}`
  }

  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <button
          key={provider.id}
          onClick={() => handleOAuthLogin(provider.id)}
          className={`w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${provider.color}`}
        >
          <provider.icon className="text-lg" />
          Continue with {provider.name}
        </button>
      ))}
    </div>
  )
}
