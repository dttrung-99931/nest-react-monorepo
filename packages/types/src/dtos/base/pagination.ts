import { z } from "zod";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants";

export const offsetPaginationSchema = z.object({
  page: z.coerce.number().int().min(0).default(DEFAULT_PAGE),
  pageSize: z.coerce.number().int().min(1).default(DEFAULT_PAGE_SIZE),
});

export const cursorPaginationSchema = z.object({
  cursor: z.union([z.coerce.number(), z.string()]).optional(),
  pageSize: z.coerce.number().int().min(1).default(DEFAULT_PAGE_SIZE),
});

export type OffsetPaginationDto<T> = {
  items: T[];
  total: number;
};

export type CursorPaginationDto<T, TCursor = number> = {
  items: T[];
  nextCursor: TCursor | null;
};
