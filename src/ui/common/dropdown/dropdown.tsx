import React, { useState, useCallback, useRef } from "react";
import { useOutsideClick } from "../../hooks";
import { animated, useTransition } from "react-spring";

// Open and toggle menu
export const useDropdown = (elementRef: React.RefObject<HTMLElement>) => {
  const [open, setOpen] = useState(() => false);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, [elementRef]);

  return {
    dropdownHandlers: { open, setOpen },
    toggle: toggleOpen,
  };
};

interface DropdownParams {
  open: boolean;
  setOpen: (prev: boolean) => void;
  render: () => React.ReactNode;
  children: React.ReactNode;
  dropdownStyles?: React.CSSProperties;
}

export const Dropdown = React.forwardRef<HTMLSpanElement, DropdownParams>(
  (props, dropdownRef) => {
    const { open, setOpen, render, children, dropdownStyles } = props;
    const animation = useTransition(open, null, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    });

    const ref = useRef<HTMLSpanElement>(null);
    const onHandleOutside = () => {
      setOpen(false);
    };

    useOutsideClick(ref, onHandleOutside);

    return (
      <span
        className="wrapperSpan"
        style={{
          position: "relative",
          display: "inline-block",
        }}
        ref={ref}
      >
        <span ref={dropdownRef}>{render()}</span>

        {animation.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={{
                  left: 0,
                  top: 0,
                  ...dropdownStyles,
                  position: "absolute",
                  zIndex: 100,
                  transformOrigin: "20% 20%",
                  opacity: props.opacity,
                  transform: props.opacity
                    .interpolate({
                      range: [0, 1],
                      output: [0.5, 1],
                    })
                    .interpolate((x) => `scale(${x})`),
                }}
              >
                {children}
              </animated.div>
            ),
        )}
      </span>
    );
  },
);
