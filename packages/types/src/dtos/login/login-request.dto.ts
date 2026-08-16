import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Valid email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginRequestDto = z.infer<typeof loginSchema>;
