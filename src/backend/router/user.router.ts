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
        async resolve({ ctx, input }) {
            const { username, password, email } = input;

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
                if (e instanceof PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
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
        async resolve({ input, ctx }) {
            const { email, password, redirect } = input;
            const user = await ctx.prisma.user.findUnique({
                where: {
                    email,
                },
            })

            if (!user) {
                throw new trpc.TRPCError({
                    code: 'NOT_FOUND',
                    message: 'User not found',
                })
            }

            if (password === user.password) {
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
                const test = await sendLoginEmail({
                    token: encode(`${token.id}:${user.email}:${user.username}`),
                    url: baseUrl,
                    email: user.email,
                })
                const val = true;
                return { test, val };
            } else {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'Incorrect password'
                })
            }

        },
    })
    .query('verify-otp', {
        input: verifyOtpSchema,
        async resolve({ input, ctx }) {
            const decoded = decode(input.hash).split(':');
            console.log(decoded);
            const email = decoded[1];
            const username = decoded[2];
            const id = parseInt(decoded[0]);

            const token = await ctx.prisma.loginToken.findFirst({
                where: {
                    id,
                    user: {
                        email,
                        username,
                    },
                },
                include: {
                    user: true,
                },
            })

            if (!token) {
                throw new trpc.TRPCError({
                    code: 'FORBIDDEN',
                    message: 'invalid token',
                })
            }

            const jwt = signJwt({
                email: token.user.email,
                username: token.user.username,
                id: token.user.id
            })

            ctx.res.setHeader('Set-Cookie', serialize('token', jwt, { path: '/' }))

            return {
                redirect: token.redirect,
            }
        }
    })
    .query('me', {
        resolve({ ctx }) {
            return ctx.user;
        },
    });