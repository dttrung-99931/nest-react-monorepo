import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginRequest } from './dtos/login.request';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { BaseController } from 'src/base/base.controller';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private service: AuthService) {
    super();
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email & pwd' })
  @HttpCode(HttpStatus.OK)
  login(@Body() request: LoginRequest) {
    return this.handleRequest(() => {
      return this.service.login(request);
    });
  }
}
