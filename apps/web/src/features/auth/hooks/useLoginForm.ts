import {
  BaseResponse,
  loginSchema,
  type LoginRequestDto,
  type LoginResponseDto,
} from "@panda-chat/types";
import { useForm } from "@tanstack/react-form";
import { useAuth } from "../../../shared/hooks/useAuth";
import type { UseFormResult } from "../../../shared/model/hooks/use-form.model";
import { storageService } from "../../../shared/services/storage.service";
import { useLoginApi } from "./useLoginApi";
import { useNavigate } from "@tanstack/react-router";
import { showErrorToast } from "../../../utils/toast";

export function useLoginForm(): UseFormResult<LoginRequestDto> {
  const { setLogin } = useAuth();
  const navigate = useNavigate();
  const { isLoading, mutate } = useLoginApi({
    onSuccess: (data: BaseResponse<LoginResponseDto>) => {
      if (data.data) {
        setLogin(data.data);
        navigate({
          to: "/",
        });
      }
    },
    onError: (exception) => {
      showErrorToast(String(exception.message));
    },
  });

  const form = useForm({
    validators: {
      onChange: loginSchema,
    },
    defaultValues: {
      nickname: "",
      userDeviceUUID: storageService.getDeviceUUID(),
    } satisfies LoginRequestDto,
    onSubmit: ({ value }) => {
      mutate(value);
    },
  });

  return {
    form,
    isLoading,
  };
}
