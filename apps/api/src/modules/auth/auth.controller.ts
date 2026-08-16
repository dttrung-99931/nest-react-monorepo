import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { AuthService } from './auth.service';
import { LoginRequest } from './dtos/login.request';
import { SignUpRequest } from './dtos/sign-up.request';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private service: AuthService) {
    super();
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  @HttpCode(HttpStatus.OK)
  login(@Body() request: LoginRequest) {
    return this.handleRequest(() => {
      return this.service.login(request);
    });
  }

  @Post('signup')
  @ApiOperation({ summary: 'Sign up with email and password' })
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() request: SignUpRequest) {
    return this.handleRequest(() => {
      return this.service.signUp(request);
    });
  }
}
