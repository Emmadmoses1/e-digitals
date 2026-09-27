'use client'

import { motion } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
}

export default function TextReveal({
  text,
  className,
  delay = 0,
  once = true,
}: TextRevealProps) {
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.25em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.06,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
