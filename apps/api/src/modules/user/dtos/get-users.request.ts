import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetUsersRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  q?: string;
}
