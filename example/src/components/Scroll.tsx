import React from "react";
import { useScroll, AnimatedBlock, interpolate } from "react-uicomp";

const Scroll = () => {
  const { y } = useScroll();

  return (
    <AnimatedBlock
      style={{
        opacity: interpolate(y, {
          inputRange: [0, 200],
          outputRange: [1, 0],
          extrapolate: "clamp",
        }),
        background: "#39F",
        position: "relative",
        border: "1px solid red",
        overflow: "auto",
      }}
    >
      Animated Scroll
      <div style={{ height: 1000 }}></div>
    </AnimatedBlock>
  );
};

export default Scroll;
