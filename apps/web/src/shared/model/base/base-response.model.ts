import type { Exception } from "@monorepo/types";

export type BaseResponseModel<T> = {
  status: number;
  data: T | null;
  error?: Exception;
  success: boolean;
};

export function createSuccessResponseModel<T>(data: T): BaseResponseModel<T> {
  return {
    status: 200,
    data,
    success: true,
  };
}
