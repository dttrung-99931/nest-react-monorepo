import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthRequest } from 'src/modules/auth/models/auth.request';
import { AuthUserModel } from 'src/modules/auth/models/login/auth-user.model';

export const AuthUser = createParamDecorator(
  (dat: unknown, context: ExecutionContext): AuthUserModel | undefined => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
