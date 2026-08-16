import { Button, Input } from "@monorepo/ui";
import type { FC } from "react";
import { useSignUpForm } from "../hooks/useSignUpForm";

type SignUpFormProps = {
  onSuccess?: (email: string) => void;
};

export const SignUpForm: FC<SignUpFormProps> = ({ onSuccess }) => {
  const { form, isLoading } = useSignUpForm({ onSuccess });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="email">
        {(field) => (
          <Input
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            type="email"
            placeholder="Email"
            autoComplete="email"
          />
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <Input
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
        )}
      </form.Field>

      <form.Field name="confirmPassword">
        {(field) => (
          <div className="flex flex-col gap-1">
            <Input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              type="password"
              placeholder="Confirm password"
              autoComplete="new-password"
            />
            {field.state.meta.errors[0] != null && (
              <span className="text-xs text-destructive">
                {String(
                  typeof field.state.meta.errors[0] === "string"
                    ? field.state.meta.errors[0]
                    : (field.state.meta.errors[0] as { message?: string })
                        .message ?? "Passwords do not match",
                )}
              </span>
            )}
          </div>
        )}
      </form.Field>

      <form.Subscribe<boolean>
        selector={(state) => state.isValid && state.isDirty}
      >
        {(isValid) => (
          <Button disabled={!isValid} isLoading={isLoading} type="submit">
            Sign up
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
