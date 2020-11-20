import React from "react";
import { Auth, withNavigation } from "react-uicomp";
import { publicPaths, privatePaths, userRoles } from "./Routes";

import Header from "../components/common/header/Header";

const App = () => {
  return (
    <Auth.Provider config={{ isLoggedIn: false, userRole: "user" }}>
      <Header />
      <Auth.Screens />
    </Auth.Provider>
  );
};

export default withNavigation(App, {
  publicPaths,
  privatePaths,
  userRoles,
});
