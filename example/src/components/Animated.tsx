import React, { useEffect, useState } from "react";
import { AnimatedBlock, useAnimatedValue } from "react-uicomp";

const Animated = () => {
  const [visible, setVisible] = useState(false);
  const opacity = useAnimatedValue(visible ? 1 : 0);

  useEffect(() => {
    opacity.value = visible ? 1 : 0;
  }, [opacity, visible]);

  return (
    <>
      <AnimatedBlock
        style={{
          opacity: opacity.value,
          width: 50,
          height: 50,
          background: "red",
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
