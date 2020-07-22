import React from "react";
import { useScroll, AnimatedBlock, interpolate } from "react-uicomp";

const Scroll = () => {
  const { y } = useScroll();

  return (
    <div>
      <AnimatedBlock
        style={{
          bottom: 50,
          width: interpolate(y, {
            inputRange: [0, 500],
            outputRange: [100, 200],
            extrapolate: "clamp",
          }),
          height: interpolate(y, {
            inputRange: [0, 500],
            outputRange: [20, 200],
            extrapolate: "clamp",
          }),
          left: interpolate(y, {
            inputRange: [0, 500],
            outputRange: [document.documentElement.clientWidth - 150, 50],
            extrapolate: "clamp",
          }),
          borderRadius: 4,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          backgroundColor: "#39F",
          position: "fixed",
        }}
      ></AnimatedBlock>
      <div style={{ height: 800, backgroundColor: "#f1f1f1" }}></div>
      <div style={{ height: 400, backgroundColor: "#FFF" }}></div>
      <div style={{ height: 200, backgroundColor: "#f1f1f1" }}></div>
      <div style={{ height: 500, backgroundColor: "#FFF" }}></div>
      <div style={{ height: 400, backgroundColor: "#f1f1f1" }}></div>
    </div>
  );
};

export default Scroll;
