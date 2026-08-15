import type { BaseResponse, Exception } from "@panda-chat/types";
import type { UseMutateFunction } from "@tanstack/react-query";

export type UseApiResult<TRequest, TData> = {
  isLoading: boolean;
  data: BaseResponse<TData> | undefined;
  error: Exception | null;
  mutate: UseMutateFunction<BaseResponse<TData>, Exception, TRequest, unknown>;
};

export type UseApiParams<TData = unknown> = {
  onSuccess?: (data: BaseResponse<TData>) => void;
  onError?: (error: Exception) => void;
};
