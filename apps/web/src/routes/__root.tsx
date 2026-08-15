import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { LoginModel } from "../features/auth/models/login.model";

export type RouterContext = {
  auth: LoginModel | null;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => <div>NOt Found</div>,
});

function RootComponent() {
  return <Outlet></Outlet>;
}
