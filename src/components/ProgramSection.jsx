import { motion } from 'framer-motion'
import { config } from '../data/config'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

function TimelineItem({ time, event, description, index, isLast }) {
  return (
    <motion.li
      variants={itemVariants}
      className="relative flex gap-6 md:gap-10"
      aria-label={`${time} — ${event}`}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center shrink-0 w-6">
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.18 + 0.2, duration: 0.5, type: 'spring', bounce: 0.5 }}
          className="w-3 h-3 rounded-full mt-1.5 shrink-0 relative z-10"
          style={{ background: 'var(--accent-gold)', boxShadow: '0 0 0 4px var(--bg-primary), 0 0 0 5px var(--border-gold)' }}
        />
        {/* Vertical line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.18 + 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-[1px] mt-2 origin-top"
            style={{ background: 'linear-gradient(180deg, var(--accent-gold), var(--border-color))' }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 flex-1">
        {/* Time badge */}
        <span
          className="inline-block font-sans text-[10px] tracking-[0.36em] uppercase px-3 py-1 rounded-full mb-3"
          style={{
            background: 'var(--accent-gold)',
            backgroundOpacity: 0.1,
            border: '1px solid var(--border-gold)',
            color: 'var(--accent-gold)',
          }}
        >
          {time}
        </span>

        <motion.div
          whileHover={{ x: 4 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl p-6 transition-shadow duration-400"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <h3 className="font-serif text-xl md:text-2xl italic mb-2" style={{ color: 'var(--text-primary)' }}>
            {event}
          </h3>
          <p className="font-sans text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {description}
          </p>
        </motion.div>
      </div>
    </motion.li>
  )
}

export default function ProgramSection() {
  const { program } = config

  return (
    <section id="programme" className="section-padding px-6" aria-labelledby="program-heading">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p
            className="font-sans text-[10px] tracking-[0.45em] uppercase mb-4"
            style={{ color: 'var(--accent-gold)' }}
          >
            {program.eyebrow}
          </p>
          <h2
            id="program-heading"
            className="font-serif text-4xl md:text-5xl italic"
            style={{ color: 'var(--text-primary)' }}
          >
            {program.heading}
          </h2>
        </motion.div>

        {/* Timeline */}
        <motion.ol
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="list-none"
          aria-label="Programme de la soirée"
        >
          {program.items.map((item, i) => (
            <TimelineItem
              key={item.time}
              time={item.time}
              event={item.event}
              description={item.description}
              index={i}
              isLast={i === program.items.length - 1}
            />
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
