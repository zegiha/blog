import * as z from 'zod'

export const ArticleSummaryEntity = z.object({
  uuid: z.uuidv4(),
  title: z.string(),
  description: z.string(),
  createdAt: z.date(),
  tags: z.array(z.string()),
})

export type TArticleSummaryEntity = z.infer<typeof ArticleSummaryEntity>
