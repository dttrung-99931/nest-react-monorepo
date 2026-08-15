import { Injectable } from '@nestjs/common';
import { database } from '@panda-chat/database';
import { Exception } from '@panda-chat/types';
import { BaseService } from 'src/base/base.service';
import { HashService } from '../auth/hash.service';
import { CreateUserRequest } from './dtos/create-user.request';
import { GetUsersRequest } from './dtos/get-users.request';
import { UpdateUserRequest } from './dtos/update-user.request';
import { UserResponse } from './dtos/user.response';

@Injectable()
export class UserService extends BaseService {
  constructor(private readonly hashService: HashService) {
    super();
  }

  async getAll(request: GetUsersRequest): Promise<Array<UserResponse>> {
    const users = await database.user.findMany({
      include: {
        role: true,
      },
    });

    return users.map((user) => ({
      id: user.id,
      role: user.role,
      nickname: user.nickname,
    }));
  }

  async getById(id: string): Promise<UserResponse> {
    const user = await database.user.findUnique({
      where: {
        id: id,
      },
      include: {
        role: true,
      },
    });

    if (!user) {
      throw Exception.notFound({
        id: id,
        type: 'user',
      });
    }

    return user;
  }

  async create(request: CreateUserRequest): Promise<UserResponse> {
    return database.user.create({
      data: request,
      include: {
        role: true,
      },
    });
  }

  async update(user: UpdateUserRequest): Promise<UserResponse> {
    return database.user.update({
      where: {
        id: user.id,
      },
      data: {
        nickname: user.nickname,
        roleId: user.roleId,
      },
      include: {
        role: true,
      },
    });
  }
}
