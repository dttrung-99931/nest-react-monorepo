export type PermissionModel = {
  // Human readable id, also used as the permission code in decorators
  id: string;
  name: string;
};

export const permissions = {
  chat: {
    view: {
      id: 'chat:view',
      name: 'View chat',
    },
    join: {
      id: 'chat:join',
      name: 'Join chat',
    },
  },
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
  permissions.chat.join,
  permissions.chat.view,
];
