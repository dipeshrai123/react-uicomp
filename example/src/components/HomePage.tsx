import React from "react";
import { useOutsideClick } from "react-uicomp";

export default function HomePage() {
  const boxRef = React.useRef<HTMLDivElement>(null);

  useOutsideClick(boxRef, () => {
    console.log("You clicked outside box");
  });

  return (
    <div>
      <div
        ref={boxRef}
        onClick={() => console.log("You clicked inside box")}
        style={{ width: 100, height: 100, background: "#3399ff" }}
      >
        <div style={{ width: 20, height: 20, background: "red" }}></div>
      </div>
    </div>
  );
}
