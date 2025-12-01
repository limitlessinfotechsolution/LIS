'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FaCode, FaLaptopCode, FaMobileAlt, FaCloud, FaShieldAlt, FaRobot, 
  FaDatabase, FaChartLine, FaCogs, FaUsers, FaCheckCircle, FaArrowRight,
  FaServer, FaNetworkWired, FaLock, FaBrain, FaPalette, FaSearch
} from 'react-icons/fa'

export default function Services() {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      id: 1,
      title: 'Custom Software Development',
      icon: FaCode,
      shortDesc: 'Tailored software solutions built to solve your unique business challenges',
      fullDesc: 'We design and develop custom software applications that perfectly align with your business processes, goals, and requirements. Our agile development approach ensures flexibility, transparency, and timely delivery.',
      features: [
        'Enterprise Application Development',
        'Legacy System Modernization',
        'API Development & Integration',
        'Microservices Architecture',
        'Scalable & Maintainable Code',
        'Continuous Support & Maintenance'
      ],
      technologies: ['React', 'Node.js', 'Python', 'Java', '.NET', 'Go'],
      benefits: [
        'Increased operational efficiency',
        'Reduced manual processes',
        'Better data management',
        'Competitive advantage'
      ],
      process: [
        'Requirements Analysis',
        'Architecture Design',
        'Agile Development',
        'Quality Assurance',
        'Deployment & Support'
      ],
      color: 'from-[#2A52BE] to-[#1e3a8a]',
      stats: { projects: '200+', satisfaction: '98%', time: '6-12 weeks' }
    },
    {
      id: 2,
      title: 'Web Application Development',
      icon: FaLaptopCode,
      shortDesc: 'Modern, responsive web applications with exceptional user experience',
      fullDesc: 'Build powerful, scalable web applications using cutting-edge technologies. From progressive web apps to complex enterprise portals, we deliver solutions that engage users and drive business growth.',
      features: [
        'Progressive Web Apps (PWA)',
        'Single Page Applications (SPA)',
        'E-commerce Platforms',
        'Content Management Systems',
        'Real-time Applications',
        'Responsive Design'
      ],
      technologies: ['Next.js', 'React', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind CSS'],
      benefits: [
        'Cross-platform compatibility',
        'Fast loading times',
        'SEO optimization',
        'Enhanced user engagement'
      ],
      process: [
        'UX/UI Design',
        'Frontend Development',
        'Backend Integration',
        'Testing & QA',
        'Launch & Optimization'
      ],
      color: 'from-[#F97316] to-[#ea580c]',
      stats: { projects: '300+', satisfaction: '99%', time: '4-8 weeks' }
    },
    {
      id: 3,
      title: 'Mobile App Development',
      icon: FaMobileAlt,
      shortDesc: 'Native and cross-platform mobile apps for iOS and Android',
      fullDesc: 'Create engaging mobile experiences that users love. Whether you need a native app for maximum performance or a cross-platform solution for faster deployment, we have the expertise to deliver.',
      features: [
        'iOS & Android Development',
        'Cross-Platform Solutions',
        'Native Performance',
        'Offline Functionality',
        'Push Notifications',
        'App Store Optimization'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'AWS Amplify'],
      benefits: [
        'Reach mobile-first audience',
        'Improved customer engagement',
        'Brand visibility',
        'Revenue generation'
      ],
      process: [
        'Concept & Strategy',
        'UI/UX Design',
        'Development',
        'Testing',
        'App Store Submission'
      ],
      color: 'from-[#8b5cf6] to-[#6d28d9]',
      stats: { projects: '150+', satisfaction: '97%', time: '8-16 weeks' }
    },
    {
      id: 4,
      title: 'Cloud Solutions & DevOps',
      icon: FaCloud,
      shortDesc: 'Scalable cloud infrastructure and automated deployment pipelines',
      fullDesc: 'Leverage the power of cloud computing to scale your business. We provide end-to-end cloud solutions including migration, architecture design, and DevOps implementation for continuous delivery.',
      features: [
        'Cloud Migration Services',
        'Infrastructure as Code',
        'CI/CD Pipeline Setup',
        'Container Orchestration',
        'Serverless Architecture',
        'Cloud Cost Optimization'
      ],
      technologies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform'],
      benefits: [
        'Reduced infrastructure costs',
        'Improved scalability',
        'Faster deployment',
        'Enhanced reliability'
      ],
      process: [
        'Cloud Assessment',
        'Architecture Planning',
        'Migration Strategy',
        'Implementation',
        'Monitoring & Optimization'
      ],
      color: 'from-[#06b6d4] to-[#0891b2]',
      stats: { projects: '100+', satisfaction: '96%', time: '4-12 weeks' }
    },
    {
      id: 5,
      title: 'AI & Machine Learning',
      icon: FaRobot,
      shortDesc: 'Intelligent solutions powered by artificial intelligence and ML',
      fullDesc: 'Transform your business with AI-powered solutions. From predictive analytics to natural language processing, we help you harness the power of machine learning to gain insights and automate processes.',
      features: [
        'Predictive Analytics',
        'Natural Language Processing',
        'Computer Vision',
        'Recommendation Systems',
        'Chatbots & Virtual Assistants',
        'ML Model Development'
      ],
      technologies: ['TensorFlow', 'PyTorch', 'Python', 'Scikit-learn', 'OpenAI', 'Hugging Face'],
      benefits: [
        'Data-driven decisions',
        'Process automation',
        'Improved accuracy',
        'Competitive insights'
      ],
      process: [
        'Data Collection',
        'Model Training',
        'Testing & Validation',
        'Deployment',
        'Continuous Learning'
      ],
      color: 'from-[#ec4899] to-[#db2777]',
      stats: { projects: '50+', satisfaction: '95%', time: '8-20 weeks' }
    },
    {
      id: 6,
      title: 'Cybersecurity Services',
      icon: FaShieldAlt,
      shortDesc: 'Comprehensive security solutions to protect your digital assets',
      fullDesc: 'Protect your business from cyber threats with our comprehensive security services. We provide vulnerability assessments, penetration testing, and ongoing security monitoring to keep your systems safe.',
      features: [
        'Security Audits',
        'Penetration Testing',
        'Vulnerability Assessment',
        'Security Compliance',
        'Incident Response',
        '24/7 Security Monitoring'
      ],
      technologies: ['SIEM Tools', 'Firewall Systems', 'Encryption', 'IAM', 'Zero Trust', 'SOC'],
      benefits: [
        'Data protection',
        'Regulatory compliance',
        'Risk mitigation',
        'Business continuity'
      ],
      process: [
        'Security Assessment',
        'Risk Analysis',
        'Implementation',
        'Monitoring',
        'Incident Management'
      ],
      color: 'from-[#ef4444] to-[#dc2626]',
      stats: { projects: '80+', satisfaction: '99%', time: '2-8 weeks' }
    }
  ]

  const currentService = services[activeService]

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-full mb-6 shadow-2xl"
          >
            <FaCogs className="text-3xl md:text-4xl text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
            Comprehensive IT solutions designed to transform your business and drive sustainable growth
          </p>
        </motion.div>

        {/* Service Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {services.map((service, idx) => (
              <motion.button
                key={service.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveService(idx)}
                className={`p-4 md:p-6 rounded-2xl transition-all ${
                  activeService === idx
                    ? 'bg-gradient-to-br from-[#2A52BE] to-[#F97316] text-white shadow-xl'
                    : 'card-base hover:shadow-lg'
                }`}
              >
                <service.icon className={`text-3xl md:text-4xl mx-auto mb-2 md:mb-3 ${
                  activeService === idx ? 'text-white' : 'text-[#2A52BE]'
                }`} />
                <div className={`text-xs md:text-sm font-semibold text-center ${
                  activeService === idx ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {service.title.split(' ')[0]}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Service Detail */}
        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12"
        >
          {/* Left Column */}
          <div className="space-y-6 md:space-y-8">
            <div className="card-base card-lg">
              <div className={`inline-flex p-4 md:p-5 rounded-2xl bg-gradient-to-br ${currentService.color} mb-6`}>
                <currentService.icon className="text-4xl md:text-5xl text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                {currentService.title}
              </h2>
              
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {currentService.fullDesc}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${currentService.color} bg-clip-text text-transparent`}>
                    {currentService.stats.projects}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${currentService.color} bg-clip-text text-transparent`}>
                    {currentService.stats.satisfaction}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${currentService.color} bg-clip-text text-transparent`}>
                    {currentService.stats.time}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Timeline</div>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="card-base card-md">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                <FaDatabase className="text-[#F97316]" />
                Technologies We Use
              </h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {currentService.technologies.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="px-3 md:px-4 py-2 bg-gradient-to-r from-[#2A52BE]/10 to-[#F97316]/10 rounded-xl text-sm md:text-base font-medium text-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 md:space-y-8">
            {/* Features */}
            <div className="card-base card-md">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                Key Features
              </h3>
              <div className="space-y-3 md:space-y-4">
                {currentService.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-3 md:p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className={`card-gradient card-md`}>
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <FaChartLine />
                Business Benefits
              </h3>
              <div className="space-y-3">
                {currentService.benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 text-white"
                  >
                    <FaArrowRight className="flex-shrink-0" />
                    <span className="text-sm md:text-base">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Process */}
            <div className="card-base card-md">
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                <FaCogs className="text-[#2A52BE]" />
                Our Process
              </h3>
              <div className="space-y-3">
                {currentService.process.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br ${currentService.color} flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0`}>
                      {idx + 1}
                    </div>
                    <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card-gradient card-lg text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help transform your business with our {currentService.title.toLowerCase()}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 md:px-10 py-4 bg-white text-[#2A52BE] rounded-2xl font-bold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Contact Us Today
            </motion.a>
            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 md:px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-2xl font-bold text-base md:text-lg hover:bg-white/20 transition-all"
            >
              View Our Work
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
