import { Injectable } from '@nestjs/common';
import { database } from '@panda-chat/database';
import { BaseService } from 'src/base/base.service';
import { GetPermissionsRequest } from './dtos/get-permissions.request';
import { PermissionResponse } from './dtos/permission.response';

@Injectable()
export class PermissionService extends BaseService {
  async getAll(
    request: GetPermissionsRequest,
  ): Promise<Array<PermissionResponse>> {
    return await database.permission.findMany();
  }
}
