/* eslint-disable no-unused-vars */
import { useContext } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  matchPath,
} from "react-router-dom";
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
  const params = useParams();

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
  filteredPublicRoutes.forEach(({ key, name, path, props = null }) => {
    const active = !!matchPath(location.pathname, path);
    const routeKey = key || name;
    publicRoutes[routeKey] = Object.assign({}, { name, path, active, props });
  });

  const filteredPrivateRoutes = PRIVATE_PATHS.filter(
    ({ path, visible = true }) => {
      const canAccess =
        userRole && USER_ROLES[userRole].access.indexOf(path) >= 0;

      return isLoggedIn ? visible && canAccess : false;
    },
  );

  const privateRoutes: publicReturnType = {};
  filteredPrivateRoutes.forEach(({ key, name, path, props = null }) => {
    const active = !!matchPath(location.pathname, path);
    const routeKey = key || name;
    privateRoutes[routeKey] = Object.assign({}, { name, path, active, props });
  });

  const combinedRoutes = { ...publicRoutes, ...privateRoutes };

  return {
    navigation: {
      routes: combinedRoutes,
      navigate: (path: string | object) => history.push(path),
      goBack: () => history.goBack(),
      goForward: () => history.goForward(),
    },
    history,
    location,
    params,
  };
};

// Theme
export function useTheme() {
  return useContext(ThemeContext);
}
