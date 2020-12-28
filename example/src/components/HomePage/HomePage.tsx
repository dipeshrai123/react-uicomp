import * as React from "react";
import { useDrag, AnimatedBlock } from "react-uicomp";

export default function Homepage() {
  const bind = useDrag((obj) => {
    console.log(obj);
  });

  return (
    <AnimatedBlock
      {...bind()}
      style={{
        width: 100,
        height: 100,
        background: "#3399ff",
      }}
    />
  );
}
