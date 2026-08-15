import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./shared/hooks/useAuth.tsx";
import { RouterApp } from "./router.tsx";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterApp />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  );
}
