import { signUpSchema } from '@monorepo/types';
import { createZodDto } from 'nestjs-zod';

export class SignUpRequest extends createZodDto(signUpSchema) {}
