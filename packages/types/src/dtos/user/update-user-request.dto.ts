import z from "zod";

export const UpdateUserScheme = z.object({
  id: z.string(),
  email: z.email({ message: "Valid email is required" }),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  roleId: z.string(),
});

export type UpdateUserRequestDto = z.infer<typeof UpdateUserScheme>;
