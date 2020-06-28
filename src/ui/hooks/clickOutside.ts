import React from "react";

// Handles outside click
export const useOutsideClick = (elem, callback) => {
  const callbackRef = React.useRef();
  callbackRef.current = callback;

  React.useEffect(() => {
    const handleOutsideClick = e => {
      if(!elem?.current?.contains(e.target) && callbackRef.current) {
        callbackRef.current(e);
      }
    }

    document.addEventListener("click", handleOutsideClick, true);

    return document.addEventListener("click", handleOutsideClick, true);
  }, [ callbackRef, elem ]);
}