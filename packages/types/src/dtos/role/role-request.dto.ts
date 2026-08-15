import z from "zod";

export const RoleScheme = z.object({
  id: z.string().min(1, "Id is required"),
  name: z.string().min(1, "Name is required"),
});

export type RoleRequestDto = z.infer<typeof RoleScheme>;
