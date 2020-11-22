import React from "react";
import { Auth, withNavigation } from "react-uicomp";
import { publicPaths, privatePaths, userRoles } from "./Routes";

import Header from "../components/common/header/Header";
import Sidenav from "../components/common/sidenav/Sidenav";

const App = () => {
  return (
    <Auth.Provider config={{ isLoggedIn: true, userRole: "user" }}>
      <Sidenav />
      <div style={{ marginLeft: 260 }}>
        <Header />
        <Auth.Screens />
      </div>
    </Auth.Provider>
  );
};

export default withNavigation(App, {
  publicPaths,
  privatePaths,
  userRoles,
});
