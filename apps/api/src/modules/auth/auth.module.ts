import { forwardRef, Module } from '@nestjs/common';
import { AuthGuard } from 'src/decorators/auth.guard';
import { PermissionGuard } from 'src/decorators/permission.guard';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => RoleModule)],
  controllers: [AuthController],
  providers: [
    UserService,
    RoleService,
    AuthService,
    AuthGuard,
    PermissionGuard,
  ],
  exports: [UserService, RoleService, AuthService, AuthGuard, PermissionGuard],
})
export class AuthModule {}
