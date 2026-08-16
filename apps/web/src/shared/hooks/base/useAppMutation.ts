import type { Exception } from "@monorepo/types";
import { useMutation, type UseMutateFunction } from "@tanstack/react-query";
import { showErrorToast } from "../../../utils/toast";
import type { BaseResponseModel } from "../../model/base/base-response.model";

export function useAppMutation<TRequestModel, TResponseModel>(
  params: UseAppMutationParams<
    TRequestModel,
    TResponseModel,
    BaseResponseModel<TResponseModel>
  >,
): UseMutationCustomResult<
  TRequestModel,
  TResponseModel,
  BaseResponseModel<TResponseModel>
> {
  const { mutationFn, onSuccess, onError } = params;

  const { isPending, data, error, mutate } = useMutation<
    BaseResponseModel<TResponseModel>,
    Exception,
    TRequestModel
  >({
    mutationFn,
    onSuccess: (response: BaseResponseModel<TResponseModel>) => {
      onSuccess?.(response.data as TResponseModel);
    },
    onError: (mutationError) => {
      if (onError) {
        onError(mutationError);
        return;
      }
      showErrorToast(mutationError.message);
    },
  });

  return {
    isLoading: isPending,
    data: data?.data as TResponseModel | null,
    error: error ?? null,
    mutate: mutate,
  };
}

export type UseMutationCustomResult<
  TRequestModel,
  TResponseModel,
  TMutationFnData = BaseResponseModel<TResponseModel>,
> = {
  isLoading: boolean;
  data: TResponseModel | null;
  error: Exception | null;
  mutate: UseMutateFunction<
    TMutationFnData,
    Exception,
    TRequestModel,
    unknown
  >;
};

export type AppMutationCallbacks<TResponseModel> = {
  onSuccess?: (data: TResponseModel) => void;
  onError?: (error: Exception) => void;
};

type UseAppMutationParams<
  TRequestModel,
  TResponseModel,
  TMutationFnData = BaseResponseModel<TResponseModel>,
> = AppMutationCallbacks<TResponseModel> & {
  mutationFn: (request: TRequestModel) => Promise<TMutationFnData>;
};
