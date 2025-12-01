'use client'
import { motion } from 'framer-motion'
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaAngular } from 'react-icons/fa'
import { SiTypescript, SiKubernetes, SiMongodb, SiPostgresql, SiNextdotjs, SiTailwindcss } from 'react-icons/si'

export default function TechStack() {
  const technologies = [
    { icon: FaReact, name: 'React', color: '#61DAFB' },
    { icon: SiNextdotjs, name: 'Next.js', color: '#000000' },
    { icon: FaNodeJs, name: 'Node.js', color: '#339933' },
    { icon: SiTypescript, name: 'TypeScript', color: '#3178C6' },
    { icon: FaPython, name: 'Python', color: '#3776AB' },
    { icon: FaAws, name: 'AWS', color: '#FF9900' },
    { icon: FaDocker, name: 'Docker', color: '#2496ED' },
    { icon: SiKubernetes, name: 'Kubernetes', color: '#326CE5' },
    { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
    { icon: SiPostgresql, name: 'PostgreSQL', color: '#4169E1' },
    { icon: FaAngular, name: 'Angular', color: '#DD0031' },
    { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' }
  ]

  return (
    <section className="py-16 bg-slate-50 rounded-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#2A52BE] to-[#F97316] bg-clip-text text-transparent">
          Technologies We Master
        </h2>
        <p className="mt-4 text-slate-600">Building with the best tools in the industry</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {technologies.map((tech, idx) => {
          const Icon = tech.icon
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <Icon 
                className="text-5xl mb-3" 
                style={{ color: tech.color }}
              />
              <span className="text-sm font-medium text-slate-700">{tech.name}</span>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <p className="text-slate-600">And many more cutting-edge technologies...</p>
      </motion.div>
    </section>
  )
}
