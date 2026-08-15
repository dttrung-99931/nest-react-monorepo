import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuth } from "./shared/hooks/useAuth.tsx";
import { routeTree } from "./routeTree.gen.ts";
import type { FC } from "react";

export const router = createRouter({
  routeTree: routeTree,
  context: {
    auth: null,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    label?: string | ((match: { params: Record<string, string> }) => string);
  }
}

export const RouterApp: FC = () => {
  const auth = useAuth();
  return (
    <RouterProvider
      router={router}
      context={{
        auth: auth.login,
      }}
    />
  );
};
