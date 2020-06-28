import React from "react";

// Handles outside click
export const useOutsideClick = (
  elem: React.RefObject<HTMLElement>,
  callback: () => void,
) => {
  const callbackRef = React.useRef<React.RefObject<HTMLElement>>(null);
  callbackRef.current = callback;

  React.useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!elem?.current?.contains(e.target) && callbackRef.current) {
        callbackRef.current(e);
      }
    };

    document.addEventListener("click", handleOutsideClick, true);

    return document.addEventListener("click", handleOutsideClick, true);
  }, [callbackRef, elem]);
};
