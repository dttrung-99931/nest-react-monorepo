import { Button, Input } from "@monorepo/ui";
import type { FC } from "react";
import { useLoginForm } from "../hooks/useLoginForm";

type LoginFormProps = {
  defaultEmail?: string;
  successMessage?: string | null;
};

export const LoginForm: FC<LoginFormProps> = ({
  defaultEmail,
  successMessage,
}) => {
  const { form, isLoading } = useLoginForm({ defaultEmail });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      {successMessage ? (
        <p className="text-sm text-muted-foreground">{successMessage}</p>
      ) : null}

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
            autoComplete="current-password"
          />
        )}
      </form.Field>

      <form.Subscribe<boolean>
        selector={(state) => state.isValid && state.isDirty}
      >
        {(isValid) => (
          <Button disabled={!isValid} isLoading={isLoading} type="submit">
            Login
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};
