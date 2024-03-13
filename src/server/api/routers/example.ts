import { z } from "zod";
import { getInitialIds, getRandomId } from "../../../utils/getInitialIds";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "process";

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
      return await ctx.prisma.example.create({ data: {} });
    }),
  // starMutation: publicProcedure
  //   .input(z.object({ name: z.string(), constellation: z.string() }))
  //   .mutation(async ({ ctx, input }) => {
  //     return await ctx.prisma.star.create({
  //       data: {
  //         name: input.name,
  //         constellation: input.constellation
  //       }
  //     })
  //   }),
  getImageByID: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const image = await ctx.prisma.image.findFirst({
        where: {
          id: input.id
        }
      })

      if (env.aws_access_key_id == undefined || env.aws_secret_access_key == undefined) return;
      const client = new S3Client({
        region: 'us-east-1',
        credentials: {
          accessKeyId: env.aws_access_key_id,
          secretAccessKey: env.aws_secret_access_key,
        }
      });

      if (image == null) return;
      if (image.key == undefined) return;
      const command = new GetObjectCommand({ Bucket: env.aws_s3_bucket_name, Key: image.key });
      const url = await getSignedUrl(client, command, { expiresIn: 5 * 60 });

      return url;
    }),
  getRandomImage: publicProcedure
    .query(({ ctx }) => {
      const id = getRandomId([])
      return ctx.prisma.image.findFirst({
        where: {
          id: id
        }
      })
    }),
  getInitialImages: publicProcedure
    .query(({ ctx }) => {
      const ids = getInitialIds()
      return ctx.prisma.image.findMany({
        where: {
          id: { in: ids },
        }
      })
    })
});
