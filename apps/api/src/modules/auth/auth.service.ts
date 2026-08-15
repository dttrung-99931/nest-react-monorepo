import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User, database } from '@panda-chat/database';
import { Exception, LoginResponseDto } from '@panda-chat/types';
import jwt from 'jsonwebtoken';
import { userRole } from 'src/modules/permission/models/role.model';
import { LoginRequest } from './dtos/login.request';
import { HashService } from './hash.service';
import { LoginJwtPayloadModel } from './models/login/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private hashService: HashService,
  ) {}
  login = async (request: LoginRequest): Promise<LoginResponseDto> => {
    // TODO: get by username insensitive case
    let user = await database.user.findFirst({
      where: {
        id: request.userDeviceUUID,
        nickname: request.nickname,
      },
    });

    if (!user) {
      const count = await database.user.count({
        where: {
          nickname: request.nickname,
        },
      });
      if (count > 0) {
        throw Exception.conflict(`Nickname is not available!`);
      }

      user = await database.user.create({
        data: {
          id: request.userDeviceUUID,
          nickname: request.nickname,
          roleId: userRole.id,
        },
      });
    }

    return {
      token: this.genJwtLoginToken(user),
      userId: user.id,
    };
  };

  // signUp = async (request: SignUpRequest): Promise<SignUpResponse> => {
  //   await this.validateCreate(request);
  //   const user = await database.user.create({
  //     data: {
  //       nickname: request.username,
  //     },
  //   });
  //   return {
  //     token: 'Token created',
  //     userId: user.id,
  //   };
  // };

  // validateCreate = async (request: SignUpRequest) => {
  //   const existing = await database.user.findUnique({
  //     where: {
  //       username: request.username,
  //     },
  //   });
  //   if (existing) {
  //     throw Exception.conflict(messages.validation.usernameExisted);
  //   }
  // };

  private genJwtLoginToken = (user: User): string => {
    const jwtPayload: LoginJwtPayloadModel = {
      userId: user.id,
      nickname: user.nickname,
    };

    return jwt.sign(jwtPayload, this.getJWTSecret(), {
      expiresIn: '1d',
    });
  };

  getJWTSecret = () => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw Exception.internalError(
        'genJwtLoginToken error. Missing jwt secret config',
      );
    }
    return jwtSecret;
  };

  verifyToken = (token: string): LoginJwtPayloadModel | null => {
    try {
      return jwt.verify(token, this.getJWTSecret()) as LoginJwtPayloadModel;
    } catch (error) {
      console.error('Token verification failed', error);
      return null;
    }
  };
}
