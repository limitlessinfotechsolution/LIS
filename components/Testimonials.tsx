'use client'
import { motion } from 'framer-motion'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rajesh Malhotra',
      role: 'CEO, FinTech Global',
      company: 'Financial Services',
      content: 'Limitless Infotech delivered a robust banking platform that handles millions of transactions daily. Their expertise in security and scalability is unmatched. The team was professional, responsive, and delivered ahead of schedule.',
      rating: 5,
      image: '👨‍💼',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'CTO, MediCare Solutions',
      company: 'Healthcare',
      content: 'Working with Limitless was a game-changer for our healthcare platform. They understood HIPAA compliance requirements and built a secure, user-friendly system. Our patient satisfaction has increased by 40%!',
      rating: 5,
      image: '👩‍⚕️',
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Amit Kumar',
      role: 'Founder, EduTech Academy',
      company: 'Education',
      content: 'The e-learning platform they developed transformed our business. With 2M+ active students, the system handles scale effortlessly. Their AI-powered features have revolutionized how we deliver education.',
      rating: 5,
      image: '👨‍🏫',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Sarah Williams',
      role: 'VP Technology, ShopEase',
      company: 'E-Commerce',
      content: 'Limitless Infotech built our multi-vendor marketplace from scratch. The platform is fast, secure, and handles peak traffic seamlessly. Their post-launch support has been exceptional. Highly recommended!',
      rating: 5,
      image: '👩‍💼',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Vikram Singh',
      role: 'Director, LogixOne',
      company: 'Logistics',
      content: 'Our supply chain management system has reduced operational costs by 30%. The real-time tracking and AI-powered route optimization are incredible. Limitless truly understands enterprise needs.',
      rating: 5,
      image: '👨‍✈️',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      name: 'Jennifer Lee',
      role: 'Product Manager, TechPivot',
      company: 'Technology',
      content: 'From concept to deployment, Limitless was with us every step. Their agile approach, transparent communication, and technical expertise made our IoT platform a success. True partners in innovation!',
      rating: 5,
      image: '👩‍💻',
      color: 'from-pink-500 to-purple-500'
    }
  ]

  return (
    <section className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-slate-600">Don&apos;t just take our word for it</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative overflow-hidden"
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />
            
            <FaQuoteLeft className="text-4xl text-slate-200 absolute top-6 right-6" />
            
            <div className="relative z-10">
              <div className="text-5xl mb-4">{testimonial.image}</div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + i * 0.1 }}
                  >
                    <FaStar className="text-yellow-400" />
                  </motion.div>
                ))}
              </div>

              <p className="text-slate-600 mb-6 italic leading-relaxed">&quot;{testimonial.content}&quot;</p>

              <div className="pt-4 border-t border-slate-200">
                <div className="font-bold text-lg">{testimonial.name}</div>
                <div className="text-sm text-slate-600">{testimonial.role}</div>
                <div className="text-xs text-slate-500 mt-1">{testimonial.company}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
