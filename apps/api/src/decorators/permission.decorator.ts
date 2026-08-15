import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const REQUIRE_PERMISSIONS_KEY = 'REQUIRE_PERMISSION_KEY';
export const REQUIRE_ANY_PERMISSIONS_KEY = 'REQUIRE_ANY_PERMISSIONS_KEY';

export function RequirePermissions(
  ...permissionCodes: string[]
): CustomDecorator {
  return SetMetadata(REQUIRE_PERMISSIONS_KEY, permissionCodes);
}

export function RequireAnyPermissions(
  ...permissionCodes: string[]
): CustomDecorator {
  return SetMetadata(REQUIRE_PERMISSIONS_KEY, permissionCodes);
}
