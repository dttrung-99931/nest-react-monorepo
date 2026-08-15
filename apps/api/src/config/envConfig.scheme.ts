import { z } from '@panda-chat/common';

export const envConfigScheme = z.object({
  JWT_SECRET: z.string().min(1, '.env missing JWT_SECRET'),
});
