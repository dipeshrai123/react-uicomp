import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Navigation,
  Auth,
  useAuth,
  Dropdown,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "react-uicomp";

const Page1 = () => {
  return (
    <div style={{ paddingLeft: 100 }}>
      <Dropdown isAnimated triggerElement={() => <button>Toggle Menu</button>}>
        <DropdownMenu>
          <DropdownMenuItem>Dipesh Rai Long Name</DropdownMenuItem>
          <DropdownMenuItem>Dipesh Rai</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem danger={true}>Dipesh Rai</DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>

      <Dropdown triggerElement={() => <button>Toggle Menu</button>}>
        <div
          style={{
            backgroundColor: "#FFF",
            borderRadius: 4,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
            border: "1px solid #E1E1E1",
          }}
        >
          Dropdown Element
        </div>
      </Dropdown>

      <Dropdown triggerElement={() => <button>Toggle Menu</button>}>
        <div
          style={{
            backgroundColor: "#FFF",
            borderRadius: 4,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
            border: "1px solid #E1E1E1",
          }}
        >
          Dropdown Element
        </div>
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
