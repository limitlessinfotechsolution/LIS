'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Email {
  id: string
  from: string
  to: string
  subject: string
  body: string
  date: string
  read: boolean
  starred: boolean
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'spam'
  attachments?: { name: string; size: number; url: string }[]
}

export default function WebmailPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [emails, setEmails] = useState<Email[]>([])
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [currentFolder, setCurrentFolder] = useState<'inbox' | 'sent' | 'drafts' | 'trash' | 'spam'>('inbox')
  const [showCompose, setShowCompose] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [composeData, setComposeData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
      return
    }

    fetchEmails()
  }, [router, currentFolder])

  const fetchEmails = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/webmail?folder=${currentFolder}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setEmails(data.emails || [])
      }
    } catch (error) {
      console.error('Failed to fetch emails:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendEmail = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/webmail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(composeData)
      })

      if (response.ok) {
        setShowCompose(false)
        setComposeData({ to: '', cc: '', bcc: '', subject: '', body: '' })
        fetchEmails()
      }
    } catch (error) {
      console.error('Failed to send email:', error)
    }
  }

  const handleDeleteEmail = async (id: string) => {
    if (!confirm('Move to trash?')) return

    try {
      const token = localStorage.getItem('adminToken')
      await fetch(`/api/admin/webmail/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      fetchEmails()
      setSelectedEmail(null)
    } catch (error) {
      console.error('Failed to delete email:', error)
    }
  }

  const handleStarEmail = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken')
      await fetch(`/api/admin/webmail/${id}/star`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      fetchEmails()
    } catch (error) {
      console.error('Failed to star email:', error)
    }
  }

  const filteredEmails = emails.filter(email =>
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.body.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const folderCounts = {
    inbox: emails.filter(e => e.folder === 'inbox').length,
    sent: emails.filter(e => e.folder === 'sent').length,
    drafts: emails.filter(e => e.folder === 'drafts').length,
    trash: emails.filter(e => e.folder === 'trash').length,
    spam: emails.filter(e => e.folder === 'spam').length,
    unread: emails.filter(e => !e.read && e.folder === 'inbox').length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading webmail...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-3xl text-blue-600">
                mail
              </span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Limitless Webmail
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  info@limitlessinfotech.com
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCompose(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                Compose
              </button>
              <Link
                href="/admin/dashboard"
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                ← Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              {/* Folders */}
              <nav className="space-y-1">
                <button
                  onClick={() => setCurrentFolder('inbox')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    currentFolder === 'inbox'
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined">inbox</span>
                    <span className="font-medium">Inbox</span>
                  </div>
                  {folderCounts.unread > 0 && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                      {folderCounts.unread}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setCurrentFolder('sent')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    currentFolder === 'sent'
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined">send</span>
                    <span className="font-medium">Sent</span>
                  </div>
                  <span className="text-sm text-gray-500">{folderCounts.sent}</span>
                </button>

                <button
                  onClick={() => setCurrentFolder('drafts')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    currentFolder === 'drafts'
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined">draft</span>
                    <span className="font-medium">Drafts</span>
                  </div>
                  <span className="text-sm text-gray-500">{folderCounts.drafts}</span>
                </button>

                <button
                  onClick={() => setCurrentFolder('spam')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    currentFolder === 'spam'
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined">report</span>
                    <span className="font-medium">Spam</span>
                  </div>
                  <span className="text-sm text-gray-500">{folderCounts.spam}</span>
                </button>

                <button
                  onClick={() => setCurrentFolder('trash')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    currentFolder === 'trash'
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined">delete</span>
                    <span className="font-medium">Trash</span>
                  </div>
                  <span className="text-sm text-gray-500">{folderCounts.trash}</span>
                </button>
              </nav>

              {/* Storage */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Storage</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">2.5 GB / 15 GB</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '16.67%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Email List */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              {/* Search */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search emails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Email List */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-300px)] overflow-y-auto">
                {filteredEmails.length === 0 ? (
                  <div className="p-12 text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
                      mail
                    </span>
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchTerm ? 'No emails found' : 'No emails in this folder'}
                    </p>
                  </div>
                ) : (
                  filteredEmails.map((email) => (
                    <div
                      key={email.id}
                      onClick={() => setSelectedEmail(email)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        selectedEmail?.id === email.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      } ${!email.read ? 'font-semibold' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStarEmail(email.id)
                          }}
                          className="mt-1"
                        >
                          <span className={`material-symbols-outlined text-sm ${
                            email.starred ? 'text-yellow-500' : 'text-gray-400'
                          }`}>
                            {email.starred ? 'star' : 'star_border'}
                          </span>
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm text-gray-900 dark:text-white truncate">
                              {email.from}
                            </p>
                            <span className="text-xs text-gray-500">
                              {new Date(email.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 dark:text-white truncate mb-1">
                            {email.subject}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                            {email.body.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="col-span-12 lg:col-span-5">
            {selectedEmail ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                {/* Email Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedEmail.subject}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStarEmail(selectedEmail.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        title="Star"
                      >
                        <span className={`material-symbols-outlined ${
                          selectedEmail.starred ? 'text-yellow-500' : 'text-gray-400'
                        }`}>
                          {selectedEmail.starred ? 'star' : 'star_border'}
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteEmail(selectedEmail.id)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-red-600">delete</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">From:</span>
                      <span className="text-sm text-gray-900 dark:text-white">{selectedEmail.from}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">To:</span>
                      <span className="text-sm text-gray-900 dark:text-white">{selectedEmail.to}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Date:</span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {new Date(selectedEmail.date).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email Body */}
                <div className="p-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap text-gray-900 dark:text-white">
                      {selectedEmail.body}
                    </p>
                  </div>

                  {/* Attachments */}
                  {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Attachments ({selectedEmail.attachments.length})
                      </h3>
                      <div className="space-y-2">
                        {selectedEmail.attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
                                attach_file
                              </span>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {attachment.name}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {(attachment.size / 1024).toFixed(2)} KB
                                </p>
                              </div>
                            </div>
                            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                              <span className="material-symbols-outlined text-sm">download</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Reply Actions */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowCompose(true)
                        setComposeData({
                          ...composeData,
                          to: selectedEmail.from,
                          subject: `Re: ${selectedEmail.subject}`
                        })
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">reply</span>
                      Reply
                    </button>
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">forward</span>
                      Forward
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
                <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
                  mail
                </span>
                <p className="text-gray-600 dark:text-gray-400">
                  Select an email to read
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                New Message
              </h2>
              <button
                onClick={() => setShowCompose(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To *
                </label>
                <input
                  type="email"
                  value={composeData.to}
                  onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="recipient@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CC
                </label>
                <input
                  type="email"
                  value={composeData.cc}
                  onChange={(e) => setComposeData({ ...composeData, cc: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="cc@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={composeData.subject}
                  onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Email subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  value={composeData.body}
                  onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Write your message..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setShowCompose(false)}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">send</span>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
