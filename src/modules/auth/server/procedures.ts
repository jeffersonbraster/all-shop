import { headers as getHeaders} from 'next/headers'
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from '@trpc/server';
import { loginSchema, registerSchema } from '../schemas';
import { generateAuthCookie } from '../utils';

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders()

    const session = await ctx.db.auth({ headers })

    return session
  }),
  register: baseProcedure.input(registerSchema).mutation(async ({ input, ctx }) => {
    const existingUser = await ctx.db.find({
      collection: "users",
      limit: 1,
      where: {
        username: {
          equals: input.username,
        }
      }
    })

    const user = existingUser.docs[0]

    if (user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Username already in use",
      })
    }

    await ctx.db.create({
      collection: "users", data: {
        email: input.email,
        password: input.password,
        username: input.username,
      }
    })

    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      }
    })

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      })
    }

    await generateAuthCookie({
      prefix: ctx.db.config.cookiePrefix,
      value: data.token,
    })
  }),
  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.db.login({
      collection: "users",
      data: {
        email: input.email,
        password: input.password,
      }
    })

    if (!data.token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      })
    }

    await generateAuthCookie({
      prefix: ctx.db.config.cookiePrefix,
      value: data.token,
    })

    return data
  }),
})