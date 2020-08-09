import React, { useEffect } from "react";
import {
  useMouseMove,
  AnimatedBlock,
  useAnimatedValue,
  interpolate,
} from "react-uicomp";

const MouseMove = () => {
  const { mouseX, mouseY, isMoving } = useMouseMove();
  const transX = useAnimatedValue(0);
  const transY = useAnimatedValue(0);
  const scale = useAnimatedValue(0);

  useEffect(() => {
    transX.value = mouseX - 15;
    transY.value = mouseY - 15;
  }, [mouseX, mouseY, transX, transY]);

  useEffect(() => {
    scale.value = isMoving ? 1 : 0;
  }, [isMoving, scale]);

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
          transform: interpolate(
            scale.value,
            [0, 1],
            [`scale(1)`, `scale(0.5)`],
          ),
        }}
      ></AnimatedBlock>
    </div>
  );
};

export default MouseMove;
