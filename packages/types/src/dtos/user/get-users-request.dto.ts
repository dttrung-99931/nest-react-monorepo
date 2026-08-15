import z from "zod";

export const GetUsersRequestScheme = z.object({
  q: z.string().optional(),
});

export type GetUsersRequestDto = z.infer<typeof GetUsersRequestScheme>;
