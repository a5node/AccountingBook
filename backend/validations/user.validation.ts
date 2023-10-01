import { Prisma } from '@prisma/client';
import { z } from 'zod';

/**
 * Zod schema
 */
export const UserCreateInput = z.object({
  password: z.string().max(100),
  name: z.string().max(15),
  email: z.string().max(100),
}) satisfies z.Schema<Prisma.UserUncheckedCreateInput>;
