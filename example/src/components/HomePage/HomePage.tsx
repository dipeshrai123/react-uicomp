import React, { useState, useEffect } from "react";
import { AnimatedBlock, useAnimatedValue } from "react-uicomp";

const Homepage = () => {
  const [toggle, setToggle] = useState(false);
  const animatedWidth = useAnimatedValue(100);
  const animatedWidth2 = useAnimatedValue(animatedWidth.value);

  useEffect(() => {
    animatedWidth.value = toggle ? 500 : 100;
  }, [toggle, animatedWidth]);

  return (
    <>
      <AnimatedBlock
        style={{
          width: animatedWidth.value,
          height: 100,
          position: "relative",
          background: "#39F",
        }}
      />

      <AnimatedBlock
        style={{
          width: animatedWidth2.value,
          height: 100,
          position: "relative",
          background: "#f00",
        }}
      />

      <div style={{ height: 10 }}></div>

      <button onClick={() => setToggle((prev) => !prev)}>Open</button>
    </>
  );
};

export default Homepage;
