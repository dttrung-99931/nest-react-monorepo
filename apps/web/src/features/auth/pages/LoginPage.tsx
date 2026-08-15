import { Button, Card, FieldDescription, Input } from "@panda-chat/ui";
import type { FC } from "react";
import { useLoginForm } from "../hooks/useLoginForm";

interface ILoginPageProps {}

export const LoginPage: FC<ILoginPageProps> = () => {
  const { form, isLoading } = useLoginForm();
  return (
    <div className="h-full flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <Card className="shadow-md p-8">
          <FieldDescription className="text-lg">
            Enter your nickname to enter chat
          </FieldDescription>

          <form.Field name="nickname">
            {(field) => (
              <Input
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                type="text"
                placeholder="Nickname"
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
        </Card>
      </form>
    </div>
  );
};
