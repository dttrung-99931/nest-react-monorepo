import z from "zod";

export const SignUpScheme = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export type SignUpRequestDto = z.infer<typeof SignUpScheme>;
