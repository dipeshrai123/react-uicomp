import React from "react";
import { useMouseMove } from "react-uicomp";

const MouseMove = () => {
  const { handler, x, y } = useMouseMove();

  console.log(x, y);

  return (
    <div
      style={{
        padding: "20px 50px",
      }}
    >
      <div
        {...handler}
        style={{ width: 200, height: 200, background: "red" }}
      ></div>
    </div>
  );
};

export default MouseMove;
