import type {
  BaseResponse,
  LoginResponseDto,
  SignUpResponseDto,
} from "@monorepo/types";
import axiosInstance from "../../../shared/api/axios";
import { toBaseResponseModel } from "../../../shared/mappers/base-response.mapper";
import { storageService } from "../../../shared/services/storage.service";
import {
  toLoginModel,
  toLoginRequestDto,
  toSignUpRequestDto,
} from "../mappers/auth.mapper";
import type { LoginRequestModel } from "../models/login-request.model";
import type { LoginModel } from "../models/login.model";
import type { SignUpRequestModel } from "../models/sign-up-request.model";
import type { AuthService } from "./auth.service";

export class AuthServiceImpl implements AuthService {
  getLogin(): LoginModel | null {
    return storageService.getLogin();
  }

  saveLogin(login: LoginModel) {
    storageService.setLogin(login);
  }

  async login(request: LoginRequestModel) {
    const res: BaseResponse<LoginResponseDto> = await axiosInstance.post(
      "/auth/login",
      toLoginRequestDto(request),
    );
    return toBaseResponseModel(res, toLoginModel);
  }

  async signUp(request: SignUpRequestModel) {
    const res: BaseResponse<SignUpResponseDto> = await axiosInstance.post(
      "/auth/signup",
      toSignUpRequestDto(request),
    );
    return toBaseResponseModel(res, toLoginModel);
  }

  logout = async () => {
    storageService.removeLogin();
  };
}
