import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetRolePermissionsRequest {
  @IsString()
  @ApiProperty({ example: 'admin' })
  roleId: string;
}
