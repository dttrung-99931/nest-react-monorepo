import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { SwrCacheService } from 'src/modules/cache/swr-cache.service';
import { RoleService } from 'src/modules/role/role.service';
import { UserService } from 'src/modules/user/user.service';
import { BaseAuthGuard } from './base-auth.guard';
import { AuthRequest } from 'src/modules/auth/models/auth.request';

@Injectable()
export class ApiAuthGuard extends BaseAuthGuard {
  constructor(
    authService: AuthService,
    userService: UserService,
    roleService: RoleService,
    cacheService: SwrCacheService,
  ) {
    super(authService, userService, roleService, cacheService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthRequest = context
      .switchToHttp()
      .getRequest<AuthRequest>();
    const tokenHeader = request.headers.authorization;
    const token = tokenHeader?.substring(7);
    const user = await this.authenticateToken(token);
    request.user = user;
    return true;
  }
}
