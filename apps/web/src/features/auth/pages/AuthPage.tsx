import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from "@monorepo/ui";
import { useState, type FC } from "react";
import { LoginForm } from "../components/LoginForm";
import { SignUpForm } from "../components/SignUpForm";

type AuthTab = "login" | "signup";

export const AuthPage: FC = () => {
  const [tab, setTab] = useState<AuthTab>("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [signUpSuccessMessage, setSignUpSuccessMessage] = useState<
    string | null
  >(null);

  return (
    <div className="h-full flex justify-center items-center">
      <Card className="shadow-md p-8 w-80">
        <Tabs
          value={tab}
          onValueChange={(value) => {
            if (value === "login" || value === "signup") {
              setTab(value);
            }
          }}
        >
          <TabsList className="w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-4">
            <LoginForm
              defaultEmail={loginEmail}
              successMessage={signUpSuccessMessage}
            />
          </TabsContent>
          <TabsContent value="signup" className="mt-4">
            <SignUpForm
              onSuccess={(email) => {
                setLoginEmail(email);
                setSignUpSuccessMessage("Sign up successful, please login");
                setTab("login");
              }}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
