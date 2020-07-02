/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { stateType, DefaultAuthConfigParams, publicReturnType } from "./Types";
import { AuthContext, NavigationContext, ThemeContext } from "./Context";

// Auth
export const useAuth = () => {
  return useContext(AuthContext) as DefaultAuthConfigParams & stateType;
};

// Navigation
export const useNavigation = () => {
  const history = useHistory();
  const location = useLocation();

  const { isLoggedIn, userRole } = useContext(AuthContext);
  const {
    privatePaths: PRIVATE_PATHS,
    publicPaths: PUBLIC_PATHS,
    userRoles: USER_ROLES,
  } = useContext(NavigationContext);

  const filteredPublicRoutes = PUBLIC_PATHS.filter(
    ({ path, restricted, visible = true }) => {
      const canAccess =
        userRole && USER_ROLES[userRole].access.indexOf(path) >= 0;

      return restricted && isLoggedIn ? false : visible && canAccess;
    },
  );

  const publicRoutes: publicReturnType = {};
  filteredPublicRoutes.forEach(({ key, name, path }) => {
    publicRoutes[key] = Object.assign({}, { name, path });
  });

  const filteredPrivateRoutes = PRIVATE_PATHS.filter(
    ({ path, visible = true }) => {
      const canAccess =
        userRole && USER_ROLES[userRole].access.indexOf(path) >= 0;

      return isLoggedIn ? visible && canAccess : false;
    },
  );

  const privateRoutes: publicReturnType = {};
  filteredPrivateRoutes.forEach(({ key, name, path }) => {
    privateRoutes[key] = Object.assign({}, { name, path });
  });

  const combinedRoutes = { ...publicRoutes, ...privateRoutes };

  return {
    navigation: {
      routes: combinedRoutes,
      navigate: (path: string) => history.push(path),
    },
    history,
    location,
  };
};

// Theme
export function useTheme() {
  return useContext(ThemeContext);
}

// useOutSideClick Hook - handles outside click
export const useOutsideClick = (
  elem: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void,
) => {
  const callbackMemo = React.useMemo(() => callback, [callback]);

  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!elem?.current?.contains(e.target as Element) && callbackMemo) {
        callbackMemo(e);
      }
    };

    document.addEventListener("click", handleOutsideClick, true);

    return document.addEventListener("click", handleOutsideClick, true);
  }, [callbackMemo, elem]);
};
