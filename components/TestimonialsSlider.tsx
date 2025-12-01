'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  rating: number
  text: string
  project: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'John Anderson',
    role: 'CEO',
    company: 'TechStart Inc',
    image: '/testimonials/john.jpg',
    rating: 5,
    text: 'Limitless Infotech transformed our digital presence completely. Their team delivered a stunning website that exceeded all our expectations. The attention to detail and professionalism was outstanding.',
    project: 'E-commerce Platform'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    role: 'Marketing Director',
    company: 'Global Solutions',
    image: '/testimonials/maria.jpg',
    rating: 5,
    text: 'Working with Limitless Infotech was an absolute pleasure. They understood our vision and brought it to life with incredible precision. Our conversion rates increased by 150% after the launch!',
    project: 'Corporate Website'
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'Founder',
    company: 'HealthTech Pro',
    image: '/testimonials/david.jpg',
    rating: 5,
    text: 'The mobile app they developed for us is phenomenal. User feedback has been overwhelmingly positive, and we&apos;ve seen a 200% increase in user engagement. Highly recommended!',
    project: 'Mobile App Development'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    role: 'Product Manager',
    company: 'FinanceHub',
    image: '/testimonials/sarah.jpg',
    rating: 5,
    text: 'Exceptional service from start to finish. The team was responsive, creative, and delivered on time. Our new platform has received rave reviews from our clients.',
    project: 'Financial Platform'
  },
  {
    id: 5,
    name: 'Michael Brown',
    role: 'CTO',
    company: 'EduLearn',
    image: '/testimonials/michael.jpg',
    rating: 5,
    text: 'Limitless Infotech brought technical excellence and creative innovation to our project. The scalable architecture they built has supported our 10x growth seamlessly.',
    project: 'Learning Management System'
  },
  {
    id: 6,
    name: 'Emily Taylor',
    role: 'Operations Director',
    company: 'RetailMax',
    image: '/testimonials/emily.jpg',
    rating: 5,
    text: 'Their expertise in e-commerce is unmatched. They optimized our entire online store, resulting in faster load times and a 180% increase in sales. Amazing work!',
    project: 'E-commerce Optimization'
  }
]

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying])

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#2A52BE] to-[#F97316] rounded-full mb-6"
          >
            <FaQuoteLeft className="text-3xl text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from our satisfied clients
          </p>
        </motion.div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Avatar */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#2A52BE] to-[#F97316] p-1">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                        <span className="text-5xl font-bold bg-gradient-to-br from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
                          {currentTestimonial.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Quote Icon */}
                    <FaQuoteLeft className="text-4xl text-[#2A52BE]/20 mb-4" />

                    {/* Rating */}
                    <div className="flex gap-1 mb-4 justify-center md:justify-start">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                        >
                          <FaStar className="text-2xl text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                      &quot;{currentTestimonial.text}&quot;
                    </p>

                    {/* Author Info */}
                    <div className="mb-4">
                      <h4 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-[#F97316] font-semibold">
                        {currentTestimonial.role} at {currentTestimonial.company}
                      </p>
                    </div>

                    {/* Project Badge */}
                    <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#2A52BE]/10 to-[#F97316]/10 rounded-full">
                      <span className="text-sm font-semibold text-[#2A52BE] dark:text-[#F97316]">
                        Project: {currentTestimonial.project}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="pointer-events-auto p-4 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all border-2 border-gray-200 dark:border-gray-700"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="text-2xl text-[#2A52BE]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="pointer-events-auto p-4 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all border-2 border-gray-200 dark:border-gray-700"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="text-2xl text-[#2A52BE]" />
            </motion.button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => goToTestimonial(index)}
                className={`transition-all ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-gradient-to-r from-[#2A52BE] to-[#F97316]'
                    : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                } rounded-full`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {[
              { label: 'Happy Clients', value: '200+' },
              { label: 'Projects Completed', value: '500+' },
              { label: 'Client Satisfaction', value: '98%' },
              { label: 'Years Experience', value: '10+' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
