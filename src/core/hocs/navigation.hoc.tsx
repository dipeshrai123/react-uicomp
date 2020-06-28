import React from "react";
import PropTypes from "prop-types";
import { NavigationContext } from "../contexts";

export const NavigationContainer = props => {
  const { children, privatePaths, publicPaths, userRoles } = props;
  const {privatePaths: privateP, publicPaths: publicP, userRoles: roles } = React.useMemo(() => ({ privatePaths, publicPaths, userRoles }), [ privatePaths, publicPaths, userRoles ]);
  return (
    <NavigationContext.Provider value={{ privatePaths: privateP, publicPaths: publicP, userRoles: roles }}>
      { children }
    </NavigationContext.Provider>
  )
};

NavigationContainer.propTypes = {
  privatePaths: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    path: PropTypes.string,
    component: PropTypes.any,
    exact: PropTypes.bool,
    visible: PropTypes.bool
  })).isRequired,
  publicPaths: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    path: PropTypes.string,
    component: PropTypes.any,
    exact: PropTypes.bool,
    visible: PropTypes.bool,
    restricted: PropTypes.bool
  })).isRequired,
  userRoles: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired
};