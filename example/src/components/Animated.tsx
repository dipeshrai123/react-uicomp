import React, { useState } from "react";
import { AnimatedBlock, useAnimatedValue, interpolate } from "react-uicomp";

const Animated = () => {
  const [visible, setVisible] = useState(true);
  const opacity = useAnimatedValue(visible ? 1 : 0);

  return (
    <>
      <AnimatedBlock
        style={{
          transform: interpolate(opacity.value, {
            inputRange: [0, 1],
            outputRange: [
              `scale(1) translateY(-100px)`,
              `scale(2) translateY(0px)`,
            ],
          }),
          width: 100,
          paddingTop: 0,
          height: 50,
          background: "red",
          fontFamily: "Arial",
          textAlign: "center",
          color: "white",
          borderRadius: 4,
          margin: "100px auto 0px auto",
        }}
      >
        ANIMATED
      </AnimatedBlock>
      <button onClick={() => setVisible((prev) => !prev)}>TOGGLE</button>
    </>
  );
};

export default Animated;
