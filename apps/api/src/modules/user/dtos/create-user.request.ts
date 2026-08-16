import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'b7e61455-ca43-4e63-b216-fbb92b9bb8ba', required: false })
  id?: string;

  @IsEmail()
  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @ApiProperty({ example: 'secret123' })
  password: string;

  @IsString()
  @ApiProperty({ example: 'user' })
  roleId: string;
}
