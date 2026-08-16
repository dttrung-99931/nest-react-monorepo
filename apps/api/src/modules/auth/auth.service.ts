import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User, database } from '@monorepo/database';
import { Exception, LoginResponseDto, messages } from '@monorepo/types';
import jwt from 'jsonwebtoken';
import { userRole } from 'src/modules/permission/models/role.model';
import { LoginRequest } from './dtos/login.request';
import { SignUpRequest } from './dtos/sign-up.request';
import { HashService } from './hash.service';
import { LoginJwtPayloadModel } from './models/login/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private hashService: HashService,
  ) {}

  login = async (request: LoginRequest): Promise<LoginResponseDto> => {
    const user = await database.user.findUnique({
      where: {
        email: request.email,
      },
    });
    if (!user) {
      throw Exception.unauthenticated('Invalid email or password');
    }

    const isPasswordValid = await this.hashService.verifyHash({
      data: request.password,
      hashed: user.password,
    });
    if (!isPasswordValid) {
      throw Exception.unauthenticated('Invalid email or password');
    }

    return {
      token: this.genJwtLoginToken(user),
      userId: user.id,
    };
  };

  signUp = async (request: SignUpRequest): Promise<LoginResponseDto> => {
    const existing = await database.user.findUnique({
      where: {
        email: request.email,
      },
    });
    if (existing) {
      throw Exception.conflict(messages.validation.emailExisted);
    }

    const user = await database.user.create({
      data: {
        email: request.email,
        password: await this.hashService.hash(request.password),
        roleId: userRole.id,
      },
    });

    return {
      token: this.genJwtLoginToken(user),
      userId: user.id,
    };
  };

  private genJwtLoginToken = (user: User): string => {
    const jwtPayload: LoginJwtPayloadModel = {
      userId: user.id,
      email: user.email,
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
