import { database } from '@monorepo/database';
import { allPermissions } from 'src/modules/permission/models/permission.model';
import {
  adminRole,
  allRoles,
  userRole,
} from 'src/modules/permission/models/role.model';
import bcrypt from 'bcrypt';

async function seedDb() {
  // Permissions
  for (const permission of allPermissions) {
    const createdPermission = await database.permission.upsert({
      where: {
        id: permission.id,
      },
      create: {
        id: permission.id,
        name: permission.name,
      },
      update: {
        name: permission.name,
      },
    });
    console.log('created permission:', createdPermission);
  }

  // Roles
  for (const role of allRoles) {
    const rolePermissions = role.permissions.map((permission) => ({
      // RolePermissions.id has no default value, so build a deterministic one
      id: `${role.id}:${permission.id}`,
      permissionId: permission.id,
    }));
    const createdRole = await database.role.upsert({
      where: {
        id: role.id,
      },
      create: {
        id: role.id,
        name: role.name,
        rolePermissions: {
          createMany: {
            data: rolePermissions,
          },
        },
      },
      update: {
        name: role.name,
        rolePermissions: {
          // {} mean no filter => Delete all role's role permissions
          deleteMany: {},
          createMany: {
            data: rolePermissions,
          },
        },
      },
    });
    console.log('created role:', createdRole);
  }

  // Users
  const users = [
    // Admin
    {
      id: '1',
      email: 'admin@example.com',
      // Hash password with 10 rounds of salt, same in HashService.ROUNDS
      password: await bcrypt.hash('aa123456', 10),
      roleId: adminRole.id,
    },
    // User
    {
      id: '2',
      email: 'user@example.com',
      password: await bcrypt.hash('aa123456', 10),
      roleId: userRole.id,
    },
  ];

  for (const user of users) {
    await database.user.upsert({
      where: { id: user.id },
      create: {
        ...user,
      },
      update: {
        ...user,
      },
    });
    console.log('created user:', user);
  }
}

seedDb()
  .catch((e) => {
    console.error('❌ Error during seeding:');
    console.error(e);
  })
  .finally(() => {
    database.$disconnect();
    return;
  });
