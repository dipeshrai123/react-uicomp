import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext, NavigationContext, ThemeContext } from "./Context";

// Auth
export const useAuth = () => {
  return useContext(AuthContext);
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

  const publicRoutes: any = {};
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

  const privateRoutes: any = {};
  filteredPrivateRoutes.forEach(({ key, name, path }) => {
    privateRoutes[key] = Object.assign({}, { name, path });
  });

  return {
    navigation: {
      routes: { ...publicRoutes, ...privateRoutes },
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
