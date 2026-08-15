import z from "zod";

export const LocationScheme = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
});

export type LocationRequestDto = z.infer<typeof LocationScheme>;
