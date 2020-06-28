import React from "react";
// eslint-disable-next-line no-unused-vars
import { NavigationContext, NavigationConfigParams } from "../contexts";

interface NavigationContainerParams extends NavigationConfigParams {
  children: React.Component;
}

const NavigationContainer = (props: NavigationContainerParams) => {
  const { children, privatePaths, publicPaths, userRoles } = props;
  const {
    privatePaths: privateP,
    publicPaths: publicP,
    userRoles: roles,
  } = React.useMemo(() => ({ privatePaths, publicPaths, userRoles }), [
    privatePaths,
    publicPaths,
    userRoles,
  ]);

  return (
    <NavigationContext.Provider
      value={{ privatePaths: privateP, publicPaths: publicP, userRoles: roles }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const Navigation = {
  Provider: NavigationContainer,
};
