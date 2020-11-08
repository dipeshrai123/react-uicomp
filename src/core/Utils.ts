/* eslint-disable no-unused-vars */
import { matchPath } from "react-router-dom";

// /a/* to /a and /a/*
export const getParsedUserRole = (userRoles: Array<string>) => {
  const modifiedUserRoles: Array<string> = [];
  userRoles.forEach((role) => {
    if (role.indexOf("*") >= 0) {
      modifiedUserRoles.push(role.split("/*")[0]);
      modifiedUserRoles.push(role);
    } else {
      modifiedUserRoles.push(role);
    }
  });
  return Array.from(new Set(modifiedUserRoles));
};

// CAN USER ACCESS WITH SUPPORT *
export const canUserAccess = (userRoles: Array<string>, path: string) => {
  if (userRoles.indexOf(path) >= 0) {
    return true;
  }

  const asteriskUserRoles = userRoles.filter((val) => val.indexOf("*") >= 0);
  if (asteriskUserRoles.length > 0) {
    const canAccess = asteriskUserRoles
      .map((role) => {
        return {
          role,
          access: !!matchPath(path, {
            path: role,
            strict: true,
            exact: true,
          }),
        };
      })
      .filter((val) => val.access);

    if (canAccess.length > 0) return true;

    return false;
  }

  return false;
};

// PARSE PATHS - FLATTEN - paths
export const getParsedPaths = (pathType: "subPaths" | "nestedPaths") => (
  paths: Array<any>,
) => {
  const getNestedArray = (pathObj: any): any => {
    if (pathObj[pathType]) {
      const routes = pathObj[pathType].map((route: any) => {
        const modRoute = { ...route, path: `${pathObj.path}${route.path}` };
        return getNestedArray(modRoute);
      });
      return [pathObj, ...routes].flat();
    } else return pathObj;
  };

  const allPaths = paths.map((path) => {
    return getNestedArray(path);
  });

  return allPaths.flat();
};

// RE-ORDER FLATTEN ARRAYS ON THE BASIS OF PATH LENGTH DESCENDING WISE TO
// SOLVE PROBLEM OF NOT EXACT NESTEDPATHS
export const reOrderPaths = (pathArray: any) => {
  const clonePathArray = [...pathArray];

  return clonePathArray.sort(function (a, b) {
    if (a.path?.length > b.path?.length) {
      return -1;
    } else if (a.path?.length < b.path?.length) {
      return 1;
    } else {
      return 0;
    }
  });
};
