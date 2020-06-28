import React from "react";

interface PublicPathParams {
  key: string;
  name: string;
  path: string;
  component: React.Component;
  exact?: boolean;
  visible?: boolean;
  restricted?: boolean;
}

interface PrivatePathParams {
  key: string;
  name: string;
  path: string;
  component: React.Component;
  exact?: boolean;
  visible?: boolean;
}

interface NavigationConfigParams {
  publicPaths: PublicPathParams[];
  privatePaths: PrivatePathParams[];
  userRoles: object;
}

export const navigationConfig: NavigationConfigParams = {
  publicPaths: [],
  privatePaths: [],
  userRoles: {},
};

export const NavigationContext = React.createContext(navigationConfig);
