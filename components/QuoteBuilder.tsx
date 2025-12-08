'use client'

import { useState } from 'react'
import { FaMinus, FaTrash, FaCalculator, FaEnvelope, FaDownload } from 'react-icons/fa'

interface QuoteItem {
  id: string
  service: string
  description: string
  quantity: number
  price: number
}

export default function QuoteBuilder() {
  const [items, setItems] = useState<QuoteItem[]>([])
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    company: ''
  })

  const services = [
    { name: 'Website Development', price: 2500 },
    { name: 'Mobile App Development', price: 5000 },
    { name: 'UI/UX Design', price: 1500 },
    { name: 'SEO Optimization', price: 800 },
    { name: 'Digital Marketing', price: 1200 },
    { name: 'Maintenance (Monthly)', price: 500 }
  ]

  const addItem = (service: string, price: number) => {
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      service,
      description: '',
      quantity: 1,
      price
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const updateItem = (id: string, field: keyof QuoteItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.18 // 18% tax
  const total = subtotal + tax

  const generatePDF = async () => {
    // In production, use a library like jsPDF or react-pdf
    alert('PDF generation would happen here')
  }

  const sendQuote = async () => {
    const response = await fetch('/api/quotes/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientInfo, items, total })
    })
    
    if (response.ok) {
      alert('Quote sent successfully!')
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Quote Builder</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Services Selection */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Available Services</h2>
          <div className="space-y-2">
            {services.map((service) => (
              <button
                key={service.name}
                onClick={() => addItem(service.name, service.price)}
                className="w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-left flex justify-between items-center"
              >
                <span className="font-medium">{service.name}</span>
                <span className="text-blue-600">${service.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quote Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Client Info */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Client Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Client Name"
                value={clientInfo.name}
                onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                className="p-3 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Company (Optional)"
                value={clientInfo.company}
                onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                className="p-3 border rounded-lg md:col-span-2"
              />
            </div>
          </div>

          {/* Quote Items */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Quote Items</h2>
            
            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Add services from the left to build your quote
              </p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{item.service}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaMinus />
                      </button>
                    </div>
                    
                    <textarea
                      placeholder="Description (optional)"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full p-2 border rounded mb-2"
                      rows={2}
                    />
                    
                    <div className="flex gap-4 items-center">
                      <div className="flex items-center gap-2">
                        <label className="text-sm">Qty:</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                          className="w-20 p-2 border rounded"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <label className="text-sm">Price:</label>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value))}
                          className="w-32 p-2 border rounded"
                        />
                      </div>
                      
                      <div className="ml-auto font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {items.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={generatePDF}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
                >
                  <FaDownload />
                  Download PDF
                </button>
                <button
                  onClick={sendQuote}
                  disabled={!clientInfo.email}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <FaEnvelope />
                  Send Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
