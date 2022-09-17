import * as trpc from '@trpc/server'
import { createRouter } from "../createRouter";
import { createCommentSchema, createPostCommentSchema } from "../schema/comment.schema";


export const commentRouter = createRouter()
    .mutation('new-comment', {
        input: createCommentSchema,
        async resolve({ctx, input}){
            const body = input.body;
            const postId = input.postId;
            if(!ctx.user){
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Cannot make comments while logged out'
                })
            }

            const comment = await ctx.prisma.comments.create({
                data: {
                    body,
                    user: {
                        connect: {
                            id: ctx.user?.id,
                        },
                    },
                    post: {
                        connect: {
                            id: postId,
                        }
                    }
                }
            })

            return comment;
        }
    })
    .query('all-comments', {
        input: createPostCommentSchema,
        async resolve({ctx, input}){
            const {postId} = input
            const comments = await ctx.prisma.comments.findMany({
                where:{
                    postId: postId,
                }
            })

            return comments;
        }
    })