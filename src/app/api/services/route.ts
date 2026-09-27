import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const serviceSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().optional(),
  published: z.boolean().optional(),
})

export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(services)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    const result = serviceSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 })
    }
    const service = await prisma.service.create({ data: result.data })
    return NextResponse.json(service, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}
