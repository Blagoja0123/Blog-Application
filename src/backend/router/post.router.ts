import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { createRouter } from '../createRouter'
import {z} from 'zod'
export const postRouter = createRouter()
    .mutation('create-post', {
        input: z.object({
            title: z.string(),
            content: z.string(),
        }),
        async resolve({ctx, input}){
            const post = await prisma?.post.create({
                data:{
                    ...input,
                    user: {
                        connect: {
                            
                        },
                    },
                },
            })
            return post;
        }
    });