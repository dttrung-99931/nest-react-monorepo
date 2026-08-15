import { RoleResponse } from '../../role/dtos/role.response';

export type UserResponse = {
  id: string;
  nickname: string;
  role: RoleResponse;
};
