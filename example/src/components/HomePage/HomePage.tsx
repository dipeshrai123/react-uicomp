import React from "react";
import { interpolate } from "react-uicomp";

const Homepage = () => {
  const x = 10;

  const modX = interpolate(x, [0, 100], ["red", "blue"]);

  console.log(modX);

  return <div>HOMEPAGE</div>;
};

export default Homepage;
