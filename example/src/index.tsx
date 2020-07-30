import React from "react";
import ReactDOM from "react-dom";
import { Navigation, Auth, useNavigation } from "react-uicomp";
import { publicPaths, privatePaths, userRoles } from "./routes";

const Buttons = () => {
  const { navigation } = useNavigation();
  return (
    <div>
      <button onClick={() => navigation.goForward()}>FORWARD</button>
      <button onClick={() => navigation.goBack()}>BACKWARD</button>
    </div>
  );
};

const App = () => {
  return (
    <Navigation.Provider
      publicPaths={publicPaths}
      privatePaths={privatePaths}
      userRoles={userRoles}
    >
      <Auth.Provider config={{ isLoggedIn: false, userRole: "user" }}>
        <Auth.Screens />
        <Buttons />
      </Auth.Provider>
    </Navigation.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
