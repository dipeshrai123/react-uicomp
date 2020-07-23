import React, { useState } from "react";
import { AnimatedBlock, useAnimatedValue, interpolate } from "react-uicomp";

const Animated = () => {
  const [toggle, setToggle] = useState(false);
  const opacity = useAnimatedValue(toggle ? 1 : 0);
  return (
    <>
      <AnimatedBlock
        style={{
          opacity: opacity.value,
          transform: interpolate(opacity.value, {
            inputRange: [0, 1],
            outputRange: [`translateX(0px)`, `translateX(100px)`],
          }),
          width: 100,
          height: 100,
          backgroundColor: "#39F",
        }}
      ></AnimatedBlock>
      <button onClick={() => setToggle((prev) => !prev)}>OPen</button>
    </>
  );
};

export default Animated;
