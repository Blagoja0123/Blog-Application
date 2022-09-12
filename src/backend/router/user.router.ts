import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { createRouter } from '../createRouter'
import {z} from 'zod'
import { createUserSchema } from '../schema/user.schema';


export const userRouter = createRouter()
    .mutation('register', {
        input: createUserSchema,
        async resolve({ctx, input}){
            const {username, password} = input;
            const user = await ctx.prisma.user.create({
                data: {
                    username,
                    password,
                },
            })
            return user
        }
    })
    .query('me', {
        resolve({ ctx }) {
          return 'HELLO FROM TRPC BOI'
        },
    });