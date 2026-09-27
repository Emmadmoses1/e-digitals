import { prisma } from '@/lib/prisma'
import Hero from '@/components/sections/Hero'
import SelectedWork from '@/components/sections/SelectedWork'
import ServicesPreview from '@/components/sections/ServicesPreview'
import CTA from '@/components/sections/CTA'

export default async function HomePage() {
  const [projects, services] = await Promise.all([
    prisma.project.findMany({
      where: { published: true, featured: true },
      orderBy: { createdAt: 'desc' },
      take: 4,
    }),
    prisma.service.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    }),
  ]).catch(() => [[], []])

  return (
    <>
      <Hero />
      <SelectedWork projects={projects as any} />
      <ServicesPreview services={services as any} />
      <CTA />
    </>
  )
}
