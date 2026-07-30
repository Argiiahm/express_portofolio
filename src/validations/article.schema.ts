import { z } from 'zod';

export const ArticleSchema = z.object({
    title: z.string().min(1, 'title is required').max(455, 'title maximum 455 character'),
    content: z.string().min(1, 'content is required'),
});

export type ArticleInput = z.infer<typeof ArticleSchema>;
