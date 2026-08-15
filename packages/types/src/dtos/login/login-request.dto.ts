import { z } from "zod";

export const loginSchema = z.object({
  nickname: z.string().min(1, { message: "Nickname is required" }),
  userDeviceUUID: z.uuid().min(1, { message: "userDeviceUUID is required" }),
});

export type LoginRequestDto = z.infer<typeof loginSchema>;
