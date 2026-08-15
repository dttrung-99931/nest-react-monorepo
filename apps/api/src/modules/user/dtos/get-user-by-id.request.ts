import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetUserByIdRequest {
  @IsString()
  @ApiProperty({ example: 'b7e61455-ca43-4e63-b216-fbb92b9bb8ba' })
  id: string;
}
