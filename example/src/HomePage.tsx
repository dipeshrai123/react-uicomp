import * as React from "react";
import { RippleButton } from "react-uicomp";

export default function Homepage() {
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
      }}
    >
      <RippleButton title="Click Me" />
    </div>
  );
}
