import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as trpc from '@trpc/server'
import { createRouter } from '../createRouter'
import { createUserSchema, requestOtpSchema, verifyOtpSchema } from '../schema/user.schema';
import { sendLoginEmail } from '../utils/mailer';
import { url, baseUrl } from '../../constants';
import { decode, encode } from '../utils/base64';
import { signJwt } from '../utils/jwt';
import { serialize } from 'cookie';

export const userRouter = createRouter()
    .mutation('register', {
        input: createUserSchema,
        async resolve({ctx, input}){
            const {username, password, email} = input;
            
            try {
                const user = await ctx.prisma.user.create({
                    data: {
                        username,
                        email,
                        password,
                    },
                })
                return user
            } catch (e) {
                if(e instanceof PrismaClientKnownRequestError){
                    if(e.code === 'P2002'){
                        throw new trpc.TRPCError({
                            code: 'CONFLICT',
                            message: 'user already exists'
                        })
                    }
                }

                throw new trpc.TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'something went wrong',
                })
            }
        }
    })
    .mutation('login-otp', {
        input: requestOtpSchema,
        async resolve({input, ctx}){
            const {email, password, redirect} = input;  
            const user = await ctx.prisma.user.findUnique({
                where: {
                    email,
                },
            })

            if(!user){
                throw new trpc.TRPCError({
                    code: 'NOT_FOUND',
                    message: 'User not found',
                })
            }

            if(password === user.password){
                const token = await ctx.prisma.loginToken.create({
                    data: {
                        redirect,
                        user: {
                            connect: {
                                id: user.id,
                            },
                        },
                    },
                })
                console.log(`yasss ${user.email}`);
                await sendLoginEmail({
                    token: encode(`${token.id}:${user.email}`),
                    url: baseUrl,
                    email: user.email,
                })

                return true;
            }else{
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Incorrect password'
                })
            }

        },
    })
    .query('verify-otp', {
        input: verifyOtpSchema,
        async resolve({input, ctx}){
            const decoded = decode(input.hash).split(':');
            const email = decoded[1];
            const id = parseInt(decoded[0]);

            const token = await ctx.prisma.loginToken.findFirst({
                where:{
                    id,
                    user: {
                        email,
                    },
                },
                include:{
                    user: true,
                },
            })

            if(!token){
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'invalid token',
                })
            }

            const jwt = signJwt({
                email: token.user.email,
                id: token.user.id
            })

            ctx.res.setHeader('Set-Cookie', serialize('token', jwt, {path: '/'}))

            return{
                redirect: token.redirect,
            }
        } 
    })
    .query('me', {
        resolve({ ctx }) {
          return ctx.user;
        },
    });