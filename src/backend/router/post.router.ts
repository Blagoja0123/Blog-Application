
import * as trpc from '@trpc/server'
import { z } from 'zod';
import { createRouter } from '../createRouter'
import { createPostSchema, createSinglePostSchema } from '../schema/post.schema'

export const postRouter = createRouter()
    .mutation('new-post', {
        input: createPostSchema,
        async resolve({ctx, input}){
            const {title, body} = input;

            if(!ctx.user){
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Cannot create post while logged out',
                })
            }

            const post: any = await ctx.prisma.post.create({
                data: {
                    ...input,
                    user: {
                        connect: {
                            id: ctx.user?.id,
                        }
                    }
                }
            })
            
            return post;
        }
    })
    .query('all-posts', {
        async resolve({ctx}){
            const posts = await ctx.prisma.post.findMany();

            return posts;
        },
    })
    .query('single-post', {
        input: createSinglePostSchema,
        async resolve({ctx, input}){
            const post = await ctx.prisma.post.findUnique({
                where: {
                    id: input.postId,
                },
            })

            return post;
        }
    })
    .query('user-posts', {
        input: z.object({
            userId: z.number(),
        }),
        async resolve({ctx, input}){

            const {userId} = input;
            try {
                const posts = await ctx.prisma.post.findMany({
                    where:{
                        userId,
                    },
                })
                return posts;

            } catch (error) {

                return null;
            }

        }
    })