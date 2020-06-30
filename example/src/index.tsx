import React from "react";
import ReactDOM from "react-dom";
import { Navigation, Auth } from "react-uicomp";

const Page = () => <div>Page 1</div>;
const Page3 = () => <div>Page 3</div>;
const Page2 = () => <div>Page 2</div>;

const App = () => {
  return (
    <Navigation.Provider
      privatePaths={[
        {
          key: "Private",
          name: "Private",
          path: "/private",
          component: Page,
        },
        {
          key: "Private2",
          name: "Private2",
          path: "/private2",
          component: Page3,
        },
      ]}
      publicPaths={[
        {
          key: "Public",
          name: "Public",
          path: "/public",
          component: Page2,
          restricted: false,
        },
      ]}
      userRoles={{
        user: { access: ["/private2", "/public"] },
      }}
    >
      <Auth.Provider config={{ isLoggedIn: false, userRole: "user" }}>
        <Auth.Screens />
      </Auth.Provider>
    </Navigation.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
