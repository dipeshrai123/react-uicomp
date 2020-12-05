import React from "react";
import { useScroll } from "react-uicomp";

const ScrollPage = () => {
  const bind = useScroll((event) => {
    console.log(event);
  });
  return (
    <div style={{ padding: 50 }}>
      <div
        {...bind()}
        style={{
          width: 400,
          height: 400,
          background: "#e1e1e1",
          overflow: "auto",
        }}
      >
        <div style={{ height: 1000 }}></div>
      </div>
      <div style={{ height: 1000, backgroundColor: "#3399ff" }} />
    </div>
  );
};

export default ScrollPage;
