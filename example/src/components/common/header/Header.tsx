import React from "react";
import { useNavigation } from "react-uicomp";

import "./Header.css";

export default function Header() {
  const { navigation } = useNavigation();
  const { routes } = navigation;

  return (
    <div className="header">
      {Object.keys(routes).map((val, index) => (
        <div
          className={
            routes[val].active ? "header-items active" : "header-items"
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
