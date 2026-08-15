import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetRolesRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;
}
