import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  testMutation: publicProcedure
    .mutation(async ({ ctx }) => {
      return await ctx.prisma.example.create({data: {}});
    }),
  starMutation: publicProcedure
    .input(z.object({name: z.string(), constellation: z.string()}))
    .mutation(async ({ctx, input}) => {
      return await ctx.prisma.star.create({data: {
        name: input.name,
        constellation: input.constellation
      }})
    }),
});
