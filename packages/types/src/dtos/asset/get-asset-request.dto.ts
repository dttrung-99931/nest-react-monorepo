import z from "zod";

export const GetAssetScheme = z.object({
  // coerce: convert input to target type before validating
  parentAssetId: z.coerce.number().optional(),
  locationId: z.coerce.number().optional(),
});

export type GetAssetRequestDto = z.infer<typeof GetAssetScheme>;
