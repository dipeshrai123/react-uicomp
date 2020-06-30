/* eslint-disable no-unused-vars */
import React from "react";
import {
  DefaultAuthConfigParams,
  NavigationConfigParams,
  DefaultThemeConfigParams,
} from "./Types";

export const DefaultAuthConfig: DefaultAuthConfigParams = {
  isLoggedIn: false,
  userRole: null,
};

export const AuthContext = React.createContext(DefaultAuthConfig);

export const navigationConfig: NavigationConfigParams = {
  publicPaths: [],
  privatePaths: [],
  userRoles: {},
  routerType: "browser",
};

export const NavigationContext = React.createContext(navigationConfig);

export const DefaultThemeConfig: DefaultThemeConfigParams = {
  dark: false,
  colors: {
    backgroundColor: "#F8F8F8",
    primaryColor: "#2196F3",
    secondaryColor: "#989898",
    highlightColor: "#EB4034",
    textColor: "#353535",
    borderColor: "#E1E1E1",
    cardColor: "#FFFFFF",
  },
};

export const ThemeContext = React.createContext(DefaultThemeConfig);
