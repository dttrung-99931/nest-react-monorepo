import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Exception } from '@panda-chat/types';
import { cacheKeys } from 'src/config/cache.keys';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthRequest } from 'src/modules/auth/models/auth.request';
import { LoginJwtPayloadModel } from 'src/modules/auth/models/login/jwt-payload.model';
import { SwrCacheService } from 'src/modules/cache/swr-cache.service';
import { RoleService } from 'src/modules/role/role.service';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private cacheService: SwrCacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    const tokenHeader = request.headers.authorization;
    const token = tokenHeader?.substring(7);
    if (!token) {
      throw Exception.unauthenticated('Authorization bearer token required!');
    }

    const jwtPayload: LoginJwtPayloadModel | null =
      this.authService.verifyToken(token);
    if (!jwtPayload) {
      throw Exception.unauthenticated('Invalid token');
    }

    const user = await this.cacheService.getOrSetOnMissed(
      cacheKeys.user(jwtPayload.userId),
      async () => {
        return await this.userService.getById(jwtPayload.userId);
      },
    );
    if (!user) {
      throw Exception.unauthenticated(`Not found user ${jwtPayload.userId}`);
    }

    const permissions = await this.cacheService.getOrSetOnMissed(
      cacheKeys.rolePermissions(user.role.id),
      async () => await this.roleService.getRolePermissions(user.role.id),
    );

    request.user = {
      jwtPayload,
      role: user.role,
      permissions: permissions ?? [],
    };

    return true;
  }
}
