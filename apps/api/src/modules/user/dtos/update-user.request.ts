import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserRequest {
  @IsString()
  @ApiProperty({ example: 'b7e61455-ca43-4e63-b216-fbb92b9bb8ba' })
  id: string;

  @IsString()
  @MinLength(2, { message: 'User length must be at least 2' })
  @ApiProperty({ example: 'john' })
  nickname: string;

  @IsString()
  @ApiProperty({ example: 'user' })
  roleId: string;
}
