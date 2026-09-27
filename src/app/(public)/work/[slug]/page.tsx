import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import PageTransition from '@/components/animations/PageTransition'
import FadeUp from '@/components/animations/FadeUp'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await prisma.project.findUnique({ where: { slug } }).catch(() => null)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.seoTitle || project.title,
    description: project.seoDescription || project.shortDescription || '',
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = await prisma.project.findUnique({
    where: { slug, published: true },
  }).catch(() => null)

  if (!project) notFound()

  const related = await prisma.project.findMany({
    where: {
      published: true,
      category: project.category,
      id: { not: project.id },
    },
    take: 2,
  }).catch(() => [])

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-0">
        <div className="container">
          <FadeUp>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-10"
            >
              <ArrowLeft size={14} />
              All Work
            </Link>

            <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
              <div>
                <span className="tag mb-3">{project.category}</span>
                <h1 className="text-heading-xl">{project.title}</h1>
                {project.shortDescription && (
                  <p className="mt-4 text-body-lg text-[var(--color-text-secondary)] max-w-2xl">
                    {project.shortDescription}
                  </p>
                )}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-8 shrink-0">
                {project.client && (
                  <div>
                    <p className="label">Client</p>
                    <p className="text-sm text-[var(--color-text-primary)]">{project.client}</p>
                  </div>
                )}
                {project.year && (
                  <div>
                    <p className="label">Year</p>
                    <p className="text-sm text-[var(--color-text-primary)]">{project.year}</p>
                  </div>
                )}
                {project.services.length > 0 && (
                  <div>
                    <p className="label">Services</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.services.map((s) => (
                        <span key={s} className="tag text-[10px]">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {project.projectUrl && (
                  <div>
                    <p className="label">Live Site</p>
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-[var(--color-accent)] hover:underline"
                    >
                      Visit <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Cover image */}
        {project.coverImage && (
          <FadeUp delay={0.2}>
            <div className="container">
              <div className="relative aspect-[16/7] overflow-hidden rounded-lg border border-[var(--color-border)]">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </div>
            </div>
          </FadeUp>
        )}
      </section>

      {/* Case study body */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {project.description && (
              <FadeUp className="mb-16">
                <h2 className="text-heading-md mb-4">Overview</h2>
                <p className="text-body text-[var(--color-text-secondary)] leading-relaxed">
                  {project.description}
                </p>
              </FadeUp>
            )}

            {project.challenge && (
              <FadeUp className="mb-16">
                <h2 className="text-heading-md mb-4">The Challenge</h2>
                <p className="text-body text-[var(--color-text-secondary)] leading-relaxed">
                  {project.challenge}
                </p>
              </FadeUp>
            )}

            {project.strategy && (
              <FadeUp className="mb-16">
                <h2 className="text-heading-md mb-4">Strategy</h2>
                <p className="text-body text-[var(--color-text-secondary)] leading-relaxed">
                  {project.strategy}
                </p>
              </FadeUp>
            )}

            {project.solution && (
              <FadeUp className="mb-16">
                <h2 className="text-heading-md mb-4">Solution</h2>
                <p className="text-body text-[var(--color-text-secondary)] leading-relaxed">
                  {project.solution}
                </p>
              </FadeUp>
            )}

            {project.outcome && (
              <FadeUp className="mb-16">
                <div className="border-l-2 border-[var(--color-accent)] pl-8 py-2">
                  <h2 className="text-heading-md mb-4">Outcome</h2>
                  <p className="text-body text-[var(--color-text-secondary)] leading-relaxed">
                    {project.outcome}
                  </p>
                </div>
              </FadeUp>
            )}
          </div>

          {/* Gallery */}
          {project.galleryImages.length > 0 && (
            <FadeUp className="mt-20">
              <h2 className="text-heading-md mb-8">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-lg border border-[var(--color-border)] ${
                      i === 0 ? 'md:col-span-2 aspect-[16/7]' : 'aspect-[4/3]'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} gallery ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="section border-t border-[var(--color-border)]">
          <div className="container">
            <h2 className="text-heading-md mb-10">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/work/${p.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] mb-4">
                    {p.coverImage ? (
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-medium text-[var(--color-border-light)]">
                          {p.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium group-hover:text-[var(--color-accent)] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">{p.category}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section border-t border-[var(--color-border)]">
        <div className="container text-center">
          <FadeUp>
            <h2 className="text-heading-lg mb-4">Like what you see?</h2>
            <p className="text-body text-[var(--color-text-secondary)] mb-8">
              Let&apos;s build something remarkable together.
            </p>
            <Link href="/contact" className="btn btn-primary text-xs tracking-wider uppercase">
              Start a Project
            </Link>
          </FadeUp>
        </div>
      </section>
    </PageTransition>
  )
}
