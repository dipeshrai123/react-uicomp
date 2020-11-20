import React from "react";
import { Auth, withNavigation } from "react-uicomp";
import { publicPaths, privatePaths, userRoles } from "./Routes";

import Header from "../components/common/header/Header";

const App = () => {
  return (
    <Auth.Provider config={{ isLoggedIn: false, userRole: "user" }}>
      <Header />
      <div style={{ padding: "0px 30px" }}>
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
