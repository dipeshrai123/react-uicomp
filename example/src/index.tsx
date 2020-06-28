import React from "react";
import ReactDOM from "react-dom";
import { Auth, Navigation } from "react-uicomp";

const SamplePage = () => {
  return <div>Sample Page</div>;
};

const App = () => {
  return (
    <Navigation.Provider
      publicPaths={[
        {
          key: "Login",
          name: "Login",
          path: "/log-in",
          component: SamplePage,
          restricted: true,
        },
        {
          key: "Signin",
          name: "Signin",
          path: "/sign-in",
          component: SamplePage,
          restricted: true,
        },
      ]}
      privatePaths={[
        {
          key: "Dashboard",
          name: "Dashboard",
          path: "/dashboard",
          component: SamplePage,
        },
      ]}
      userRoles={{
        admin: {
          access: ["/", "/log-in", "/sign-in", "/dashboard", "/home"],
        },
        user: {
          access: ["/", "/log-in", "/sign-in"],
        },
      }}
    >
      <Auth.Provider
        authConfig={{ isLoggedIn: true, userRole: "admin" }}
        authHandlers={{ sample: "OK" }}
      >
        <div>
          <div>OK</div>
          <Auth.Screens />
        </div>
      </Auth.Provider>
    </Navigation.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
