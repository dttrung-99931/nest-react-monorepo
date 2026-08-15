import z from "zod";

export const GetUserByIdRequestScheme = z.object({
  id: z.string(),
});

export type GetUserByIdRequestDto = z.infer<typeof GetUserByIdRequestScheme>;
