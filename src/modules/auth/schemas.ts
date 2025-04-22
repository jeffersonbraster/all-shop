import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
  username: z.string().min(3, "Username must be at least 3 characters long")
  .max(63, "Username must be less than 64 characters long")
  .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "Username must contain only letters, numbers and hyphens")
  .refine((val) => !val.includes("--"), "Username cannot contain double hyphens")
  .transform((val) => val.toLowerCase()),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
});