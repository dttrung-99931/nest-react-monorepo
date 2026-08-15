import z from "zod";

export const CreateUserScheme = z.object({
  id: z.string().optional(),
  username: z.string().min(2, "User length must be at least 2"),
  password: z.string().min(2, "Password length must be at least 2"),
  roleId: z.string(),
});

export type CreateUserRequestDto = z.infer<typeof CreateUserScheme>;
