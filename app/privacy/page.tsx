'use client'
import { motion } from 'framer-motion'
import { FaShieldAlt } from 'react-icons/fa'

export default function Privacy() {
  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        'Personal information (name, email, phone number) when you contact us or subscribe to our newsletter',
        'Usage data including IP address, browser type, and pages visited',
        'Cookies and similar tracking technologies for analytics and user experience',
        'Information you provide when requesting quotes or services'
      ]
    },
    {
      title: '2. How We Use Your Information',
      content: [
        'To respond to your inquiries and provide requested services',
        'To send newsletters and marketing communications (with your consent)',
        'To improve our website and services based on usage patterns',
        'To comply with legal obligations and protect our rights',
        'To analyze website traffic and user behavior through Google Analytics'
      ]
    },
    {
      title: '3. Information Sharing',
      content: [
        'We do not sell, trade, or rent your personal information to third parties',
        'We may share data with trusted service providers (e.g., SendGrid for emails)',
        'We may disclose information when required by law or to protect our rights',
        'Anonymous, aggregated data may be shared for analytics purposes'
      ]
    },
    {
      title: '4. Data Security',
      content: [
        'We implement industry-standard security measures to protect your data',
        'SSL encryption for all data transmission',
        'Regular security audits and updates',
        'Limited access to personal information by authorized personnel only',
        'However, no method of transmission over the internet is 100% secure'
      ]
    },
    {
      title: '5. Cookies and Tracking',
      content: [
        'We use cookies to enhance user experience and analyze website traffic',
        'Google Analytics cookies track anonymous usage data',
        'You can disable cookies in your browser settings',
        'Some features may not function properly without cookies'
      ]
    },
    {
      title: '6. Your Rights',
      content: [
        'Access: Request a copy of your personal data',
        'Correction: Request correction of inaccurate data',
        'Deletion: Request deletion of your personal data',
        'Opt-out: Unsubscribe from marketing communications at any time',
        'Contact us at Info@limitlessinfotech.com to exercise these rights'
      ]
    },
    {
      title: '7. Third-Party Links',
      content: [
        'Our website may contain links to third-party websites',
        'We are not responsible for the privacy practices of these sites',
        'We encourage you to review their privacy policies',
        'Clicking external links is at your own risk'
      ]
    },
    {
      title: '8. Children\'s Privacy',
      content: [
        'Our services are not directed to children under 13',
        'We do not knowingly collect data from children',
        'If you believe we have collected data from a child, contact us immediately',
        'We will promptly delete such information'
      ]
    },
    {
      title: '9. International Data Transfers',
      content: [
        'Your data may be transferred and stored in different countries',
        'We ensure appropriate safeguards are in place for international transfers',
        'By using our services, you consent to such transfers',
        'We comply with applicable data protection laws'
      ]
    },
    {
      title: '10. Changes to This Policy',
      content: [
        'We may update this privacy policy from time to time',
        'Changes will be posted on this page with an updated date',
        'Continued use of our services constitutes acceptance of changes',
        'We encourage you to review this policy periodically'
      ]
    }
  ]

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
          <FaShieldAlt className="text-4xl text-white" />
        </motion.div>

        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
          Last Updated: November 27, 2025
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-[#2A52BE] p-6 rounded-r-2xl mb-8">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Summary:</strong> We collect minimal personal information necessary to provide our services. 
            We never sell your data. You have full control over your information and can request deletion at any time.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                    <span className="text-[#F97316] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Questions About Our Privacy Policy?
          </h2>
          <p className="text-white/90 mb-6">
            If you have any questions or concerns about how we handle your data, please contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-white">
            <div>
              <strong>Email:</strong> Info@limitlessinfotech.com
            </div>
            <div>
              <strong>Phone:</strong> +91 7710909492
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
