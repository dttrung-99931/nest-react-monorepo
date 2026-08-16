import { loginSchema } from '@monorepo/types';
import { createZodDto } from 'nestjs-zod';

export class LoginRequest extends createZodDto(loginSchema) {}
