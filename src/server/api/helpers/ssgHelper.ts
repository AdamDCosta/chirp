import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../root";
import { prisma } from "~/server/db";
import superjson from "superjson";

export const generateSSGGelper = () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, currentUserId: null },
    transformer: superjson,
  });