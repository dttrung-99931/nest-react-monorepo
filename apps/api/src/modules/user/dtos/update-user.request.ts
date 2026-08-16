import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserRequest {
  @IsString()
  @ApiProperty({ example: 'b7e61455-ca43-4e63-b216-fbb92b9bb8ba' })
  id: string;

  @IsEmail()
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @ApiProperty({ example: 'secret123', required: false })
  password?: string;

  @IsString()
  @ApiProperty({ example: 'user' })
  roleId: string;
}
