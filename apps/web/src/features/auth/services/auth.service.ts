import type { BaseResponseModel } from "../../../shared/model/base/base-response.model";
import type { LoginRequestModel } from "../models/login-request.model";
import type { LoginModel } from "../models/login.model";
import type { SignUpRequestModel } from "../models/sign-up-request.model";
import { AuthServiceImpl } from "./auth.service.impl";

export interface AuthService {
  getLogin(): LoginModel | null;
  saveLogin(login: LoginModel): void;
  login(request: LoginRequestModel): Promise<BaseResponseModel<LoginModel>>;
  signUp(request: SignUpRequestModel): Promise<BaseResponseModel<LoginModel>>;
  logout(): Promise<void>;
}

export const authService: AuthService = new AuthServiceImpl();
