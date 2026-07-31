import { PrismaClient } from '@prisma/client';

/**
 * Global Prisma Client Singleton for Artron Sports OS.
 * Prevents multiple instances of Prisma Client during Next.js HMR (Hot Module Replacement).
 */
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
