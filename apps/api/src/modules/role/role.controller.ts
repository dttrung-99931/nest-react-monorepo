import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseAuthController } from 'src/base/base-auth.controller';
import { AssignPermissionsRequest } from './dtos/assign-permissions.request';
import { GetRolePermissionsRequest } from './dtos/get-role-permission.request';
import { GetRolesRequest } from './dtos/get-roles.request';
import { RoleRequest } from './dtos/role.request';
import { RoleService } from './role.service';

@ApiTags('role')
@Controller('role')
export class RoleController extends BaseAuthController {
  constructor(private readonly roleService: RoleService) {
    super();
  }

  @Post()
  @ApiOperation({ summary: 'Create role' })
  create(@Body() body: RoleRequest) {
    return this.handleRequest(async () => {
      return this.roleService.create(body);
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  getAll(@Query() query: GetRolesRequest) {
    return this.handleRequest(async () => {
      return this.roleService.getAll(query);
    });
  }

  @Get(':roleId/permissions')
  @ApiOperation({ summary: 'Get role permissions' })
  getRolePermissions(@Param() params: GetRolePermissionsRequest) {
    return this.handleRequest(async () => {
      return this.roleService.getRolePermissions(params.roleId);
    });
  }

  @Post('permissions')
  @ApiOperation({ summary: 'Assign permissions' })
  assignPermissions(@Body() body: AssignPermissionsRequest) {
    return this.handleRequest(async () => {
      await this.roleService.assignPermssionsToRole(body);
      return true;
    });
  }
}
