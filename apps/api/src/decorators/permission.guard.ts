import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Exception } from '@monorepo/types';
import { AuthRequest } from 'src/modules/auth/models/auth.request';
import {
  REQUIRE_ANY_PERMISSIONS_KEY,
  REQUIRE_PERMISSIONS_KEY,
} from './permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    if (!request.user) {
      throw Exception.unauthenticated(
        'Request is not authenticated. Make sure auth guard is above permission guard!',
      );
    }

    // Extract required permission, required any permissions from PermissionDecorator
    const requiredPermissions =
      this.reflector.getAllAndOverride<string[]>(REQUIRE_PERMISSIONS_KEY, [
        context.getClass(),
        context.getHandler(),
      ]) ?? [];

    const requiredAnyPermissions =
      this.reflector.getAllAndOverride<string[]>(REQUIRE_ANY_PERMISSIONS_KEY, [
        context.getClass(),
        context.getHandler(),
      ]) ?? [];

    if (
      requiredPermissions.length === 0 &&
      requiredAnyPermissions.length === 0
    ) {
      return true;
    }

    const userPermissions = request.user?.permissions.map(
      (permission) => permission.id,
    );

    // Check user has all requiredPermissions
    const missingPermissions: string[] = [];
    for (const requiredPer of requiredPermissions) {
      if (!userPermissions.includes(requiredPer)) {
        missingPermissions.push(requiredPer);
      }
    }
    if (missingPermissions.length > 0) {
      throw Exception.unauthorized(
        `Required permissions: ${missingPermissions}`,
      );
    }

    // Check user any of requiredAnyPermissions
    if (
      requiredAnyPermissions.length > 0 &&
      !requiredAnyPermissions.some((per) => userPermissions.includes(per))
    ) {
      throw Exception.unauthorized(
        `Required one of permissions: ${requiredAnyPermissions}`,
      );
    }

    return true;
  }
}
