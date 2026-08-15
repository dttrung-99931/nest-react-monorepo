import type { ReactFormExtendedApi } from "@tanstack/react-form";

export interface UseFormParams {}

export interface UseFormResult<TForm> {
  form: ReactFormExtendedApi<
    TForm,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >;
  isLoading?: boolean;
}
