import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Navigation, Auth, useAuth, Dropdown } from "react-uicomp";

const Page1 = () => {
  return (
    <div>
      <Dropdown
        animationType="fade"
        element={() => <button onClick={() => false}>Goto Page2</button>}
        menuStyles={{
          background: "red",
        }}
      >
        <div>Dropdown Element</div>
      </Dropdown>
    </div>
  );
};

const Page2 = () => {
  const auth = useAuth();
  return (
    <div>
      <button onClick={() => auth.logout()}>LogOut</button>
    </div>
  );
};

const publicPaths = [
  {
    key: "Public",
    name: "Public",
    path: "/public",
    component: Page1,
    restricted: true,
  },
];

const privatePaths = [
  {
    key: "Private",
    name: "Private",
    path: "/private",
    component: Page2,
  },
];

const userRoles = { user: { access: ["/public", "/private"] } };

const App = () => {
  const [config, setConfig] = useState({ isLoggedIn: false, userRole: "user" });

  return (
    <Navigation.Provider
      publicPaths={publicPaths}
      privatePaths={privatePaths}
      userRoles={userRoles}
    >
      <Auth.Provider
        config={config}
        state={{
          value: 10,
          logout: () => {
            setConfig({ isLoggedIn: false, userRole: "user" });
          },
        }}
      >
        <Auth.Screens />
      </Auth.Provider>
    </Navigation.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
