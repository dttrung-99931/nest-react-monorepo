import {
  FormApi,
  useForm,
  type ReactFormExtendedApi,
  type StandardSchemaV1,
} from "@tanstack/react-form";

export function useAppForm<TForm>({
  schema,
  defaultValues,
  onSubmit,
}: UseFormParams<TForm>): UseFormResult<TForm> {
  const form = useForm({
    validators: {
      onChange: schema,
    },
    defaultValues: defaultValues as TForm,
    onSubmit: ({ value, formApi }) => {
      onSubmit?.({ value, form: formApi });
    },
  });

  return { form };
}

export interface UseFormParams<TForm> {
  schema: StandardSchemaV1<TForm>;
  defaultValues: TForm;
  onSubmit?: (args: { value: TForm; form: AppFormApi<TForm> }) => void;
}

type AppFormApi<TForm> = FormApi<
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

type AppForm<TForm> = ReactFormExtendedApi<
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

export interface UseFormResult<TForm> {
  form: AppForm<TForm>;
  isLoading?: boolean;
}
