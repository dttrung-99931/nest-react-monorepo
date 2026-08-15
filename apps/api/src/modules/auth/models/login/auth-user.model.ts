import { RoleResponseDto } from '@panda-chat/types';
import { LoginJwtPayloadModel } from './jwt-payload.model';
import { PermissionModel } from 'src/modules/permission/models/permission.model';

export type AuthUserModel = {
  jwtPayload: LoginJwtPayloadModel;
  role: RoleResponseDto;
  permissions: Array<PermissionModel>;
};
