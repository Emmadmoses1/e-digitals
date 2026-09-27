import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProjectCard from '@/components/ui/ProjectCard'
import { Project } from '@/types'

interface SelectedWorkProps {
  projects: Project[]
}

export default function SelectedWork({ projects }: SelectedWorkProps) {
  if (!projects.length) return null

  const [featured, ...rest] = projects

  return (
    <section className="section border-t border-[var(--color-border)]">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
              Selected Work
            </span>
            <h2 className="text-heading-xl mt-2">Recent Projects</h2>
          </div>
          <Link
            href="/work"
            className="hidden md:flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors group"
          >
            All Projects
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Featured project */}
        {featured && (
          <div className="mb-6">
            <ProjectCard project={featured} index={0} large />
          </div>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 1} />
            ))}
          </div>
        )}

        {/* Mobile view all */}
        <div className="mt-10 md:hidden text-center">
          <Link href="/work" className="btn btn-outline text-xs tracking-wider uppercase">
            View All Work
          </Link>
        </div>
      </div>
    </section>
  )
}
