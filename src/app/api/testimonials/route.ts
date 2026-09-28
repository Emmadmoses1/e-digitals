import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  role: z.string().optional(),
  company: z.string().optional(),
  content: z.string().min(1),
  rating: z.number().min(1).max(5).optional(),
  published: z.boolean().optional(),
})

export async function GET() {
  try {
    const data = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const result = schema.safeParse(await req.json())
    if (!result.success) return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
    const data = await prisma.testimonial.create({ data: result.data })
    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
