import { PrismaClient } from '@prisma/client';

// @ts-expect-error: globalThis is not defined in Node.js
const prisma = globalThis.prismaGlobal ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
// @ts-expect-error: globalThis is not defined in Node.js
  globalThis.prismaGlobal = prisma;
}

export default prisma;