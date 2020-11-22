/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext, NavigationContext } from "./Context";
import { PrivatePathParams, PublicPathParams } from "./Types";
import { getParsedUserRole, canUserAccess } from "./Utils";

// Private Routes
export const PrivateRoute = (props: {
  path: string;
  component: React.ComponentType;
  exact: boolean;
}) => {
  const { component: Component, ...rest } = props;
  const { userRoles: USER_ROLES, origPublicPaths } = useContext(
    NavigationContext,
  );

  const { isLoggedIn, userRole } = useContext(AuthContext);
  const userRolesAccessPaths: Array<string> = USER_ROLES[userRole].access;
  const parsedUserRolesAccessPaths: Array<string> = getParsedUserRole(
    userRolesAccessPaths,
  );

  const accessPublicPath = origPublicPaths.filter((path: PublicPathParams) => {
    return userRole && canUserAccess(parsedUserRolesAccessPaths, path.path);
  });
  const initialPublicPath =
    accessPublicPath.length > 0 ? accessPublicPath[0] : null;
  const redirectToPath = initialPublicPath?.path;

  const canAccess =
    userRole && canUserAccess(parsedUserRolesAccessPaths, rest.path);

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
  path: string;
  component: React.ComponentType;
  restricted: boolean;
  exact: boolean;
}) => {
  const { component: Component, restricted, ...rest } = props;
  const { userRoles: USER_ROLES, origPrivatePaths } = useContext(
    NavigationContext,
  );

  const { isLoggedIn, userRole } = useContext(AuthContext);
  const userRolesAccessPaths: Array<string> = USER_ROLES[userRole].access;
  const parsedUserRolesAccessPaths: Array<string> = getParsedUserRole(
    userRolesAccessPaths,
  );

  const accessPrivatePaths = origPrivatePaths.filter(
    (path: PrivatePathParams) => {
      return userRole && canUserAccess(parsedUserRolesAccessPaths, path.path);
    },
  );

  const initialPrivatePath =
    accessPrivatePaths.length > 0 ? accessPrivatePaths[0] : null;
  const redirectToPath = initialPrivatePath?.path;

  const canAccess =
    userRole && canUserAccess(parsedUserRolesAccessPaths, rest.path);

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
