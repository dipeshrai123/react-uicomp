import React from "react";
import { useScroll, interpolate } from "react-uicomp";

const Scroll = () => {
  const { scrollY } = useScroll();

  return (
    <div>
      <div
        style={{
          bottom: 50,
          right: 50,
          width: 100,
          height: 100,
          background: "#3399ff",
          position: "fixed",
          border: interpolate(
            scrollY,
            [0, 500],
            ["1px solid red", "12px solid blue"],
            {
              extrapolate: "clamp",
            },
          ),
          transform: interpolate(
            scrollY,
            [0, 500],
            ["rotate(0deg)", "rotate(180deg)"],
            {
              extrapolate: "clamp",
            },
          ),
        }}
      />
      <div style={{ height: 800, backgroundColor: "#e1e1e1" }}></div>
      <div style={{ height: 400, backgroundColor: "#FFF" }}></div>
      <div style={{ height: 200, backgroundColor: "#e1e1e1" }}></div>
      <div style={{ height: 500, backgroundColor: "#FFF" }}></div>
      <div style={{ height: 400, backgroundColor: "#e1e1e1" }}></div>
    </div>
  );
};

export default Scroll;
