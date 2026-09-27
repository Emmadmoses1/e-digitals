'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import TextReveal from '@/components/animations/TextReveal'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text-primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container relative z-10 flex-1 flex flex-col justify-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-8 h-px bg-[var(--color-accent)]" />
          <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
            Brand Identity & Web Development
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="text-display mb-8 max-w-5xl">
          <TextReveal text="I BUILD BRANDS" delay={0.2} />
          <br />
          <TextReveal
            text="AND DIGITAL"
            delay={0.35}
            className="text-[var(--color-text-secondary)]"
          />
          <br />
          <TextReveal text="EXPERIENCES." delay={0.5} />
        </h1>

        {/* Supporting text + CTAs */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-body-lg text-[var(--color-text-secondary)] max-w-md"
          >
            Brand identity designer and web developer creating distinctive
            visual identities and modern digital experiences for ambitious
            businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/work"
              className="btn btn-primary text-xs tracking-wider uppercase"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="btn btn-outline text-xs tracking-wider uppercase"
            >
              Start a Project
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container relative z-10">
        <div className="flex items-center justify-between pt-8 border-t border-[var(--color-border)]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex gap-8"
          >
            {[
              { value: '50+', label: 'Projects' },
              { value: '3+', label: 'Years' },
              { value: '100%', label: 'Dedication' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-lg font-medium text-[var(--color-text-primary)]">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] tracking-wider uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] tracking-wider uppercase"
          >
            <span>Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={12} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
