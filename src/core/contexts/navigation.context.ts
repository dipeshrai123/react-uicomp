import React from "react";

export interface PublicPathParams {
  key: string;
  name: string;
  path: string;
  component: React.Component;
  exact?: boolean;
  visible?: boolean;
  restricted?: boolean;
}

export interface PrivatePathParams {
  key: string;
  name: string;
  path: string;
  component: React.Component;
  exact?: boolean;
  visible?: boolean;
}

export interface NavigationConfigParams {
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
