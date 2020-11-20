import React from "react";
import { useNavigation } from "react-uicomp";

import "./Sidenav.css";

export default function Sidenav() {
  const { navigation } = useNavigation();
  const { routes } = navigation;

  return (
    <div className="sidenav">
      {Object.keys(routes).map((val, index) => (
        <div
          className={
            routes[val].active ? "sidenav-items active" : "sidenav-items"
          }
          key={index}
          onClick={() => navigation.navigate(routes[val].path)}
        >
          {routes[val].name}
        </div>
      ))}
    </div>
  );
}
