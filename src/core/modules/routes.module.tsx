import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext, NavigationContext } from "../contexts";

// PRIVATE ROUTES
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

  const initialPublicPath = PUBLIC_PATHS.length > 0 ? PUBLIC_PATHS[0] : null;
  const redirectToPath = initialPublicPath?.path;

  const { isLoggedIn, userRole } = useContext(AuthContext);
  const canAccess =
    userRole && USER_ROLES[userRole].access.indexOf(rest.path) >= 0;

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
          <Redirect to="/log-in" />
        );
      }}
    />
  );
};

// PUBLIC OR RESTRICTED ROUTES
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

  const initialPrivatePath = PRIVATE_PATHS.length > 0 ? PRIVATE_PATHS[0] : null;
  const redirectToPath = initialPrivatePath?.path;

  // GET USER ACCESS
  const { isLoggedIn, userRole } = useContext(AuthContext);
  const canAccess =
    userRole && USER_ROLES[userRole].access.indexOf(rest.path) >= 0;

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
