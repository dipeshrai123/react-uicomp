import React from "react";
import { AnimatedBlock, ScrollableBlock, bInterpolate } from "react-uicomp";

const Cards = ({ bg, index }: { bg: string; index: number }) => {
  const outputRange =
    index % 2
      ? ["scale(0.5) translateX(100px)", "scale(1) translateX(0px)"]
      : ["scale(0.5) translateX(-100px)", "scale(1) translateX(0px)"];

  return (
    <ScrollableBlock>
      {(animation: { value: any }) => {
        return (
          <AnimatedBlock
            style={{
              height: 500,
              background: bg,
              transform: bInterpolate(animation.value, outputRange),
            }}
          />
        );
      }}
    </ScrollableBlock>
  );
};

const colors = ["#39F", "#00ff00", "#FF38EE"];

export default function HomePage() {
  return (
    <div style={{ background: "#e1e1e1" }}>
      {Array(50)
        .fill(null)
        .map((_, i) => (
          <Cards key={i} bg={colors[i % colors.length]} index={i} />
        ))}
    </div>
  );
}
