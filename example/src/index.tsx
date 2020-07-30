import React from "react";
import ReactDOM from "react-dom";
import { Navigation, Auth } from "react-uicomp";
import { publicPaths, privatePaths, userRoles } from "./routes";

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

ReactDOM.render(<App />, document.getElementById("root"));
