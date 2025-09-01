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