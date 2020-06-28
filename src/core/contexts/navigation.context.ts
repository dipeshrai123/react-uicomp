import React from "react";

// @Required
export const navigationConfig = {
  publicPaths: [],
  privatePaths: [],
  userRoles: {}
};

export const NavigationContext = React.createContext(navigationConfig);