import React from "react";
import { useWindowDimension } from "react-uicomp";

const AnimatedPage = () => {
  useWindowDimension(({ width, height }) => {
    console.log(width, height);
  });

  return <div>HOMEPAGE</div>;
};

export default AnimatedPage;
