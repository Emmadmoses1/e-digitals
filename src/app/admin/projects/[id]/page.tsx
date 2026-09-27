import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProjectEditor from '@/components/admin/ProjectEditor'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } }).catch(() => null)
  return { title: project ? `Edit: ${project.title}` : 'Project — Admin' }
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params
  const project = await prisma.project.findUnique({ where: { id } }).catch(() => null)
  if (!project) notFound()
  return <ProjectEditor project={project} />
}
