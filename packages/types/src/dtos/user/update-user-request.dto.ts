import z from "zod";

export const UpdateUserScheme = z.object({
  id: z.string(),
  username: z.string().min(2, "User length must be at least 2"),
  password: z.string().optional(),
  roleId: z.string(),
});

export type UpdateUserRequestDto = z.infer<typeof UpdateUserScheme>;
