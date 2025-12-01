'use client'
import { motion } from 'framer-motion'
import { FaCheck } from 'react-icons/fa'

export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$999',
      period: '/month',
      description: 'Perfect for small businesses',
      features: [
        'Custom Website Design',
        'Responsive Mobile Design',
        'Basic SEO Optimization',
        'Contact Form Integration',
        '3 Months Support',
        'SSL Certificate',
        'Basic Analytics'
      ],
      popular: false,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Professional',
      price: '$2,499',
      period: '/month',
      description: 'Most popular for growing companies',
      features: [
        'Everything in Starter',
        'Advanced Custom Features',
        'E-commerce Integration',
        'Advanced SEO & Marketing',
        '6 Months Support',
        'Performance Optimization',
        'Advanced Analytics',
        'Priority Support',
        'Monthly Reports'
      ],
      popular: true,
      color: 'from-[#2A52BE] to-[#F97316]'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large-scale operations',
      features: [
        'Everything in Professional',
        'Custom Enterprise Solutions',
        'Dedicated Account Manager',
        'Advanced Security Features',
        '12 Months Support',
        'Custom Integrations',
        'White-label Solutions',
        '24/7 Priority Support',
        'SLA Guarantee',
        'Training & Onboarding'
      ],
      popular: false,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Transparent Pricing
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
              className={`relative bg-white dark:bg-gray-800 rounded-lg p-6 border-2 transition-all ${
                plan.popular
                  ? 'border-[#2A52BE] dark:border-[#F97316] shadow-md'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>
                
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 mb-1.5 text-sm">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
                {plan.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <FaCheck className="text-green-500 mt-0.5 flex-shrink-0 text-xs" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="/contact"
                className={`block w-full py-2.5 rounded-lg font-medium text-center text-sm transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white hover:shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            All plans include free consultation and project planning
          </p>
          <a
            href="/contact"
            className="text-sm text-[#2A52BE] dark:text-[#F97316] font-medium hover:underline"
          >
            Need a custom solution? Contact us →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
