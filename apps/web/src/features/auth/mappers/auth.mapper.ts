import type { LoginRequestDto, LoginResponseDto, SignUpRequestDto } from "@monorepo/types";
import type { LoginRequestModel } from "../models/login-request.model";
import type { LoginModel } from "../models/login.model";
import type { SignUpRequestModel } from "../models/sign-up-request.model";

export function toLoginModel(dto: LoginResponseDto): LoginModel {
  return {
    userId: dto.userId,
    token: dto.token,
  };
}

export function toLoginRequestDto(model: LoginRequestModel): LoginRequestDto {
  return {
    email: model.email,
    password: model.password,
  };
}

export function toSignUpRequestDto(
  model: SignUpRequestModel,
): SignUpRequestDto {
  return {
    email: model.email,
    password: model.password,
  };
}
