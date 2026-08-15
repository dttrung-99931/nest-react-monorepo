import { loginSchema } from '@panda-chat/types';
import { createZodDto } from 'nestjs-zod';

export class LoginRequest extends createZodDto(loginSchema) {}
