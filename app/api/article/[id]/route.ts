import {NextRequest, NextResponse} from 'next/server'
import * as z from 'zod'
import prisma from '@/shared/const/prisma'

const ArticlePatchDto = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  content: z.array(z.object({
    type: z.enum(['h1', 'h2', 'content', 'list', 'footnote', 'image']),

    value: z.array(z.object({
      content: z.string(),
      color: z.string().optional(),
      accent: z.string().optional(),
      underline: z.string().optional(),
      italic: z.string().optional(),
    })).optional(),

    src: z.string().nullable().optional(),
    position: z.enum(['start', 'center', 'end']).optional(),
    alt: z.string().optional(),
    width: z.string().optional(),
  })).optional(),
})

export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const {
    id: articleUUID
  } = await params
  const {
    data,
    success,
    error,
  } = ArticlePatchDto.safeParse(await req.json())


  if(error || !success)
    return new NextResponse(error?.message ?? 'Validation failed', {status: 400})

  try {
    await prisma.article.update({
      where: {
        uuid: articleUUID,
      },
      data,
    })

    return new NextResponse('ok')
  } catch(e) {

    return new NextResponse(JSON.stringify({
      message: 'Patch failed',
      error: e,
    }), {status: 500})
  }

}