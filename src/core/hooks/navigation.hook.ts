
import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext, NavigationContext } from "../contexts";

export const useNavigation = () => {
  const history = useHistory();
  const location = useLocation();

  
  const { isLoggedIn, userRole } = useContext(AuthContext);
  const { privatePaths: PRIVATE_PATHS, publicPaths: PUBLIC_PATHS, userRoles: USER_ROLES } = useContext(NavigationContext);

  const filteredPublicRoutes = PUBLIC_PATHS.filter(({ path, restricted, visible = true }) => {
    const canAccess = userRole && USER_ROLES[userRole]['access'].indexOf(path) < 0 ? false : true;

    return restricted && isLoggedIn ? false : visible && canAccess ? true : false
  });

  const publicRoutes = {};
  filteredPublicRoutes.forEach(({key, name, path}) => {
    publicRoutes[key] = Object.assign({}, { name, path });
  });

  const filteredPrivateRoutes = PRIVATE_PATHS.filter(({ path, visible = true }) => {
    const canAccess = userRole && USER_ROLES[userRole]['access'].indexOf(path) < 0 ? false : true;

    return isLoggedIn ? 
      visible && canAccess ? true : false : false
  });

  const privateRoutes = {};
  filteredPrivateRoutes.forEach(({key, name, path}) => {
    privateRoutes[key] = Object.assign({}, { name, path });
  });

  return {
    navigation: {
      routes: {...publicRoutes, ...privateRoutes}
    },
    history,
    location
  };
}