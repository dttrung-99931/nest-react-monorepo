import { database } from '@monorepo/database';
import { allPermissions } from 'src/modules/permission/models/permission.model';
import { allRoles } from 'src/modules/permission/models/role.model';

async function seedDb() {
  // Upsert permissions
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

  // Upsert roles with their permissions
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
