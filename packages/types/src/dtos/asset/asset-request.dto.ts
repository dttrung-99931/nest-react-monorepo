import z from "zod";
import { messages } from "../../constants/messages";

export const AssetScheme = z
  .object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    locationId: z.number().optional(),
    parentAssetId: z.number().optional(),
  })
  .refine(
    (check) => check.locationId || check.parentAssetId,
    messages.validation.locationIdOrParentAssetIdRequired
  );

export type AssetRequestDto = z.infer<typeof AssetScheme>;
