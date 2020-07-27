import React, { useEffect } from "react";
import { AnimatedBlock, useDrag, useAnimatedValue } from "react-uicomp";

const Drag = () => {
  const { handler, mouseX, mouseY } = useDrag();
  const translateX = useAnimatedValue(mouseX);
  const translateY = useAnimatedValue(mouseY);

  return (
    <div>
      <AnimatedBlock
        {...handler}
        style={{
          width: 100,
          height: 100,
          left: translateX.value,
          top: translateY.value,
          background: "#39F",
          borderRadius: 4,
          position: "absolute",
        }}
      ></AnimatedBlock>
    </div>
  );
};

export default Drag;
