import { useMutation } from "@tanstack/react-query";
import type {
  BaseResponse,
  Exception,
  LoginRequestDto,
  LoginResponseDto,
} from "@panda-chat/types";
import { authService } from "../services/auth.service";
import type {
  UseApiParams,
  UseApiResult,
} from "../../../shared/model/hooks/use-api.model";

export function useLoginApi({
  onError,
  onSuccess,
}: UseApiParams<LoginResponseDto>): UseApiResult<
  LoginRequestDto,
  LoginResponseDto
> {
  const { isPending, data, error, mutate } = useMutation<
    BaseResponse<LoginResponseDto>,
    Exception,
    LoginRequestDto
  >({
    mutationFn: (request) => {
      return authService.login(request);
    },
    onSuccess: (response: BaseResponse<LoginResponseDto>) => {
      onSuccess?.(response);
    },
    onError: (error: Exception) => {
      onError?.(error);
    },
  });

  return {
    isLoading: isPending,
    data,
    error,
    mutate,
  };
}
