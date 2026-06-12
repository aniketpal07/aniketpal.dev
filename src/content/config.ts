import { defineCollection, z } from 'astro:content';

const logs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['LABS', 'THOUGHTS']),
    heroImage: z.string().optional(),
    heroImageCaption: z.string().optional(),
  }),
});

export const collections = { logs };
