'use client'
import { motion } from 'framer-motion'
import { FaFileContract } from 'react-icons/fa'

export default function Terms() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: [
        'By accessing and using this website, you accept and agree to be bound by these Terms of Service',
        'If you do not agree to these terms, please do not use our website or services',
        'We reserve the right to modify these terms at any time',
        'Continued use after changes constitutes acceptance of modified terms'
      ]
    },
    {
      title: '2. Services Description',
      content: [
        'Limitless Infotech provides IT consulting, web development, mobile app development, and related services',
        'Service details, pricing, and timelines are provided in individual project agreements',
        'We reserve the right to modify or discontinue services with reasonable notice',
        'Service availability may vary based on technical limitations or maintenance'
      ]
    },
    {
      title: '3. User Responsibilities',
      content: [
        'You must provide accurate and complete information when using our services',
        'You are responsible for maintaining the confidentiality of your account credentials',
        'You agree not to use our services for any unlawful or prohibited purposes',
        'You must not attempt to gain unauthorized access to our systems or networks',
        'You agree to comply with all applicable laws and regulations'
      ]
    },
    {
      title: '4. Intellectual Property',
      content: [
        'All content on this website is owned by Limitless Infotech or licensed to us',
        'You may not copy, reproduce, or distribute our content without written permission',
        'Client projects: Ownership terms are specified in individual project agreements',
        'Our logos, trademarks, and brand materials are protected by intellectual property laws',
        'We respect intellectual property rights and expect users to do the same'
      ]
    },
    {
      title: '5. Payment Terms',
      content: [
        'Payment terms are specified in individual project agreements or invoices',
        'Prices are subject to change with reasonable notice',
        'Late payments may incur additional fees as specified in agreements',
        'Refund policies are outlined in project-specific contracts',
        'All payments are processed securely through authorized payment gateways'
      ]
    },
    {
      title: '6. Project Delivery',
      content: [
        'Project timelines are estimates and may vary based on scope changes',
        'Client cooperation and timely feedback are required for project completion',
        'We are not liable for delays caused by client-side issues or third-party services',
        'Acceptance criteria and deliverables are defined in project agreements',
        'Change requests may affect timelines and costs'
      ]
    },
    {
      title: '7. Warranties and Disclaimers',
      content: [
        'Services are provided "as is" without warranties of any kind',
        'We do not guarantee uninterrupted or error-free service',
        'We are not responsible for third-party services or integrations',
        'Client is responsible for testing and accepting deliverables',
        'We disclaim liability for indirect, incidental, or consequential damages'
      ]
    },
    {
      title: '8. Limitation of Liability',
      content: [
        'Our total liability shall not exceed the amount paid for the specific service',
        'We are not liable for loss of profits, data, or business opportunities',
        'Force majeure events (natural disasters, pandemics, etc.) exempt us from liability',
        'Client must report issues within reasonable timeframes for resolution',
        'Some jurisdictions do not allow liability limitations; terms may vary accordingly'
      ]
    },
    {
      title: '9. Confidentiality',
      content: [
        'We maintain confidentiality of client information and project details',
        'Non-disclosure agreements (NDAs) can be signed upon request',
        'We may showcase completed projects in our portfolio unless otherwise agreed',
        'Client testimonials and case studies require explicit permission',
        'Confidential information must be clearly marked as such'
      ]
    },
    {
      title: '10. Termination',
      content: [
        'Either party may terminate services as per agreement terms',
        'We reserve the right to terminate services for breach of terms',
        'Upon termination, client must pay for work completed to date',
        'We will provide deliverables completed up to termination date',
        'Certain obligations (confidentiality, payment) survive termination'
      ]
    },
    {
      title: '11. Dispute Resolution',
      content: [
        'Disputes should first be resolved through good-faith negotiations',
        'If unresolved, disputes will be subject to binding arbitration',
        'Arbitration will be conducted in accordance with applicable laws',
        'Legal proceedings, if necessary, will be in the jurisdiction of our business location',
        'Each party bears their own legal costs unless otherwise determined'
      ]
    },
    {
      title: '12. Governing Law',
      content: [
        'These terms are governed by the laws of India',
        'Any legal action must be brought in courts of competent jurisdiction',
        'We comply with applicable international laws for global clients',
        'If any provision is found invalid, remaining provisions remain in effect'
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
          <FaFileContract className="text-4xl text-white" />
        </motion.div>

        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Please read these terms carefully before using our services. They govern your use of our website and services.
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
        <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-[#F97316] p-6 rounded-r-2xl mb-8">
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Important:</strong> By using our website and services, you agree to these terms. 
            Please contact us if you have questions or need clarification on any terms.
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
            Questions About Our Terms?
          </h2>
          <p className="text-white/90 mb-6">
            If you have questions about these terms or need clarification, we&apos;re here to help.
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
