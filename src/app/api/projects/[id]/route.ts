import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import { generateSlug } from '@/lib/utils'

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  category: z.string().optional(),
  client: z.string().optional(),
  year: z.string().optional(),
  services: z.array(z.string()).optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  challenge: z.string().optional(),
  strategy: z.string().optional(),
  solution: z.string().optional(),
  outcome: z.string().optional(),
  coverImage: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  projectUrl: z.string().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
})

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const project = await prisma.project.findUnique({ where: { id } })
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await req.json()
    const result = updateSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
    }
    const data = result.data

    if (data.title && !data.slug) {
      data.slug = generateSlug(data.title)
    }

    const project = await prisma.project.update({ where: { id }, data })
    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { id } = await params
    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
