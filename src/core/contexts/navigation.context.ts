import React from "react";

export interface PublicPathParams {
  key: string | number;
  name: string;
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  visible?: boolean;
  restricted?: boolean;
}

export interface PrivatePathParams {
  key: string | number;
  name: string;
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  visible?: boolean;
}

export interface NavigationConfigParams {
  publicPaths: PublicPathParams[];
  privatePaths: PrivatePathParams[];
  userRoles: any;
}

export const navigationConfig: NavigationConfigParams = {
  publicPaths: [],
  privatePaths: [],
  userRoles: {},
};

export const NavigationContext = React.createContext(navigationConfig);
