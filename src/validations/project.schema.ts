import { z } from 'zod';

export const ProjectSchema = z.object({
    slug: z.string().min(1, 'slug is Required'),
    name: z.string().min(1, 'projectName is Required'),
    imageUrl: z.string().url().optional(),
    url: z.string().url().optional(),
    description: z.array(z.string()),
    techStack: z.array(z.string()),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
