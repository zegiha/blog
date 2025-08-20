import {NextRequest, NextResponse} from 'next/server'
import * as z from 'zod'

export const ArticleContentSchema = z.object({
  'h1': z.string(),
  'h2': z.string(),
  content: z.string(),
  list: z.array(z.string()),
  footnote: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
    position: z.enum(['small', 'medium', 'large']),
    size: z.object({
      width: z.string(),
      height: z.string(),
    }),
  })
})

export type TArticleContent = z.infer<typeof ArticleContentSchema>

const ArticleSchema = z.object({
  title: z.string(),
  description: z.string(),
  content: ArticleContentSchema,
  createdAt: z.date(),
  tags: z.array(z.string()),
})

export async function POST(request: NextRequest) {
  // const reqData = await request.json()
  // const articleData = ArticleSchema.safeParse({
  //   title: reqFormdata.get('title'),
  //   content: reqFormdata.get('content'),
  //   createdAt: reqFormdata.get('createdAt'),
  //   tags: reqFormdata.get('tags'),
  // })
  //
  // if(!articleData.success) {
  //   return new NextResponse(articleData.error.message, {status: 400})
  // }

  // TODO push to db the data

  return new NextResponse('ok')
}