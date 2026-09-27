import { prisma } from '@/lib/prisma'
import ProjectCard from '@/components/ui/ProjectCard'
import PageTransition from '@/components/animations/PageTransition'
import FadeUp from '@/components/animations/FadeUp'
import { Project } from '@/types'

export const metadata = {
  title: 'Work',
  description: 'Selected projects in brand identity, web design and web development.',
}

export default async function WorkPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  }).catch(() => [])

  return (
    <PageTransition>
      <section className="pt-40 pb-20">
        <div className="container">
          {/* Header */}
          <FadeUp>
            <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
              Portfolio
            </span>
            <h1 className="text-heading-xl mt-2 mb-4">Selected Work</h1>
            <p className="text-body text-[var(--color-text-secondary)] max-w-xl mb-16">
              A collection of brand identity and web development projects
              for businesses and startups.
            </p>
          </FadeUp>

          {/* Projects */}
          {projects.length === 0 ? (
            <div className="py-32 text-center border border-[var(--color-border)] rounded-lg">
              <p className="text-[var(--color-text-muted)] text-sm">
                Selected work is coming together.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project as unknown as Project}
                  index={i}
                  large={i === 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  )
}
