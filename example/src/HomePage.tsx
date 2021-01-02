import React from "react";
import { Toast, useToast } from "react-uicomp";

export default function Homepage() {
  const { handler, toast } = useToast();

  return (
    <div>
      <button
        onClick={() => toast({ message: "Hey, Toast!", type: "success" })}
      >
        Open Toast
      </button>
      <Toast {...handler} /> {/* Spread handler here */}
    </div>
  );
}
