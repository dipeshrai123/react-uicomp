import React, { useEffect } from "react";
import { useScroll, useAnimatedValue, AnimatedBlock } from "react-uicomp";

const Scroll = () => {
  const { y } = useScroll();
  const opacity = useAnimatedValue(1);

  useEffect(() => {
    if (y >= 200) {
      opacity.value = 0;
    } else {
      opacity.value = 1;
    }
  }, [y, opacity]);

  return (
    <AnimatedBlock
      style={{
        opacity: opacity.value,
        backgroundColor: "red",
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
