import { Injectable } from '@nestjs/common';
import { database } from '@monorepo/database';
import { BaseService } from 'src/base/base.service';
import { PermissionResponse } from '../permission/dtos/permission.response';
import { AssignPermissionsRequest } from './dtos/assign-permissions.request';
import { GetRolesRequest } from './dtos/get-roles.request';
import { RoleRequest } from './dtos/role.request';
import { RoleResponse } from './dtos/role.response';

@Injectable()
export class RoleService extends BaseService {
  create = async (request: RoleRequest): Promise<RoleResponse> => {
    return this.handleError(() =>
      database.role.create({
        data: {
          id: request.id,
          name: request.name,
        },
      }),
    );
  };

  getAll = async (request: GetRolesRequest): Promise<Array<RoleResponse>> => {
    return this.handleError(() =>
      database.role.findMany({
        // where: {
        //   name: {
        //     contains: request.name,
        //   },
        // },
      }),
    );
  };

  getById = async (roleId: string): Promise<RoleResponse> => {
    return this.handleError(() =>
      database.role.findUniqueOrThrow({
        where: {
          id: roleId,
        },
      }),
    );
  };

  assignPermssionsToRole = async ({
    roleId,
    permissionIds,
  }: AssignPermissionsRequest): Promise<void> => {
    await database.rolePermission.deleteMany({
      where: {
        roleId: roleId,
      },
    });
    await database.rolePermission.createMany({
      data: permissionIds.map((permissionId) => ({
        // RolePermissions.id has no default value, so build a deterministic one
        id: `${roleId}:${permissionId}`,
        roleId: roleId,
        permissionId: permissionId,
      })),
    });
  };

  getRolePermissions = async (
    roleId: string,
  ): Promise<Array<PermissionResponse>> => {
    return this.handleError(async () => {
      const permissions = await database.permission.findMany({
        where: {
          rolePermissions: {
            some: {
              roleId: roleId,
            },
          },
        },
      });
      return permissions;
    });
  };
}
