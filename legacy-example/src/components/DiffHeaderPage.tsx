import * as React from "react";
import { DiffHeader } from "react-uicomp";

export default function DiffHeaderPage() {
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <DiffHeader
        style={{
          backgroundColor: "red",
          height: 200,
        }}
      >
        SOMETHING GOES HERE
      </DiffHeader>

      <div
        style={{
          height: 5000,
        }}
      />
    </div>
  );
}
