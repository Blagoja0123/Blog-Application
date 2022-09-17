import z from 'zod'

export const createUserSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
})

export const requestOtpSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    redirect: z.string().default("/")
})

export type CreateUserInput = z.TypeOf<typeof createUserSchema>
export type requestOtpInput = z.TypeOf<typeof requestOtpSchema>

export const verifyOtpSchema = z.object({
    hash: z.string(),
})