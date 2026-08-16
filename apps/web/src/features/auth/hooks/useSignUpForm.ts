import { signUpSchema } from "@monorepo/types";
import { useRef } from "react";
import { z } from "zod";
import {
  useAppForm,
  type UseFormResult,
} from "../../../shared/hooks/base/useAppForm";
import { useAppMutation } from "../../../shared/hooks/base/useAppMutation";
import type { LoginModel } from "../models/login.model";
import type { SignUpRequestModel } from "../models/sign-up-request.model";
import { authService } from "../services/auth.service";

const signUpFormSchema = signUpSchema
  .extend({
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormModel = z.infer<typeof signUpFormSchema>;

type UseSignUpFormParams = {
  onSuccess?: (email: string) => void;
};

export function useSignUpForm(
  params?: UseSignUpFormParams,
): UseFormResult<SignUpFormModel> {
  const submittedEmailRef = useRef("");
  const { isLoading, mutate } = useAppMutation<SignUpRequestModel, LoginModel>({
    mutationFn: (request) => authService.signUp(request),
    onSuccess: () => {
      params?.onSuccess?.(submittedEmailRef.current);
    },
  });

  const { form } = useAppForm<SignUpFormModel>({
    schema: signUpFormSchema,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: ({ value }) => {
      submittedEmailRef.current = value.email;
      mutate({
        email: value.email,
        password: value.password,
      });
    },
  });

  return {
    form: form,
    isLoading,
  };
}
