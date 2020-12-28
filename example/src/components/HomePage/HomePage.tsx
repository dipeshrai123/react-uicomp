import * as React from "react";
import {
  useDrag,
  AnimatedBlock,
  useAnimatedValue,
  clamp,
  interpolate,
} from "react-uicomp";

export default function Homepage() {
  const CONTAINER_WIDTH = 60;
  const ELEM_SIZE = CONTAINER_WIDTH / 2;
  const movementX = React.useRef(0);
  const offsetX = React.useRef(0);
  const x = useAnimatedValue(0);

  const bind = useDrag(({ down, movementX: mx }) => {
    if (down) {
      movementX.current = clamp(mx + offsetX.current, 0, ELEM_SIZE);
      x.immediate = true;
    } else {
      movementX.current = movementX.current > ELEM_SIZE / 2 ? ELEM_SIZE : 0;
      offsetX.current = movementX.current;
      x.immediate = false;
    }

    x.value = movementX.current;
  });

  return (
    <AnimatedBlock
      style={{
        width: CONTAINER_WIDTH,
        height: ELEM_SIZE,
        borderRadius: ELEM_SIZE,
        border: interpolate(
          x.value,
          [0, ELEM_SIZE],
          ["2px solid #e1e1e1", "2px solid #34c76c"],
        ),
        backgroundColor: interpolate(
          x.value,
          [0, ELEM_SIZE],
          ["white", "#34c76cc"],
        ),
      }}
    >
      <AnimatedBlock
        {...bind()}
        style={{
          position: "relative",
          top: -1,
          width: ELEM_SIZE,
          height: ELEM_SIZE,
          background: "white",
          border: "1px solid #e1e1e1",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
          borderRadius: ELEM_SIZE,
          x: x.value,
        }}
      />
    </AnimatedBlock>
  );
}
