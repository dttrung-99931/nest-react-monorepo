import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetPermissionsRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  q?: string;
}
