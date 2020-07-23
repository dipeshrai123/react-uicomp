import React from "react";
import { useAnimatedValue, AnimatedBlock, interpolate } from "react-uicomp";

const Tabs = () => {
  const activeTabAnimated = useAnimatedValue(0);

  const tabStyle = {
    background: "#39F",
    color: "#FFF",
    fontFamily: "Arial",
    width: 100,
    padding: 10,
    margin: "10px 0px",
  };

  return (
    <div
      style={{
        padding: "20px 50px",
      }}
    >
      {Array(5)
        .fill(null)
        .map((_, index) => {
          return (
            <AnimatedBlock
              onClick={() => (activeTabAnimated.value = index)}
              key={index}
              style={{
                ...tabStyle,
                background: interpolate(activeTabAnimated.value, {
                  inputRange: [index - 1, index, index + 1],
                  outputRange: ["#39F", "red", "#39F"],
                  extrapolate: "clamp",
                }),
                transform: interpolate(activeTabAnimated.value, {
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [`scale(1)`, `scale(1.2)`, `scale(1)`],
                  extrapolate: "clamp",
                }),
              }}
            >
              Tab {index + 1}
            </AnimatedBlock>
          );
        })}
    </div>
  );
};

export default Tabs;
