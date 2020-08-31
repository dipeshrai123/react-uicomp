import React from "react";
import { Navigation, Auth } from "react-uicomp";
import { publicPaths, privatePaths, userRoles } from "./Routes";

const App = () => {
  return (
    <Navigation.Provider
      publicPaths={publicPaths}
      privatePaths={privatePaths}
      userRoles={userRoles}
    >
      <Auth.Provider config={{ isLoggedIn: false, userRole: "user" }}>
        <Auth.Screens />
      </Auth.Provider>
    </Navigation.Provider>
  );
};

export default App;
