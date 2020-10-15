import React from "react";
import { useNavigation, Auth } from "react-uicomp";

const MouseMove = () => {
  const { navigation } = useNavigation();

  console.log("nav", navigation.routes);

  return (
    <div>
      DIPESH
      <Auth.Screens path="/mousemove" />
    </div>
  );
};

export default MouseMove;
