import React from "react";
import {
  useMouseMove,
  AnimatedBlock,
  useAnimatedValue,
  interpolate,
} from "react-uicomp";

const MouseMove = () => {
  const { mouseX, mouseY, isMoving } = useMouseMove();
  const transX = useAnimatedValue(mouseX - 15);
  const transY = useAnimatedValue(mouseY - 15);
  const scale = useAnimatedValue(isMoving);

  return (
    <div
      style={{
        padding: "20px 50px",
      }}
    >
      <AnimatedBlock
        style={{
          width: 30,
          height: 30,
          background: "#39F",
          borderRadius: 15,
          position: "absolute",
          left: transX.value,
          top: transY.value,
          transform: interpolate(scale.value, {
            inputRange: [0, 1],
            outputRange: [`scale(1)`, `scale(0.5)`],
          }),
        }}
      ></AnimatedBlock>
    </div>
  );
};

export default MouseMove;
