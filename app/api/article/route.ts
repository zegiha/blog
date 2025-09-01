import prisma from '@/shared/const/prisma'
import {NextRequest, NextResponse} from 'next/server'

export async function POST(_: NextRequest) {
  try {
    const res = await prisma.article.create({
      data: {
        title: '',
        description: '',
        tags: [],
        content: '',
        status: 'DRAFT',
        userUuid: '89bdc438-7583-49c1-a43b-1dd325db0344',
      }
    })

    return new NextResponse(JSON.stringify({
      uuid: res.uuid,
    }))
  } catch(e) {
    console.error(e)
    return new NextResponse('Internal Server Error', {status: 500})
  }
}
