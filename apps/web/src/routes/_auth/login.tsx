import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthPage } from "../../features/auth/pages/AuthPage";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
  staticData: {
    label: "Login",
  },
  beforeLoad: ({ context }) => {
    if (context.auth) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  return <AuthPage />;
}
