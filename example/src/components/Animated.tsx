import React, { useState, useEffect } from "react";
import {
  AnimatedBlock,
  useAnimatedValue,
  useMeasure,
  bInterpolate,
} from "react-uicomp";

const Animated = () => {
  const [toggle, setToggle] = useState(false);
  const { handler, width } = useMeasure();
  const anim = useAnimatedValue(0);
  const animatedWidth2 = useAnimatedValue(0);
  const animatedWidth = useAnimatedValue(100, {
    listener: function (val) {
      animatedWidth2.value = val;
    },
  });

  useEffect(() => {
    animatedWidth.value = toggle ? width : 100;
    anim.value = toggle ? 1 : 0;
  }, [toggle, animatedWidth, width, anim]);

  return (
    <>
      <div
        {...handler}
        style={{ width: "30%", height: 100, background: "red" }}
      ></div>
      <AnimatedBlock
        style={{
          opacity: bInterpolate(anim.value, [1, 0]),
          height: 100,
          width: 100,
          position: "relative",
          background: "#39F",
        }}
      ></AnimatedBlock>
      <AnimatedBlock
        style={{
          width: animatedWidth.value,
          height: 100,
          position: "relative",
          background: "#39F",
        }}
      ></AnimatedBlock>
      <AnimatedBlock
        style={{
          width: animatedWidth2.value,
          height: 100,
          position: "relative",
          background: "#F00",
        }}
      ></AnimatedBlock>
      <div style={{ height: 10 }}></div>
      <button onClick={() => setToggle((prev) => !prev)}>Open</button>
    </>
  );
};

export default Animated;
