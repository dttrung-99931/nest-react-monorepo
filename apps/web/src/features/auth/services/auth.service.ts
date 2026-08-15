import axiosInstance from "../../../shared/api/axios";
import type {
  BaseResponse,
  LoginRequestDto,
  LoginResponseDto,
} from "@panda-chat/types";

import { storageService } from "../../../shared/services/storage.service";

class AuthService {
  getLogin(): LoginResponseDto | null {
    return storageService.getLogin();
  }

  saveLogin(login: LoginResponseDto) {
    storageService.setLogin(login);
  }

  async login(
    request: LoginRequestDto,
  ): Promise<BaseResponse<LoginResponseDto>> {
    const res: BaseResponse<LoginResponseDto> = await axiosInstance.post(
      "/auth/login",
      request,
    );
    return res;
  }

  logout = async () => {
    storageService.removeLogin();
  };
}

export const authService = new AuthService();
