/* eslint-disable no-unused-vars */
import React, { useContext, useMemo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./Modules";
import {
  AuthProviderParams,
  NavigationProviderParams,
  ThemeProviderParams,
} from "./Types";
import { AuthContext, NavigationContext, ThemeContext } from "./Context";

// Auth
export const Auth = {
  Provider: (props: AuthProviderParams) => {
    const { children, authConfig, authHandlers } = props;
    return (
      <AuthContext.Provider value={{ ...authConfig, ...authHandlers }}>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthContext.Provider>
    );
  },
  Screens: () => {
    const {
      publicPaths: PUBLIC_PATHS,
      privatePaths: PRIVATE_PATHS,
    } = useContext(NavigationContext);

    return (
      <Switch>
        {
          // PUBLIC ROUTES
          PUBLIC_PATHS.length &&
            PUBLIC_PATHS.filter(({ path }) => path !== null) // Other than Not Found Page
              .map(({ path, component, restricted, exact = true }, index) => (
                <PublicRoute
                  key={index}
                  path={path}
                  component={component}
                  restricted={!!restricted}
                  exact={exact}
                />
              ))
        }
        {
          // PRIVATE ROUTES
          PRIVATE_PATHS.length &&
            PRIVATE_PATHS.map(({ path, component, exact = true }, index) => (
              <PrivateRoute
                key={index}
                path={path}
                component={component}
                exact={exact}
              />
            ))
        }

        {
          // NOT FOUND
          PUBLIC_PATHS.length &&
            PUBLIC_PATHS.filter(({ path }) => path === null).map(
              ({ component: Component }, index) =>
                index === 0 && (
                  <Route key={index} render={() => <Component />} />
                ),
            )
        }
      </Switch>
    );
  },
};

// Navigation
export const Navigation = {
  Provider: (props: NavigationProviderParams) => {
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
        value={{
          privatePaths: privateP,
          publicPaths: publicP,
          userRoles: roles,
        }}
      >
        {children}
      </NavigationContext.Provider>
    );
  },
};

// Theme
export const Theme = {
  Provider: (props: ThemeProviderParams) => {
    const { children, theme, toggleTheme } = props;

    const contextValue = useMemo(() => theme, [theme]);
    const toggleThemeFunction = useMemo(() => toggleTheme, [toggleTheme]);
    const value = toggleThemeFunction
      ? { ...contextValue, toggleTheme: toggleThemeFunction }
      : { ...contextValue };

    return (
      <ThemeContext.Provider {...{ value }}>{children}</ThemeContext.Provider>
    );
  },
};
