import React, { useState, useEffect } from "react";
import { AnimatedBlock, useAnimatedValue, useMeasure } from "react-uicomp";

const Animated = () => {
  const [toggle, setToggle] = useState(false);
  const { handler, width } = useMeasure();
  const animatedWidth = useAnimatedValue(100);

  useEffect(() => {
    animatedWidth.value = toggle ? width : 100;
  }, [toggle, animatedWidth, width]);

  return (
    <>
      <div
        {...handler}
        style={{ width: "30%", height: 100, background: "red" }}
      ></div>
      <AnimatedBlock
        style={{
          width: animatedWidth.value,
          height: 100,
          position: "relative",
          background: "#39F",
        }}
      ></AnimatedBlock>
      <div style={{ height: 10 }}></div>
      <button onClick={() => setToggle((prev) => !prev)}>Open</button>
    </>
  );
};

export default Animated;
