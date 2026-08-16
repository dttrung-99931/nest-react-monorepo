import type { CreateResponseDto } from "@monorepo/types";
import type { CreateModel } from "../model/base/create.model";

export function toCreateModel<TId>(dto: CreateResponseDto<TId>): CreateModel<TId> {
  return {
    createdId: dto.createdId,
  };
}
