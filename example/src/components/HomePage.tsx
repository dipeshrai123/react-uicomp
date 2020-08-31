import React from "react";
import { useNavigation } from "react-uicomp";

export default function HomePage() {
  const { navigation } = useNavigation();

  console.log(navigation);

  return <div>HOME COMPONENT</div>;
}
