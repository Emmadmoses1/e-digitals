import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'
import { generateSlug } from '@/lib/utils'

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
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

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const result = projectSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
    }
    const data = result.data

    let slug = data.slug || generateSlug(data.title)
    const existing = await prisma.project.findUnique({ where: { slug } })
    if (existing) slug = `${slug}-${Date.now()}`

    const project = await prisma.project.create({
      data: {
        ...data,
        slug,
        services: data.services || [],
        galleryImages: data.galleryImages || [],
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
