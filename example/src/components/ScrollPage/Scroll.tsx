import React from "react";
import {
  useScroll,
  useAnimatedValue,
  AnimatedBlock,
  interpolate,
} from "react-uicomp";

const ScrollPage = () => {
  const velocityY = useAnimatedValue(0);

  useScroll((event) => {
    velocityY.value = event.velocityY;
  });

  return (
    <div style={{ padding: 50 }}>
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <AnimatedBlock
            key={index}
            style={{
              height: 600,
              marginBottom: 50,
              backgroundColor: "#3399ff",
              transform: interpolate(
                velocityY.value,
                [-1, 0, 1],
                ["skewY(-5deg)", "skewY(0deg)", "skewY(5deg)"],
              ),
            }}
          />
        ))}
    </div>
  );
};

export default ScrollPage;
