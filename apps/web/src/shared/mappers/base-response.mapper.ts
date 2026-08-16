import type { BaseResponse } from "@monorepo/types";
import type { BaseResponseModel } from "../model/base/base-response.model";

export function toBaseResponseModel<TDto, TModel>(
  dto: BaseResponse<TDto>,
  mapData: (data: TDto) => TModel,
): BaseResponseModel<TModel> {
  return {
    status: dto.status,
    data: dto.data == null ? null : mapData(dto.data),
    error: dto.error,
    success: dto.success,
  };
}
