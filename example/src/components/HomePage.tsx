import React, { useState } from "react";
import { AnimatedBlock, ScrollableBlock, bInterpolate } from "react-uicomp";

const Cards = () => {
  return (
    <ScrollableBlock>
      {(animation: { value: any }) => {
        return (
          <AnimatedBlock
            style={{
              height: 500,
              background: bInterpolate(animation.value, ["#e1e1e1", "#3399ff"]),
              transform: bInterpolate(animation.value, [
                "scale(0.5)",
                "scale(0.8)",
              ]),
            }}
          />
        );
      }}
    </ScrollableBlock>
  );
};

export default function HomePage() {
  const [elements] = useState(50);

  return (
    <div
      style={{
        background: "#e1e1e1",
      }}
    >
      {Array(elements)
        .fill(null)
        .map((_, i) => (
          <Cards key={i} />
        ))}
    </div>
  );
}
