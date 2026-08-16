import { Injectable } from '@nestjs/common';
import { database } from '@monorepo/database';
import { Exception } from '@monorepo/types';
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

  private toUserResponse(user: {
    id: string;
    email: string;
    role: UserResponse['role'];
  }): UserResponse {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async getAll(_request: GetUsersRequest): Promise<Array<UserResponse>> {
    const users = await database.user.findMany({
      include: {
        role: true,
      },
    });

    return users.map((user) => this.toUserResponse(user));
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

    return this.toUserResponse(user);
  }

  async create(request: CreateUserRequest): Promise<UserResponse> {
    const user = await database.user.create({
      data: {
        id: request.id,
        email: request.email,
        password: await this.hashService.hash(request.password),
        roleId: request.roleId,
      },
      include: {
        role: true,
      },
    });
    return this.toUserResponse(user);
  }

  async update(user: UpdateUserRequest): Promise<UserResponse> {
    const updated = await database.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user.email,
        roleId: user.roleId,
        ...(user.password
          ? { password: await this.hashService.hash(user.password) }
          : {}),
      },
      include: {
        role: true,
      },
    });
    return this.toUserResponse(updated);
  }
}
