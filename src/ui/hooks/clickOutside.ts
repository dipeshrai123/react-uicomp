import React, { useMemo } from "react";

// Handles outside click
export const useOutsideClick = (
  elem: React.RefObject<HTMLElement>,
  callback: (event: Event) => void,
) => {
  const callbackMemo = useMemo(() => callback, [callback]);

  React.useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (!elem?.current?.contains(e.target) && callbackMemo) {
        callbackMemo(e);
      }
    };

    document.addEventListener("click", handleOutsideClick, true);

    return document.addEventListener("click", handleOutsideClick, true);
  }, [callbackMemo, elem]);
};
