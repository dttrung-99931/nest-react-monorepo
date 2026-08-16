import { RoleResponseDto } from "..";

export type UserResponseDto = {
  id: string;
  email: string;
  role: RoleResponseDto;
};
