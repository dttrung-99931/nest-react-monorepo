export const cacheKeys = {
  user: (userId: string) => `user:${userId}`,
  rolePermissions: (roleId: string) => `role:${roleId}:permissions`,
  location: {
    getById: (id: number) => `location:${id}`,
    getAll: () => `location:all`,
  },
};
