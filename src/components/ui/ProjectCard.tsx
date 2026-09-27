'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index?: number
  large?: boolean
}

export default function ProjectCard({
  project,
  index = 0,
  large = false,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        {/* Image */}
        <div
          className={cn(
            'relative overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]',
            large ? 'aspect-[16/9]' : 'aspect-[4/3]'
          )}
          style={{ borderRadius: 'var(--radius-base)' }}
        >
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes={large ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-medium text-[var(--color-border-light)]">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Arrow */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
            <ArrowUpRight size={16} className="text-black" />
          </div>

          {/* Category tag */}
          <div className="absolute bottom-4 left-4">
            <span className="tag bg-black/60 backdrop-blur-sm border-white/10 text-white/80">
              {project.category}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3
              className={cn(
                'font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-200',
                large ? 'text-xl' : 'text-base'
              )}
            >
              {project.title}
            </h3>
            {project.shortDescription && (
              <p className="mt-1 text-sm text-[var(--color-text-muted)] line-clamp-1">
                {project.shortDescription}
              </p>
            )}
          </div>
          {project.year && (
            <span className="text-xs text-[var(--color-text-muted)] shrink-0 mt-1">
              {project.year}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
