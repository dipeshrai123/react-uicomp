import * as React from "react";

export const useScrollDisable = (shouldDisable: boolean) => {
  React.useEffect(() => {
    document.body.style.overflow = shouldDisable ? "hidden" : "auto";
  }, [shouldDisable]);
};
