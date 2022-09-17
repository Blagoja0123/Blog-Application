import z from 'zod'

export const createCommentSchema = z.object({
    body: z.string(),
    postId: z.number(),
})

export const createPostCommentSchema = z.object({
    postId: z.number(),
})

export type CreateCommentInput = z.TypeOf<typeof createCommentSchema>