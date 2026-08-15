import { UseGuards } from '@nestjs/common';
import { BaseController } from './base.controller';
import { AuthGuard } from 'src/decorators/auth.guard';
import { PermissionGuard } from 'src/decorators/permission.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard, PermissionGuard)
@ApiBearerAuth()
export abstract class BaseAuthController extends BaseController {}
