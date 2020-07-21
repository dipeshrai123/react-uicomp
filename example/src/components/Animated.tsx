import React, { useEffect, useState } from "react";
import {
  AnimatedBlock,
  useAnimatedValue,
  interpolateValues,
} from "react-uicomp";

const Animated = () => {
  const [visible, setVisible] = useState(true);
  const opacity = useAnimatedValue(visible ? 1 : 0, {
    onAnimationEnd: function (val) {
      console.log("ANIMATION ENDED", val);
    },
  });

  useEffect(() => {
    opacity.value = visible ? 1 : 0;
  }, [opacity, visible]);

  return (
    <>
      <AnimatedBlock
        style={{
          opacity: opacity.value,
          transform: interpolateValues(opacity.value, {
            inputRange: [0, 1],
            outputRange: [
              `scale(1) translateY(-200px)`,
              `scale(2) translateY(0px)`,
            ],
          }),
          width: 100,
          padding: 20,
          background: "#39F",
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
