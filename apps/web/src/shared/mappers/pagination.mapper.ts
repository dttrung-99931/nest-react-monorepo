import type { CursorPaginationDto, OffsetPaginationDto } from "@monorepo/types";
import type {
  CursorPaginationModel,
  OffsetPaginationModel,
} from "../model/base/pagination";

export function toOffsetPaginationModel<TItemModel, TItemDto>(
  paginationDto: OffsetPaginationDto<TItemDto>,
  mapItem: (item: TItemDto) => TItemModel,
): OffsetPaginationModel<TItemModel> {
  return {
    items: (paginationDto.items ?? []).map(mapItem),
    total: paginationDto.total ?? 0,
  };
}

export function toCursorPaginationModel<TItemModel, TItemDto>(
  paginationDto: CursorPaginationDto<TItemDto>,
  mapItem: (item: TItemDto) => TItemModel,
): CursorPaginationModel<TItemModel> {
  return {
    items: (paginationDto.items ?? []).map(mapItem),
    nextCursor: paginationDto.nextCursor ?? null,
  };
}
