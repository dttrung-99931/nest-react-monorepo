import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseAuthController } from 'src/base/base-auth.controller';
import { CreateUserRequest } from './dtos/create-user.request';
import { GetUserByIdRequest } from './dtos/get-user-by-id.request';
import { GetUsersRequest } from './dtos/get-users.request';
import { UpdateUserRequest } from './dtos/update-user.request';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController extends BaseAuthController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  getAll(@Query() query: GetUsersRequest) {
    return this.handleRequest(async () => {
      return this.userService.getAll(query);
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  getById(@Param() params: GetUserByIdRequest) {
    return this.handleRequest(async () => {
      return this.userService.getById(params.id);
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() body: CreateUserRequest) {
    return this.handleRequest(async () => {
      return this.userService.create(body);
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  updateUser(@Body() body: UpdateUserRequest) {
    return this.handleRequest(async () => {
      return this.userService.update(body);
    });
  }
}
