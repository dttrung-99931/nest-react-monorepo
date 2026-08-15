import { z } from '@panda-chat/common';

export const SignUpScheme = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export type SignUpRequest = z.infer<typeof SignUpScheme>;
