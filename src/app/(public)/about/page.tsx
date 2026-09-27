import PageTransition from '@/components/animations/PageTransition'
import FadeUp from '@/components/animations/FadeUp'
import { StaggerContainer, StaggerItem } from '@/components/animations/Stagger'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Brand identity designer and web developer based in Nigeria.',
}

const skills = [
  'Brand Strategy', 'Visual Identity', 'Logo Design',
  'Typography', 'Color Theory', 'UI/UX Design',
  'Web Design', 'Next.js', 'React',
  'TypeScript', 'Tailwind CSS', 'Figma',
]

const tools = [
  'Figma', 'Adobe Illustrator', 'Adobe Photoshop',
  'VS Code', 'Next.js', 'Prisma',
]

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="pt-40 pb-20">
        <div className="container">
          <div className="max-w-5xl">
            <FadeUp>
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                About
              </span>
              <h1 className="text-heading-xl mt-2 mb-8">
                Brand Identity Designer
                <br />
                <span className="text-[var(--color-text-secondary)]">& Web Developer</span>
              </h1>
            </FadeUp>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7">
                <FadeUp delay={0.1}>
                  <div className="flex flex-col gap-5 text-body text-[var(--color-text-secondary)]">
                    <p>
                      I&apos;m a brand identity designer and web developer based in Nigeria,
                      creating distinctive visual identities and modern digital experiences
                      for ambitious businesses, startups and personal brands.
                    </p>
                    <p>
                      I believe great brands are built at the intersection of strategy,
                      creativity and technology. My work combines brand thinking with
                      design craft and development skill to deliver complete, cohesive
                      brand and digital experiences.
                    </p>
                    <p>
                      Whether it&apos;s a logo system for a new startup, a full brand identity
                      for an established business, or a modern website that converts visitors
                      into clients — I approach every project with the same commitment to
                      quality, clarity and intention.
                    </p>
                  </div>
                  <div className="mt-10">
                    <Link href="/contact" className="btn btn-primary text-xs tracking-wider uppercase">
                      Work With Me
                    </Link>
                  </div>
                </FadeUp>
              </div>

              <div className="lg:col-span-5">
                <FadeUp delay={0.2}>
                  <div className="mb-8">
                    <p className="label mb-4">Skills</p>
                    <StaggerContainer className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <StaggerItem key={skill}>
                          <span className="tag">{skill}</span>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                  <div>
                    <p className="label mb-4">Tools</p>
                    <StaggerContainer className="flex flex-wrap gap-2">
                      {tools.map((tool) => (
                        <StaggerItem key={tool}>
                          <span className="tag">{tool}</span>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
