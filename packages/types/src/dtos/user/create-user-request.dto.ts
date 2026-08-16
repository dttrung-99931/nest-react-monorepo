import z from "zod";

export const CreateUserScheme = z.object({
  id: z.string().optional(),
  email: z.email({ message: "Valid email is required" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roleId: z.string(),
});

export type CreateUserRequestDto = z.infer<typeof CreateUserScheme>;
