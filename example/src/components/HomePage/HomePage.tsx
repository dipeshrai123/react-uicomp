import React from "react";
import { rubberClamp } from "react-uicomp";

export default function Homepage() {
  const x = rubberClamp(-100, 0, 100);
  console.log(x);

  return <>HOMEPAGE</>;
}
