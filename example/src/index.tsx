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
    <div style={{ paddingLeft: 100, paddingTop: 300 }}>
      <Dropdown
        isAnimated
        placement="topleft"
        triggerElement={() => <button>Toggle Menu</button>}
      >
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger={true}>
            Item 3
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        isAnimated
        placement="topmiddle"
        triggerElement={() => <button>Toggle Menu</button>}
      >
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger={true}>
            Item 3
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        isAnimated
        placement="topright"
        triggerElement={() => <button>Toggle Menu</button>}
      >
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger={true}>
            Item 3
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        isAnimated
        placement="bottomleft"
        triggerElement={() => <button>Toggle Menu</button>}
      >
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger={true}>
            Item 3
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        isAnimated
        placement="bottommiddle"
        triggerElement={() => <button>Toggle Menu</button>}
      >
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger={true}>
            Item 3
          </DropdownMenuItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown
        isAnimated
        placement="bottomright"
        triggerElement={() => <button>Toggle Menu</button>}
      >
        <DropdownMenu>
          <DropdownMenuItem onClick={() => false}>Item 1</DropdownMenuItem>
          <DropdownMenuItem onClick={() => false}>Item 2</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => false} danger={true}>
            Item 3
          </DropdownMenuItem>
        </DropdownMenu>
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
