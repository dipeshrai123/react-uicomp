import React from "react";
import { AnimatedBlock, useDrag, useAnimatedValue } from "react-uicomp";

const Drag = () => {
  const { handler, mouseX, mouseY } = useDrag();
  const translateX = useAnimatedValue(mouseX);
  const translateY = useAnimatedValue(mouseY);

  return (
    <div
      style={{
        padding: "20px 50px",
      }}
    >
      <AnimatedBlock
        {...handler}
        style={{
          width: 100,
          height: 100,
          left: translateX.value,
          top: translateY.value,
          background: "#39F",
          position: "absolute",
        }}
      ></AnimatedBlock>
    </div>
  );
};

export default Drag;
