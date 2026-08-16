import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Exception } from '@monorepo/types';
import { Observable } from 'rxjs';
import { cacheKeys } from 'src/config/cache.keys';
import { AuthService } from 'src/modules/auth/auth.service';
import { AuthUserModel } from 'src/modules/auth/models/login/auth-user.model';
import { LoginJwtPayloadModel } from 'src/modules/auth/models/login/jwt-payload.model';
import { SwrCacheService } from 'src/modules/cache/swr-cache.service';
import { RoleService } from 'src/modules/role/role.service';
import { UserService } from 'src/modules/user/user.service';

export abstract class BaseAuthGuard implements CanActivate {
  constructor(
    protected authService: AuthService,
    protected userService: UserService,
    protected roleService: RoleService,
    protected cacheService: SwrCacheService,
  ) {}

  abstract canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean>;

  /**
   * Authenticates a JWT token and returns an AuthUserModel if valid,
   * else returns null. Subclasses must implement this.
   * @param token
   */
  async authenticateToken(
    token: string | null | undefined,
  ): Promise<AuthUserModel> {
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

    return {
      jwtPayload,
      role: user.role,
      permissions: permissions ?? [],
    };
  }
}
