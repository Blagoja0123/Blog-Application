import z, { TypeOf } from 'zod'

export const createPostSchema = z.object({
    title: z.string(),
    body: z.string(),
    img: z.string(),
})

export const createSinglePostSchema = z.object({
    postId: z.number(),
})

export type CreatePostInput = z.TypeOf<typeof createPostSchema>