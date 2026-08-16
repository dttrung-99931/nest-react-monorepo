import type { Exception } from "@monorepo/types";
import { useQuery, type RefetchOptions } from "@tanstack/react-query";
import { useEffect } from "react";
import { showErrorToast } from "../../../utils/toast";
import type { BaseResponseModel } from "../../model/base/base-response.model";

function unwrapBaseResponseModel<TModel>(
  raw: BaseResponseModel<TModel>,
): TModel {
  return raw.data as TModel;
}

export function useAppQuery<
  TModel,
  TQueryFnData = BaseResponseModel<TModel>,
>({
  queryKey,
  queryFn,
  onError,
  select,
}: UseAppQueryParams<TModel, TQueryFnData>): UseQueryCustomResult<TModel> {
  const { isLoading, data, error, refetch } = useQuery<
    TQueryFnData,
    Exception,
    TModel
  >({
    queryKey,
    queryFn,
    select:
      select ??
      (unwrapBaseResponseModel as (data: TQueryFnData) => TModel),
  });

  useEffect(() => {
    if (onError) {
      onError(error);
      return;
    }

    if (error) {
      showErrorToast(error.message);
    }
  }, [error, onError]);

  return {
    isLoading,
    data: (data ?? undefined) as TModel,
    error: error as Exception | null,
    refetch,
  };
}

export type RefetchFuncType = (options?: RefetchOptions) => Promise<unknown>;

export interface UseQueryCustomResult<TData = unknown> {
  data: TData;
  error: Exception | null;
  isLoading: boolean;
  refetch: RefetchFuncType;
}

export type UseAppQueryParams<
  TModel,
  TQueryFnData = BaseResponseModel<TModel>,
> = {
  queryKey: unknown[];
  queryFn: () => Promise<TQueryFnData>;
  select?: (data: TQueryFnData) => TModel;
  onError?: (error: Exception | null) => void;
};
