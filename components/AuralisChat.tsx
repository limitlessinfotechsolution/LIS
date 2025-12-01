'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaComments, FaTimes, FaPaperPlane, FaRobot, FaUser, FaStar, FaLightbulb, FaRocket } from 'react-icons/fa'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  typing?: boolean
}

export default function AuralisChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi! I'm Auralis, your AI-powered assistant from Limitless Infotech. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickReplies = [
    { text: '💼 Tell me about your services', icon: '💼' },
    { text: '💰 I need a quote', icon: '💰' },
    { text: '📞 Contact information', icon: '📞' },
    { text: '🎨 View portfolio', icon: '🎨' }
  ]

  const botResponses: { [key: string]: string } = {
    'services': "🚀 We offer cutting-edge solutions:\n\n• Web Development - Modern, responsive websites\n• Mobile Apps - iOS & Android native apps\n• Cloud Solutions - AWS, Azure, Google Cloud\n• AI Integration - Machine learning & automation\n• Cybersecurity - Protect your digital assets\n\nWhich service interests you most?",
    'quote': "💰 I'd love to help you get a personalized quote!\n\nPlease visit our contact page or:\n📧 Email: Info@limitlessinfotech.com\n📱 Call: +91 7710909492\n\nOur team will respond within 24 hours with a detailed proposal tailored to your needs.",
    'contact': "📞 Here's how to reach us:\n\n📧 Email: Info@limitlessinfotech.com\n📱 Phone: +91 7710909492\n📍 Location: Mumbai, Maharashtra, India\n🌐 Website: limitlessinfotech.com\n\nWe're available Monday-Friday, 9 AM - 6 PM IST. Feel free to reach out anytime!",
    'portfolio': "🎨 Check out our amazing work!\n\nWe've successfully delivered 120+ projects for clients worldwide. Visit our portfolio at /portfolio to see:\n\n• Enterprise Applications\n• E-commerce Platforms\n• Mobile Apps\n• Cloud Solutions\n• AI/ML Projects\n\nWant to discuss your project?",
    'pricing': "💎 Our pricing is flexible and transparent:\n\n• Hourly Rate: Competitive market rates\n• Fixed Price: For well-defined projects\n• Retainer: Ongoing support & maintenance\n• Custom Packages: Tailored to your needs\n\nLet's discuss your budget and requirements!",
    'team': "👥 Meet our expert team!\n\nWe have 50+ talented professionals:\n• Senior Developers\n• UI/UX Designers\n• Cloud Architects\n• AI/ML Engineers\n• Project Managers\n\nVisit /team to learn more about our experts!",
    'default': "🤔 That's a great question! I'm here to help you with:\n\n• Service information\n• Project quotes\n• Technical questions\n• Portfolio showcase\n• Contact details\n\nFor detailed information, please contact our team at Info@limitlessinfotech.com or call +91 7710909492."
  }

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you') || lowerMessage.includes('offer')) {
      return botResponses.services
    } else if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
      return botResponses.pricing
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
      return botResponses.contact
    } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('example')) {
      return botResponses.portfolio
    } else if (lowerMessage.includes('team') || lowerMessage.includes('who') || lowerMessage.includes('people')) {
      return botResponses.team
    }
    
    return botResponses.default
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleQuickReply = (reply: string) => {
    setInputValue(reply)
    setTimeout(() => handleSend(), 100)
  }

  return (
    <>
      {/* Floating Chat Button with Auralis Branding */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 group"
          >
            {/* Animated Glow Effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full blur-xl"
            />
            
            {/* Button */}
            <div className="relative p-5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white rounded-full shadow-2xl">
              <FaComments className="text-2xl" />
              
              {/* Pulse Indicator */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
              </span>
            </div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl whitespace-nowrap shadow-xl"
            >
              Chat with Auralis AI ✨
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Auralis Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-40 w-[400px] h-[650px] flex flex-col overflow-hidden rounded-3xl shadow-2xl border-2 border-purple-200 dark:border-purple-800"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {/* Premium Header with Auralis Branding */}
            <div className="relative p-5 text-white overflow-hidden">
              {/* Animated Background */}
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  backgroundSize: '200% 200%'
                }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Auralis Avatar */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-300 flex items-center justify-center shadow-lg">
                      <FaRobot className="text-2xl text-purple-900" />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
                  </motion.div>
                  
                  <div>
                    <h3 className="font-black text-xl flex items-center gap-2">
                      Auralis AI
                      <motion.span
                        animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                      >
                        ✨
                      </motion.span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-purple-100">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Online • Powered by Limitless AI
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors backdrop-blur-sm"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              {/* Feature Pills */}
              <div className="relative mt-3 flex gap-2">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-1">
                  <FaStar className="text-yellow-300" />
                  AI-Powered
                </div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-1">
                  <FaRocket className="text-cyan-300" />
                  Instant Replies
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'bot'
                      ? 'bg-gradient-to-br from-purple-500 to-cyan-500'
                      : 'bg-gradient-to-br from-gray-400 to-gray-600'
                  }`}>
                    {message.sender === 'bot' ? (
                      <FaRobot className="text-white text-sm" />
                    ) : (
                      <FaUser className="text-white text-sm" />
                    )}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block max-w-[85%] p-3 rounded-2xl shadow-md ${
                      message.sender === 'bot'
                        ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none'
                        : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-tr-none'
                    }`}>
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    <FaRobot className="text-white text-sm" />
                  </div>
                  <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-tl-none shadow-md">
                    <div className="flex gap-1">
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-purple-500 rounded-full"
                      />
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-cyan-500 rounded-full"
                      />
                      <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-purple-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="p-3 bg-white dark:bg-gray-800 border-t border-purple-200 dark:border-purple-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickReplies.map((reply, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickReply(reply.text)}
                      className="text-xs px-3 py-2 bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 hover:from-purple-200 hover:to-cyan-200 dark:hover:from-purple-800/40 dark:hover:to-cyan-800/40 rounded-xl transition-all font-medium text-left border border-purple-200 dark:border-purple-700"
                    >
                      {reply.text}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-purple-200 dark:border-purple-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 text-sm text-gray-800 dark:text-white placeholder-gray-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane />
                </motion.button>
              </div>
              
              {/* Powered By */}
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                  <FaLightbulb className="text-yellow-500" />
                  Powered by Auralis AI • Limitless Infotech
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
