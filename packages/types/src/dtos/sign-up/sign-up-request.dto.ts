import { z } from "zod";

export const signUpSchema = z.object({
  email: z.email({ message: "Valid email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type SignUpRequestDto = z.infer<typeof signUpSchema>;
