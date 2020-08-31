import React, { useState, useEffect } from "react";
import {
  AnimatedBlock,
  useAnimatedValue,
  useMeasure,
  useNavigation,
} from "react-uicomp";

const Animated = () => {
  const { navigation } = useNavigation();
  console.log(navigation);
  const [toggle, setToggle] = useState(false);
  const { handler, width } = useMeasure();
  const animatedWidth2 = useAnimatedValue(0);
  const animatedWidth = useAnimatedValue(100, {
    listener: function (val) {
      animatedWidth2.value = val;
    },
  });

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
