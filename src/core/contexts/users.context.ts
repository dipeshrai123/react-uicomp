import { createContext } from "react";

interface DefaultAuthConfigParams {
  isLoggedIn: boolean;
  userRole: null | string;
}

export const DefaultAuthConfig: DefaultAuthConfigParams = {
  isLoggedIn: false,
  userRole: null,
};

export const AuthContext = createContext(DefaultAuthConfig);
