import { prisma } from "../db.js";

export const resolvers = {
  Query: {
    hello: () => "Hello from Apollo Server v5 + Prisma",
    users: () => prisma.user.findMany(),
    posts: () => prisma.post.findMany(),
  },
  Mutation: {
    createUser: (_: any, args: { name: string }) =>
      prisma.user.create({ data: { name: args.name } }),
    updateUser: async (_: any, args: { id: string; name: string }) => {
      const existedUser = await prisma.user.findUnique({
        where: { id: args.id },
      });
      if (!existedUser) throw new Error("USER_NOT_FOUND");
      return prisma.user.update({
        where: { id: args.id },
        data: { name: args.name },
      });
    },
    createPost: async (_: any, args: { userId: string; title: string }) => {
      const user = await prisma.user.findUnique({ where: { id: args.userId } });
      if (!user) throw new Error("USER_NOT_FOUND");
      return prisma.post.create({
        data: {
          title: args.title,
          authorId: args.userId,
        },
      });
    },
  },
  User: {
    posts: (parent: { id: string }) =>
      prisma.post.findMany({ where: { authorId: parent.id } }),
  },
  Post: {
    author: (parent: { authorId: string }) =>
      prisma.user.findUniqueOrThrow({ where: { id: parent.authorId } }),
  },
};
