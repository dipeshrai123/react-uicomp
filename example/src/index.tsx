import React from "react";
import ReactDOM from "react-dom";
import { Navigation, Auth } from "react-uicomp";

const Page = () => <div>Page 1</div>;

const App = () => {
  return (
    <Navigation.Provider
      privatePaths={[
        {
          key: "Home",
          name: "Home",
          path: "/",
          component: Page,
        },
      ]}
      publicPaths={[]}
      userRoles={{
        admin: {
          access: ["/"],
        },
      }}
    >
      <Auth.Provider authConfig={{ isLoggedIn: true, userRole: "admin" }}>
        <Auth.Screens />
      </Auth.Provider>
    </Navigation.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
