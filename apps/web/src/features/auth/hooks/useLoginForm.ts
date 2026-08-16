import { loginSchema } from "@monorepo/types";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  useAppForm,
  type UseFormResult,
} from "../../../shared/hooks/base/useAppForm";
import { useAppMutation } from "../../../shared/hooks/base/useAppMutation";
import { useAuth } from "../../../shared/hooks/useAuth";
import type { LoginRequestModel } from "../models/login-request.model";
import type { LoginModel } from "../models/login.model";
import { authService } from "../services/auth.service";

type UseLoginFormParams = {
  defaultEmail?: string;
};

export function useLoginForm(
  params?: UseLoginFormParams,
): UseFormResult<LoginRequestModel> {
  const { setLogin } = useAuth();
  const navigate = useNavigate();
  const { isLoading, mutate } = useAppMutation<LoginRequestModel, LoginModel>({
    mutationFn: (request) => authService.login(request),
    onSuccess: (data: LoginModel) => {
      setLogin(data);
      navigate({
        to: "/",
      });
    },
  });

  const { form } = useAppForm<LoginRequestModel>({
    schema: loginSchema,
    defaultValues: {
      email: params?.defaultEmail ?? "",
      password: "",
    },
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  useEffect(() => {
    if (params?.defaultEmail) {
      form.setFieldValue("email", params.defaultEmail);
    }
  }, [form, params?.defaultEmail]);

  return {
    form: form,
    isLoading,
  };
}
