import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class AssignPermissionsRequest {
  @IsString()
  @ApiProperty({ example: 'admin' })
  roleId: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: ['user:view', 'user:edit'] })
  permissionIds: string[];
}
