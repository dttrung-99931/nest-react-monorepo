import z from "zod";
import { messages } from "../../constants";

export const GetLocationScheme = z.object({
  locationId: z.coerce.number(messages.validation.idMustBeNumber),
});

export type GetLocationRequestDto = z.infer<typeof GetLocationScheme>;
