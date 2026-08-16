export type PermissionModel = {
  // Human readable id, also used as the permission code in decorators
  id: string;
  name: string;
};

export const permissions = {
  user: {
    view: {
      id: 'user:view',
      name: 'View Users',
    },
    edit: {
      id: 'user:edit',
      name: 'Edit users',
    },
  },
};

export const allPermissions: Array<PermissionModel> = [
  permissions.user.edit,
  permissions.user.view,
];
