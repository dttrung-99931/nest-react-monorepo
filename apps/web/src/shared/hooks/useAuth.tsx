import React, { createContext, useCallback, useState } from "react";
import type { LoginModel } from "../../features/auth/models/login.model";
import { storageService } from "../services/storage.service";

type AuthContextType = {
  login: LoginModel | null;
  setLogin: (auth: LoginModel) => void;
};

const AuthContext = createContext<AuthContextType>({
  login: null,
  setLogin: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, _setAuth] = useState<LoginModel | null>(
    storageService.getLogin(),
  );

  const setLogin = useCallback(
    (login: LoginModel) => {
      _setAuth(login);
      storageService.setLogin({
        token: login.token,
        userId: login.userId,
      });
    },
    [_setAuth],
  );

  return (
    <AuthContext.Provider
      value={{
        login: auth,
        setLogin: setLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const auth: AuthContextType = React.useContext(AuthContext);
  return auth;
}
