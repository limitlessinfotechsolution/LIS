import { Metadata } from 'next'
import Image from 'next/image'
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaStar, FaAward, FaRocket } from 'react-icons/fa'

export const metadata: Metadata = {
  title: 'Our Team - Meet the Experts',
  description: 'Meet the talented team behind Limitless Infotech Solution. Our experts are passionate about delivering innovative IT solutions.',
}

const founder = {
  name: 'Faisal Khan',
  role: 'Founder & CEO',
  title: 'The Visionary Behind Limitless Infotech',
  bio: 'Faisal Khan is the visionary founder and CEO of Limitless Infotech Solution Pvt Ltd. With over 15 years of experience in the IT industry, he has led the company to become a trusted partner for 120+ enterprises worldwide. His passion for innovation and commitment to excellence drives the company&apos;s mission to deliver cutting-edge technology solutions.',
  expertise: ['Strategic Leadership', 'Business Development', 'Technology Innovation', 'Client Relations'],
  achievements: [
    'Founded Limitless Infotech in 2016',
    'Scaled company to 50+ team members',
    'Delivered 120+ successful projects',
    'ISO 27001 certified organization'
  ],
  image: '/team/founder.jpg',
  social: {
    linkedin: 'https://linkedin.com/in/faisalkhan',
    twitter: 'https://twitter.com/faisalkhan',
    github: 'https://github.com/faisalkhan',
    email: 'faisal@limitlessinfotech.com'
  }
}

const teamMembers = [
  {
    name: 'Priya Sharma',
    role: 'Chief Technology Officer',
    expertise: 'Full-Stack Development, Cloud Architecture',
    image: '/team/priya.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'priya@limitlessinfotech.com'
    }
  },
  {
    name: 'Rahul Verma',
    role: 'Lead Developer',
    expertise: 'React, Node.js, TypeScript',
    image: '/team/rahul.jpg',
    social: {
      linkedin: '#',
      github: '#',
      email: 'rahul@limitlessinfotech.com'
    }
  },
  {
    name: 'Anita Desai',
    role: 'UI/UX Designer',
    expertise: 'Product Design, User Research',
    image: '/team/anita.jpg',
    social: {
      linkedin: '#',
      twitter: '#',
      email: 'anita@limitlessinfotech.com'
    }
  },
  {
    name: 'Vikram Singh',
    role: 'DevOps Engineer',
    expertise: 'AWS, Docker, Kubernetes',
    image: '/team/vikram.jpg',
    social: {
      linkedin: '#',
      github: '#',
      email: 'vikram@limitlessinfotech.com'
    }
  },
  {
    name: 'Sneha Patel',
    role: 'Project Manager',
    expertise: 'Agile, Scrum, Team Leadership',
    image: '/team/sneha.jpg',
    social: {
      linkedin: '#',
      email: 'sneha@limitlessinfotech.com'
    }
  },
  {
    name: 'Arjun Mehta',
    role: 'Mobile Developer',
    expertise: 'React Native, iOS, Android',
    image: '/team/arjun.jpg',
    social: {
      linkedin: '#',
      github: '#',
      email: 'arjun@limitlessinfotech.com'
    }
  }
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2A52BE]/10 to-[#F97316]/10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[#2A52BE] via-[#3B82F6] to-[#F97316] bg-clip-text text-transparent">
              Meet Our Team
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Passionate experts dedicated to delivering innovative solutions and exceptional results
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section - Prominent Display */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 dark:text-white">
              The Man Behind Limitless Infotech
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Meet the visionary founder who started it all
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Founder Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#2A52BE] to-[#F97316] p-1">
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#2A52BE] to-[#F97316] flex items-center justify-center">
                        <span className="text-6xl font-black text-white">FK</span>
                      </div>
                      <p className="text-sm text-gray-500">Photo coming soon</p>
                    </div>
                  </div>
                </div>
                
                {/* Achievements Badge */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <FaAward className="text-4xl mx-auto mb-2" />
                    <div className="font-black text-2xl">15+</div>
                    <div className="text-xs">Years Experience</div>
                  </div>
                </div>
              </div>

              {/* Founder Info */}
              <div className="flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-xl text-[#F97316] font-bold mb-4">
                    {founder.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {founder.bio}
                  </p>
                </div>

                {/* Expertise */}
                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {founder.expertise.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gradient-to-r from-[#2A52BE]/10 to-[#F97316]/10 text-[#2A52BE] dark:text-[#F97316] rounded-full text-sm font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Achievements */}
                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Key Achievements</h4>
                  <ul className="space-y-2">
                    {founder.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <FaStar className="text-[#F97316] mt-1 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href={founder.social.linkedin}
                    className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a
                    href={founder.social.twitter}
                    className="p-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="text-xl" />
                  </a>
                  <a
                    href={founder.social.github}
                    className="p-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors"
                    aria-label="GitHub"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                  <a
                    href={`mailto:${founder.social.email}`}
                    className="p-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-xl hover:shadow-lg transition-all"
                    aria-label="Email"
                  >
                    <FaEnvelope className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Grid - Responsive Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 dark:text-white">
              Our Expert Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Talented professionals working together to deliver excellence
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Member Image */}
                <div className="relative h-64 bg-gradient-to-br from-[#2A52BE] to-[#F97316] p-1">
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-t-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#2A52BE] to-[#F97316] flex items-center justify-center">
                        <span className="text-4xl font-black text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Photo coming soon</p>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#F97316] font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {member.expertise}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-2">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm"
                      >
                        <FaTwitter />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="p-2 bg-gradient-to-r from-[#2A52BE] to-[#F97316] text-white rounded-lg hover:shadow-lg transition-all text-sm"
                      >
                        <FaEnvelope />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#2A52BE] to-[#F97316] rounded-3xl p-8 md:p-12 text-center text-white">
            <FaRocket className="text-5xl mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Join Our Team
            </h2>
            <p className="text-lg mb-8 opacity-90">
              We&apos;re always looking for talented individuals to join our growing team
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-[#2A52BE] rounded-xl font-bold hover:shadow-2xl transition-all"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
