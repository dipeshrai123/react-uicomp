import React, { useState } from "react";
import { useMountedValue, AnimatedBlock } from "react-uicomp";

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
                width: 100,
                height: 100,
                background: "#39F",
                opacity: animation.value,
              }}
            />
          ),
      )}

      <button onClick={() => setOpen((prev) => !prev)}>Toggle</button>
    </div>
  );
};

export default UseMountedValue;
