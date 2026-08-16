import { useAuth } from "./useAuth";

/**
 * Custom hook that returns the current user's ID from authentication context.
 * Returns undefined if not logged in.
 */
export function useCurrentUserId(): string {
  const { login } = useAuth();
  return login?.userId ?? "";
}
