import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseAuthController } from 'src/base/base-auth.controller';
import { GetPermissionsRequest } from './dtos/get-permissions.request';
import { PermissionService } from './permission.service';

@ApiTags('permission')
@Controller('permission')
export class PermissionController extends BaseAuthController {
  constructor(private readonly permissionService: PermissionService) {
    super();
  }

  @Get()
  @ApiOperation({ summary: 'Get all permissions' })
  getAll(@Query() query: GetPermissionsRequest) {
    return this.handleRequest(async () => {
      return this.permissionService.getAll(query);
    });
  }
}
