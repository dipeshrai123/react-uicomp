import React, { useState } from "react";
import { useAnimatedValue, AnimatedBlock, useMeasure } from "react-uicomp";

const ELEM_WIDTHS = ["10%", "20%", "12%"];

export default function MeasuredTabsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [widths, setWidths] = useState<any>(() =>
    Array(ELEM_WIDTHS.length).fill(0),
  );
  const [lefts, setLefts] = useState<any>(() =>
    Array(ELEM_WIDTHS.length).fill(0),
  );

  const bind = useMeasure(({ width, left }) => {
    setWidths(width);
    setLefts(left);
  });

  const animatedWidth = useAnimatedValue(widths[activeIndex]);
  const animatedLeft = useAnimatedValue(lefts[activeIndex]);

  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        {ELEM_WIDTHS.map((width, index) => (
          <div
            key={index}
            {...bind(index)}
            style={{
              width,
              height: 100,
              marginRight: 10,
              backgroundColor: "#3399ff",
            }}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
      <AnimatedBlock
        style={{
          width: animatedWidth.value,
          height: 6,
          backgroundColor: "#F00",
          position: "relative",
          left: animatedLeft.value,
        }}
      />
    </>
  );
}
