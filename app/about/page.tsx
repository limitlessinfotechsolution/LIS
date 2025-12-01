import { Metadata } from 'next'
import { FaUsers, FaGlobe, FaCheckCircle, FaShieldAlt, FaChartLine, FaCode } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'About Us - Our Story & Mission',
  description: 'Learn about Limitless Infotech Solution - our story, mission, values, and commitment to delivering exceptional IT solutions.',
}

export default function AboutPage() {
  const stats = [
    { icon: FaChartLine, value: '120+', label: 'Projects Delivered' },
    { icon: FaUsers, value: '50+', label: 'Team Members' },
    { icon: FaCode, value: '15+', label: 'Years Experience' },
    { icon: FaGlobe, value: '25+', label: 'Countries Served' },
  ]

  const values = [
    {
      icon: FaCode,
      title: 'Innovation',
      description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.'
    },
    {
      icon: FaUsers,
      title: 'Client-Centric',
      description: 'Your success is our success. We prioritize understanding and exceeding client expectations.'
    },
    {
      icon: FaCheckCircle,
      title: 'Quality',
      description: 'We maintain the highest standards in every project, ensuring excellence in delivery.'
    },
    {
      icon: FaShieldAlt,
      title: 'Integrity',
      description: 'Transparency, honesty, and ethical practices are the foundation of our business.'
    },
  ]

  const milestones = [
    { year: '2016', title: 'Company Founded', description: 'Started with a vision to transform businesses through technology' },
    { year: '2018', title: 'Team Expansion', description: 'Grew to 20+ talented professionals' },
    { year: '2020', title: 'ISO Certification', description: 'Achieved ISO 27001 certification for quality standards' },
    { year: '2022', title: 'Global Reach', description: 'Expanded services to 25+ countries worldwide' },
    { year: '2024', title: 'Innovation Hub', description: 'Launched AI and Cloud innovation center' },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-[#2A52BE]/10 via-white to-[#F97316]/10 dark:from-[#2A52BE]/20 dark:via-gray-900 dark:to-[#F97316]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-[#2A52BE] via-[#3B82F6] to-[#F97316] bg-clip-text text-transparent">
              About Limitless Infotech
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Empowering businesses with innovative technology solutions since 2016. 
              We transform ideas into reality through expertise, passion, and commitment.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-lg p-5 text-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <stat.icon className="text-xl text-gray-700 dark:text-gray-300" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6 text-gray-900 dark:text-white">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  Founded in 2016 by visionary entrepreneur Faisal Khan, Limitless Infotech Solution 
                  began with a simple yet powerful mission: to help businesses leverage technology 
                  for unprecedented growth and success.
                </p>
                <p>
                  What started as a small team of passionate developers has grown into a 50+ member 
                  organization serving clients across 25+ countries. Our journey has been marked by 
                  continuous innovation, unwavering commitment to quality, and a client-first approach.
                </p>
                <p>
                  Today, we&apos;re proud to be a trusted technology partner for 120+ enterprises, 
                  delivering solutions that drive real business value and transform digital experiences.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#2A52BE] to-[#F97316] p-1">
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-3xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <FaChartLine className="text-8xl text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Our Journey Visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2A52BE] to-[#3B82F6] rounded-2xl flex items-center justify-center mb-6">
                <FaChartLine className="text-3xl text-white" />
              </div>
              <h3 className="text-3xl font-black mb-4 text-gray-900 dark:text-white">
                Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To empower businesses worldwide with innovative, scalable, and secure technology 
                solutions that drive growth, efficiency, and digital transformation. We strive to 
                be the trusted partner that turns technological challenges into competitive advantages.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-[#F97316] to-[#FF6B35] rounded-2xl flex items-center justify-center mb-6">
                <FaGlobe className="text-3xl text-white" />
              </div>
              <h3 className="text-3xl font-black mb-4 text-gray-900 dark:text-white">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To be the global leader in innovative IT solutions, recognized for excellence, 
                integrity, and transformative impact. We envision a future where technology seamlessly 
                enhances every aspect of business, and we&apos;re at the forefront of making it happen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-gray-900 dark:text-white">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-3">
                  <value.icon className="text-lg text-gray-700 dark:text-gray-300" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 text-gray-900 dark:text-white">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Key milestones in our growth story
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-lg">
                      {milestone.year}
                    </span>
                  </div>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#2A52BE] to-[#F97316] rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-black mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let&apos;s discuss how we can help transform your business with technology
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-4 bg-white text-[#2A52BE] rounded-xl font-bold hover:shadow-2xl transition-all"
              >
                Get in Touch
              </a>
              <a
                href="/services"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
