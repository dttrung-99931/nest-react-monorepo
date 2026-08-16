export type OffsetPaginationModel<T> = {
  items: T[];
  total: number;
};

export type CursorPaginationModel<T> = {
  items: T[];
  nextCursor: number | string | null;
};
