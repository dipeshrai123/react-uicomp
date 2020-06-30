/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext, NavigationContext } from "./Context";
import { PrivatePathParams, PublicPathParams } from "./Types";

// Private Routes
export const PrivateRoute = (props: {
  key: string | number;
  path: string;
  component: React.ComponentType;
  exact: boolean;
}) => {
  const { component: Component, ...rest } = props;
  const { publicPaths: PUBLIC_PATHS, userRoles: USER_ROLES } = useContext(
    NavigationContext,
  );
  const { isLoggedIn, userRole } = useContext(AuthContext);
  const accessPublicPath = PUBLIC_PATHS.filter((path: PublicPathParams) => {
    return userRole && USER_ROLES[userRole]?.access.indexOf(path.path) >= 0;
  });
  const initialPublicPath =
    accessPublicPath.length > 0 ? accessPublicPath[0] : null;
  const redirectToPath = initialPublicPath?.path;
  const canAccess =
    userRole && USER_ROLES[userRole]?.access.indexOf(rest.path) >= 0;

  return (
    <Route
      {...rest}
      render={(props: object) => {
        return isLoggedIn ? (
          userRole && canAccess ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: redirectToPath }} />
          )
        ) : (
          <Redirect to={{ pathname: redirectToPath }} />
        );
      }}
    />
  );
};

// Public and Restricted Routes
export const PublicRoute = (props: {
  key: string | number;
  path: string;
  component: React.ComponentType;
  restricted: boolean;
  exact: boolean;
}) => {
  const { component: Component, restricted, ...rest } = props;
  const { privatePaths: PRIVATE_PATHS, userRoles: USER_ROLES } = useContext(
    NavigationContext,
  );
  const { isLoggedIn, userRole } = useContext(AuthContext);
  const accessPrivatePaths = PRIVATE_PATHS.filter((path: PrivatePathParams) => {
    return userRole && USER_ROLES[userRole]?.access.indexOf(path.path) >= 0;
  });
  const initialPrivatePath =
    accessPrivatePaths.length > 0 ? accessPrivatePaths[0] : null;
  const redirectToPath = initialPrivatePath?.path;
  const canAccess =
    userRole && USER_ROLES[userRole]?.access.indexOf(rest.path) >= 0;

  return (
    <Route
      {...rest}
      render={(props: any) => {
        return isLoggedIn && restricted ? (
          <Redirect to={{ pathname: redirectToPath }} />
        ) : userRole && canAccess ? (
          <Component {...props} />
        ) : (
          <Redirect to="/user-denied" />
        );
      }}
    />
  );
};
