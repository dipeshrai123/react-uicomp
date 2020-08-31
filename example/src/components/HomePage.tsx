import React from "react";
import { useNavigation } from "react-uicomp";

export default function HomePage() {
  const { navigation } = useNavigation();
  console.log(navigation.routes);

  return (
    <>
      {Object.keys(navigation.routes).map((val, index) => (
        <div
          style={{
            padding: 10,
            border: "1px solid #e1e1e1",
            margin: "5px 0px",
          }}
          key={index}
        >
          {navigation.routes[val].name}
        </div>
      ))}
    </>
  );
}
