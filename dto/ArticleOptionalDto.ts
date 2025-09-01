import * as z from 'zod'

const ArticleOptionalDto = z.object({
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
  createdAt: z.date().optional(),
})

export default ArticleOptionalDto