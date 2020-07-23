import React, { useState } from "react";
import {
  AnimatedBlock,
  useAnimatedValue,
  interpolate,
  useMeasure,
} from "react-uicomp";

const Animated = () => {
  const [toggle, setToggle] = useState(false);
  const opacity = useAnimatedValue(toggle ? 1 : 0);

  const { handler, width, height, left, top } = useMeasure();

  console.log({
    width,
    height,
    top,
    left,
  });

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
      <div
        {...handler}
        style={{
          width: 100,
          height: 100,
          position: "relative",
          left: 200,
          background: "#39F",
        }}
      ></div>
      <button onClick={() => setToggle((prev) => !prev)}>OPen</button>
    </>
  );
};

export default Animated;
