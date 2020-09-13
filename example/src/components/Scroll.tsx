import React from "react";
import { useScroll, interpolate } from "react-uicomp";

const Scroll = () => {
  const { handler, scrollY } = useScroll();

  return (
    <div>
      <div
        {...handler}
        style={{
          height: 500,
          backgroundColor: "#e1e1e1",
          overflowY: "scroll",
          position: "relative",
        }}
      >
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#3399ff",
                width: 100,
                margin: "20px auto",
                height: 80,
              }}
            />
          ))}
        <div
          style={{
            background: "red",
            width: 100,
            height: 100,
            position: "absolute",
            right: 10,
            bottom: 10,
            borderRadius: interpolate(scrollY, [0, 100], ["0%", "50%"]),
          }}
        />
      </div>

      <div style={{ height: 1000 }} />
    </div>
  );
};

export default Scroll;
