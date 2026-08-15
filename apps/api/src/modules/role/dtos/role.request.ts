import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RoleRequest {
  @IsString()
  @MinLength(1, { message: 'Id is required' })
  @ApiProperty({ example: 'admin' })
  id: string;

  @IsString()
  @MinLength(1, { message: 'Name is required' })
  @ApiProperty({ example: 'Admin' })
  name: string;
}
