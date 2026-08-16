import {
  PermissionModel,
  allPermissions,
  permissions,
} from './permission.model';

export type RoleModel = {
  // Human readable id, ex: 'admin'
  id: string;
  name: string;
  permissions: PermissionModel[];
};

const adminRole: RoleModel = {
  id: 'admin',
  name: 'Admin',
  permissions: allPermissions,
};

const userRole: RoleModel = {
  id: 'user',
  name: 'User',
  permissions: [permissions.user.view],
};

const allRoles: RoleModel[] = [adminRole, userRole];

export { adminRole, userRole, allRoles };
