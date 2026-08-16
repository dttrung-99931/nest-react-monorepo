import { UseGuards } from '@nestjs/common';
import { BaseController } from './base.controller';
import { ApiAuthGuard } from 'src/decorators/auth/api-auth.guard';
import { PermissionGuard } from 'src/decorators/permission.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(ApiAuthGuard, PermissionGuard)
@ApiBearerAuth()
export abstract class BaseAuthController extends BaseController {}
