import { z } from "zod";

export const createUserSchema = z.object({
  email: z.email({
    error: "Invalid email address",
  }),

  password: z.string().min(6, {error: "Password must be at least 6 characters",}),

  role: z.enum(["user", "admin"]).optional().default("user"),
});

export const updateUserSchema = z.object({
  email: z.email({ error: "Invalid email address",}).optional(),

  password: z.string().min(6, {error: "Password must be at least 6 characters",}).optional(),

  role: z.enum(["user", "admin"]).optional(),
});