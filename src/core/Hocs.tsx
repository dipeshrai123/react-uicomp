/* eslint-disable no-unused-vars */
import React, { useContext, useMemo } from "react";
import {
  BrowserRouter,
  HashRouter,
  Switch,
  Route,
  NavLink as InternalNavLink,
  NavLinkProps as InternalNavLinkProps,
} from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./Modules";
import {
  AuthProviderParams,
  NavigationProviderParams,
  ThemeProviderParams,
  NavigationConfigParams,
} from "./Types";
import { AuthContext, NavigationContext, ThemeContext } from "./Context";
import { getParsedPaths } from "./Utils";

// Auth
export const Auth = {
  Provider: (props: AuthProviderParams) => {
    const { children, config, state } = props;
    const { routerType } = useContext(NavigationContext);
    return (
      <AuthContext.Provider value={{ ...config, ...state }}>
        {routerType === "hash" ? (
          <HashRouter>{children}</HashRouter>
        ) : (
          <BrowserRouter>{children}</BrowserRouter>
        )}
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
    const {
      children,
      privatePaths,
      publicPaths,
      userRoles,
      routerType,
    } = props;

    const _privatePaths = getParsedPaths(privatePaths);
    const _publicPaths = getParsedPaths(publicPaths);

    return (
      <NavigationContext.Provider
        value={{
          privatePaths: _privatePaths,
          publicPaths: _publicPaths,
          userRoles: userRoles,
          routerType,
        }}
      >
        {children}
      </NavigationContext.Provider>
    );
  },
};

export const withNavigation = (
  Component: React.ComponentType,
  navigationConfig: NavigationConfigParams,
) => {
  const {
    publicPaths,
    privatePaths,
    userRoles,
    routerType = "browser",
  } = navigationConfig;
  return function (props: any) {
    return (
      <Navigation.Provider
        {...{ routerType, publicPaths, privatePaths, userRoles }}
      >
        <Component {...props} />
      </Navigation.Provider>
    );
  };
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

// NavLink Component as ActiveLink
export const ActiveLink = (
  props: React.PropsWithoutRef<InternalNavLinkProps> &
    React.RefAttributes<HTMLAnchorElement>,
) => {
  return <InternalNavLink {...props} />;
};
