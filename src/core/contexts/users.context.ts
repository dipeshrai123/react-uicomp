import { createContext } from "react";

// @Required - USER CONFIG
export const DefaultAuthConfig = {
  isLoggedIn: false,
  userRole: null
};

// DEFINE AUTH CONTEXT
export const AuthContext = createContext(DefaultAuthConfig);