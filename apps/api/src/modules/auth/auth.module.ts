import { forwardRef, Module } from '@nestjs/common';
import { ApiAuthGuard } from 'src/decorators/auth/api-auth.guard';
import { PermissionGuard } from 'src/decorators/permission.guard';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashService } from './hash.service';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => RoleModule)],
  controllers: [AuthController],
  providers: [
    UserService,
    RoleService,
    AuthService,
    HashService,
    ApiAuthGuard,
    PermissionGuard,
  ],
  exports: [
    UserService,
    RoleService,
    AuthService,
    ApiAuthGuard,
    PermissionGuard,
  ],
})
export class AuthModule {}
