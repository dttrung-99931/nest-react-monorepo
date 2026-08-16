import { RoleResponse } from '../../role/dtos/role.response';

export type UserResponse = {
  id: string;
  email: string;
  role: RoleResponse;
};
