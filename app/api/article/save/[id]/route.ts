import {NextRequest, NextResponse} from 'next/server'
import * as z from 'zod'
import prisma from '@/shared/const/prisma'
import ArticleOptionalDto from '@/dto/ArticleOptionalDto'

const GetSearchParam = z.enum(['title', 'description', 'tags', 'content'])

export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}) {

  const {
    id
  } = await params

  const {searchParams} = req.nextUrl

  const select = searchParams.get('select')

  if(!select)
    return new NextResponse('search param req', {status: 400})

  const selectKeys = select.split(',')

  if(
    !selectKeys ||
    selectKeys.length === 0 ||
    selectKeys.some(key => !GetSearchParam.safeParse(key).success)
  )
    return new NextResponse('search param wrong', {status: 400})

  return new NextResponse(JSON.stringify(
    await prisma.article.findUniqueOrThrow({
      where: {uuid: id},
      select: {
        uuid: true,
        title: selectKeys.includes('title'),
        description: selectKeys.includes('description'),
        tags: selectKeys.includes('tags'),
        content: selectKeys.includes('content'),
      }
    })))
}

export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
  const {
    id: articleUUID
  } = await params

  const {
    data,
    success,
    error,
  } = ArticleOptionalDto.safeParse(
    await req.json()
      .then(res => ({
        ...res,
        createdAt: res.createdAt ? new Date(res.createdAt) : undefined,
      }))
  )


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
