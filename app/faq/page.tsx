'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaChevronDown, FaSearch, FaQuestionCircle } from 'react-icons/fa'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      name: 'General',
      icon: '🏢',
      faqs: [
        {
          question: 'What services does Limitless Infotech provide?',
          answer: 'We provide comprehensive IT solutions including custom software development, web and mobile app development, cloud solutions, IT infrastructure, cybersecurity, and digital transformation services. Our team specializes in creating scalable, secure, and innovative solutions tailored to your business needs.'
        },
        {
          question: 'Where is Limitless Infotech located?',
          answer: 'Our headquarters is located in Mumbai, Maharashtra, India. However, we serve clients globally across 18+ countries with our remote-first approach and dedicated support teams.'
        },
        {
          question: 'How long has Limitless Infotech been in business?',
          answer: 'We have been delivering exceptional IT solutions for over 15 years, with 500+ successfully completed projects and a 98% client retention rate.'
        }
      ]
    },
    {
      name: 'Services',
      icon: '⚙️',
      faqs: [
        {
          question: 'What technologies do you work with?',
          answer: 'We work with cutting-edge technologies including React, Next.js, Node.js, Python, AWS, Azure, Docker, Kubernetes, MongoDB, PostgreSQL, and many more. Our team stays updated with the latest industry trends and technologies.'
        },
        {
          question: 'Do you provide custom software development?',
          answer: 'Yes! Custom software development is one of our core services. We build tailored solutions from scratch based on your specific business requirements, ensuring scalability, security, and optimal performance.'
        },
        {
          question: 'Can you help with cloud migration?',
          answer: 'Absolutely! We specialize in cloud migration services for AWS, Azure, and Google Cloud Platform. Our team handles everything from planning and migration to optimization and ongoing support.'
        },
        {
          question: 'Do you offer mobile app development?',
          answer: 'Yes, we develop both native (iOS/Android) and cross-platform mobile applications using React Native and Flutter. Our apps are designed for optimal performance and user experience.'
        }
      ]
    },
    {
      name: 'Pricing',
      icon: '💰',
      faqs: [
        {
          question: 'How much do your services cost?',
          answer: 'Our pricing varies based on project scope, complexity, and requirements. We offer three main plans: Starter ($999/month), Professional ($2,499/month), and Enterprise (custom pricing). Contact us for a detailed quote tailored to your needs.'
        },
        {
          question: 'Do you offer fixed-price projects?',
          answer: 'Yes, we offer both fixed-price and time & material pricing models. Fixed-price is ideal for well-defined projects, while time & material works better for evolving requirements.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept bank transfers, credit cards, PayPal, and international wire transfers. Payment terms are typically 50% upfront and 50% upon completion, with milestone-based payments for larger projects.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We stand behind our work with a satisfaction guarantee. If you&apos;re not satisfied with our services, we&apos;ll work to make it right. Refund policies are outlined in our service agreement and vary by project type.'
        }
      ]
    },
    {
      name: 'Process',
      icon: '🔄',
      faqs: [
        {
          question: 'What is your development process?',
          answer: 'We follow an Agile methodology with four main phases: Discovery (understanding requirements), Design (creating architecture and UI/UX), Development (building the solution), and Launch (deployment and support). We maintain transparent communication throughout.'
        },
        {
          question: 'How long does a typical project take?',
          answer: 'Project timelines vary based on complexity. A simple website takes 2-4 weeks, a mobile app 2-3 months, and enterprise software 3-6 months. We provide detailed timelines during the planning phase.'
        },
        {
          question: 'Will I have access to a project portal?',
          answer: 'Yes! All clients get access to our exclusive client portal where you can track project progress, view documentation, communicate with the team, and monitor time logs in real-time.'
        },
        {
          question: 'How do you handle project changes?',
          answer: 'We understand that requirements evolve. Minor changes are accommodated within the scope, while significant changes are documented and quoted separately. Our Agile approach allows for flexibility.'
        }
      ]
    },
    {
      name: 'Support',
      icon: '🛟',
      faqs: [
        {
          question: 'Do you provide post-launch support?',
          answer: 'Yes! All our plans include post-launch support ranging from 3 to 12 months depending on the package. We offer bug fixes, updates, monitoring, and technical assistance.'
        },
        {
          question: 'What are your support hours?',
          answer: 'We provide 24/7 support for Enterprise clients. Professional plan clients get priority support during business hours (9 AM - 6 PM IST), and Starter plan clients receive email support with 24-hour response time.'
        },
        {
          question: 'How can I contact support?',
          answer: 'You can reach us via phone (+91 7710909492), email (Info@limitlessinfotech.com), WhatsApp, or live chat on our website. Enterprise clients also have a dedicated account manager.'
        },
        {
          question: 'Do you offer training for our team?',
          answer: 'Yes, we provide comprehensive training and documentation for all delivered solutions. Enterprise clients receive on-site or virtual training sessions as part of their package.'
        }
      ]
    },
    {
      name: 'Security',
      icon: '🔒',
      faqs: [
        {
          question: 'How do you ensure data security?',
          answer: 'We follow enterprise-grade security protocols including end-to-end encryption, secure coding practices, regular security audits, and compliance with ISO 27001, GDPR, and SOC 2 standards.'
        },
        {
          question: 'Are you GDPR compliant?',
          answer: 'Yes, we are fully GDPR compliant. We implement data protection by design and by default, ensuring all personal data is processed securely and in accordance with GDPR requirements.'
        },
        {
          question: 'Do you sign NDAs?',
          answer: 'Absolutely! We understand the importance of confidentiality and are happy to sign NDAs before discussing your project details. Your intellectual property is protected.'
        }
      ]
    }
  ]

  const allFAQs = categories.flatMap((cat, catIdx) =>
    cat.faqs.map((faq, faqIdx) => ({
      ...faq,
      category: cat.name,
      icon: cat.icon,
      globalIndex: catIdx * 100 + faqIdx
    }))
  )

  const filteredFAQs = searchQuery
    ? allFAQs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allFAQs

  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-full mb-6"
        >
          <FaQuestionCircle className="text-4xl text-white" />
        </motion.div>

        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Find answers to common questions about our services, pricing, and process
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto mb-12"
      >
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-[#2A52BE] focus:outline-none transition-colors bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>
      </motion.div>

      {/* Category Tabs */}
      {!searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl font-semibold hover:border-[#2A52BE] transition-colors"
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* FAQ List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredFAQs.map((faq, idx) => (
          <motion.div
            key={faq.globalIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === faq.globalIndex ? null : faq.globalIndex)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-start gap-4 flex-1">
                <span className="text-2xl flex-shrink-0">{faq.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                    {faq.question}
                  </h3>
                  {searchQuery && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {faq.category}
                    </span>
                  )}
                </div>
              </div>
              <motion.div
                animate={{ rotate: openIndex === faq.globalIndex ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown className="text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === faq.globalIndex && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 pl-20">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No questions found matching &quot;{searchQuery}&quot;
          </p>
        </motion.div>
      )}

      {/* Still Have Questions CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-3xl p-12"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Still Have Questions?
        </h2>
        <p className="text-white/90 mb-8 text-lg">
          Our team is here to help. Get in touch and we&apos;ll respond within 24 hours.
        </p>
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-10 py-4 bg-white text-[#2A52BE] rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-shadow"
        >
          Contact Us
        </motion.a>
      </motion.div>
    </div>
  )
}
