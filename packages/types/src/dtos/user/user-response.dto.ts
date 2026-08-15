import { RoleResponseDto } from "..";

export type UserResponseDto = {
  id: string;
  username: string;
  role: RoleResponseDto;
};
