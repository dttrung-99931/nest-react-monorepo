import axios, { AxiosError, type AxiosResponse } from "axios";
import type { BaseResponse } from "@panda-chat/types";
import { showErrorToast } from "../../utils/toast";
import { storageService } from "../services/storage.service";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  validateStatus: (status) =>
    // status for successful callback
    [200, 201, 404, 401, 403, 409, 500].includes(status),
});

// Request Interceptor adding token
axiosInstance.interceptors.request.use(
  (request) => {
    const login = storageService.getLogin();
    request.headers.Authorization = `Bearer ${login?.token}`;
    return request;
  },
  (error) => {
    return error;
  },
);

// Response interceptor mapping base reponse
axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    await handleResponseError(response);
    return response.data;
  },
  (error: AxiosError) => {
    handleUnknownError(error);
    return error;
  },
);

async function handleResponseError<T>(
  response: AxiosResponse<BaseResponse<T>, any, {}>,
) {
  const apiUrl = response.config.url;
  const isLoginApi = apiUrl?.includes("auth/login");
  // Back to /login on 401
  if (response.status === 401 && !isLoginApi) {
    console.log("Logut");
    await storageService.removeLogin();
    // Lazy import router that prevent import circle
    // router -> page -> service -> axious -> router
    // const { router } = await import("../../router");
    // router.navigate({
    //   to: "/login",
    //   search: {
    //     cancelAutoHomeRedirect: true,
    //   },
    // });
    showErrorToast("Login session expired. Please login again.");
    return;
  }

  // Throw other error
  if (response.data.error && response.status != 401) {
    throw response.data.error;
  }
}

function handleUnknownError(error: AxiosError<unknown, any>) {
  console.error(error);
}

export default axiosInstance;
