import * as z from "zod"
import { UserRole } from "@prisma/client"

export const UserModel = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.nativeEnum(UserRole).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})
