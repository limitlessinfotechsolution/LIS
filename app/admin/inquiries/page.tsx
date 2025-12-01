'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaEnvelope, FaSearch, FaFilter, FaTrash, FaEye,
  FaCheckCircle, FaClock, FaTimesCircle, FaReply
} from 'react-icons/fa'
import AdminLayout from '../../../components/AdminLayout'

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
  status: 'pending' | 'read' | 'replied' | 'archived'
  createdAt: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filteredInquiries, setFilteredInquiries] = useState<Inquiry[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInquiries()
  }, [])

  useEffect(() => {
    filterInquiries()
  }, [searchQuery, statusFilter, inquiries])

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/admin/inquiries', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      const data = await response.json()
      setInquiries(data)
    } catch (error) {
      console.error('Failed to fetch inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterInquiries = () => {
    let filtered = inquiries

    if (statusFilter !== 'all') {
      filtered = filtered.filter(i => i.status === statusFilter)
    }

    if (searchQuery) {
      filtered = filtered.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.company.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredInquiries(filtered)
  }

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    try {
      await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ status })
      })
      fetchInquiries()
    } catch (error) {
      console.error('Failed to update status:', error)
    }
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return

    try {
      await fetch(`/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      })
      fetchInquiries()
    } catch (error) {
      console.error('Failed to delete inquiry:', error)
    }
  }

  const statusColors = {
    pending: 'bg-orange-100 text-orange-600',
    read: 'bg-blue-100 text-blue-600',
    replied: 'bg-green-100 text-green-600',
    archived: 'bg-gray-100 text-gray-600'
  }

  const statusIcons = {
    pending: FaClock,
    read: FaEye,
    replied: FaCheckCircle,
    archived: FaTimesCircle
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Inquiry Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and respond to customer inquiries
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or company..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#2A52BE] focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-[#2A52BE] focus:outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white appearance-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-12 h-12 border-4 border-[#2A52BE] border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading inquiries...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-12 text-center">
              <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No inquiries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Contact Info
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Company
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredInquiries.map((inquiry) => {
                    const StatusIcon = statusIcons[inquiry.status]
                    return (
                      <motion.tr
                        key={inquiry.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">
                              {inquiry.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {inquiry.email}
                            </p>
                            <p className="text-sm text-gray-500">
                              {inquiry.phone}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {inquiry.company || '-'}
                        </td>
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                          {inquiry.service}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusColors[inquiry.status]}`}>
                            <StatusIcon />
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setSelectedInquiry(inquiry)}
                              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                              title="View Details"
                            >
                              <FaEye />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteInquiry(inquiry.id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                              title="Delete"
                            >
                              <FaTrash />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInquiry(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Inquiry Details
                    </h2>
                    <button
                      onClick={() => setSelectedInquiry(null)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <FaTimesCircle className="text-xl text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Contact Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      CONTACT INFORMATION
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-800 dark:text-white">
                        <span className="font-semibold">Name:</span> {selectedInquiry.name}
                      </p>
                      <p className="text-gray-800 dark:text-white">
                        <span className="font-semibold">Email:</span> {selectedInquiry.email}
                      </p>
                      <p className="text-gray-800 dark:text-white">
                        <span className="font-semibold">Phone:</span> {selectedInquiry.phone}
                      </p>
                      {selectedInquiry.company && (
                        <p className="text-gray-800 dark:text-white">
                          <span className="font-semibold">Company:</span> {selectedInquiry.company}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      SERVICE REQUESTED
                    </h3>
                    <p className="text-gray-800 dark:text-white">{selectedInquiry.service}</p>
                  </div>

                  {/* Message */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      MESSAGE
                    </h3>
                    <p className="text-gray-800 dark:text-white whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </p>
                  </div>

                  {/* Status Update */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
                      UPDATE STATUS
                    </h3>
                    <div className="flex gap-2">
                      {(['pending', 'read', 'replied', 'archived'] as const).map((status) => (
                        <motion.button
                          key={status}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            updateStatus(selectedInquiry.id, status)
                            setSelectedInquiry(null)
                          }}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            selectedInquiry.status === status
                              ? statusColors[status]
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {status}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <motion.a
                      href={`mailto:${selectedInquiry.email}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white font-semibold rounded-xl"
                    >
                      <FaReply />
                      Reply via Email
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </AdminLayout>
  )
}
