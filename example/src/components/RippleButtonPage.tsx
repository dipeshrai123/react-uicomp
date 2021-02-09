import * as React from "react";
import { RippleButton } from "react-uicomp";

export default function RippleButtonPage() {
  return (
    <div
      style={{
        padding: 20,
        display: "flex",
      }}
    >
      <RippleButton title="Click Me" />
      <RippleButton title="Click Me" />
      <RippleButton title="Click Me" />
    </div>
  );
}
