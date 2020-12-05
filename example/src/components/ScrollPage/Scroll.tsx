import React from "react";
import { useScroll } from "react-uicomp";

const ScrollPage = () => {
  useScroll((event) => {
    console.log(event);
  });
  return (
    <div style={{ padding: 50 }}>
      <div style={{ height: 1000, backgroundColor: "#3399ff" }} />
    </div>
  );
};

export default ScrollPage;
