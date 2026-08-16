import { Request } from 'express';
import { AuthUserModel } from './login/auth-user.model';

export type AuthRequest = Request & {
  user: AuthUserModel | null;
};
