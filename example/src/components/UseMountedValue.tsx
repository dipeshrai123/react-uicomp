import React, { useState } from "react";
import { useMountedValue, AnimatedBlock, interpolate } from "react-uicomp";

const UseMountedValue = () => {
  const [open, setOpen] = useState(false);
  const mountedValue = useMountedValue(open, [0, 1, 0]);

  return (
    <div
      style={{
        padding: "20px 50px",
      }}
    >
      {mountedValue(
        (animation, mounted) =>
          mounted && (
            <AnimatedBlock
              style={{
                width: interpolate(animation.value, [0, 1], [100, 500]),
                height: 100,
                background: "#39F",
              }}
            />
          ),
      )}

      <button onClick={() => setOpen((prev) => !prev)}>Toggle</button>
    </div>
  );
};

export default UseMountedValue;
