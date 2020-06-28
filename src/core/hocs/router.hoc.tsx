import React from "react";
import { BrowserRouter } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { AuthContext, DefaultAuthConfigParams } from "../contexts";

interface AuthContainerParams {
  children: React.Component;
  authConfig: DefaultAuthConfigParams;
  authHandlers: object;
}

export const AuthContainer = (props: AuthContainerParams) => {
  const { children, authConfig, authHandlers } = props;
  return (
    <AuthContext.Provider value={{ ...authConfig, ...authHandlers }}>
      <BrowserRouter>{children}</BrowserRouter>
    </AuthContext.Provider>
  );
};
