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
import { getParsedUserRole, canUserAccess, getParsedPaths } from "./Utils";

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

  // FOR FLATTING NESTED PATHS
  const parser = getParsedPaths("nestedPaths");
  const parsedPublicPaths = parser(PUBLIC_PATHS);
  const parsedPrivatePaths = parser(PRIVATE_PATHS);

  const userRolesAccessPaths: Array<string> = USER_ROLES[userRole].access;
  const parsedUserRolesAccessPaths: Array<string> = getParsedUserRole(
    userRolesAccessPaths,
  );

  const filteredPublicRoutes = parsedPublicPaths.filter(
    ({ path, restricted, visible = true }) => {
      const canAccess =
        userRole && canUserAccess(parsedUserRolesAccessPaths, path);

      return restricted && isLoggedIn ? false : visible && canAccess;
    },
  );

  const publicRoutes: publicReturnType = {};
  filteredPublicRoutes.forEach(({ key, name, path, props = null }) => {
    const active = !!matchPath(location.pathname, path);
    const routeKey = key || name;
    publicRoutes[routeKey] = Object.assign({}, { name, path, active, props });
  });

  const filteredPrivateRoutes = parsedPrivatePaths.filter(
    ({ path, visible = true }) => {
      const canAccess =
        userRole && canUserAccess(parsedUserRolesAccessPaths, path);

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
