import React, { useState, useCallback, useRef } from "react";
import { useOutsideClick } from "../../hooks";
import { CSSTransition } from "react-transition-group";
import "./dropdown.css";

// Open and toggle menu
export const useDropdown = (elementRef: React.RefObject<HTMLElement>) => {
  const [open, setOpen] = useState(() => false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const toggleOpen = useCallback(() => {
    const measurement: DOMRect = (elementRef as any).current.getBoundingClientRect();
    setPosition({ x: measurement.x, y: measurement.y + window.scrollY });
    setOpen((prev) => !prev);
  }, [elementRef]);

  return {
    dropdownHandlers: { open, setOpen, position }, // Handler passed down to <Dropdown>...</Dropdown>
    toggle: toggleOpen, // Toggle function
    position, // Exact position of toggle element
  };
};

type PositionType = {
  x: number;
  y: number;
};

interface DropdownParams {
  open: boolean;
  setOpen: (prev: boolean) => void;
  position: PositionType;
  render: () => React.ReactNode;
  children: React.ReactNode;
  dropdownStyles?: React.CSSProperties;
}

export const Dropdown = React.forwardRef<HTMLSpanElement, DropdownParams>(
  (props, dropdownRef) => {
    const { open, setOpen, position, render, children, dropdownStyles } = props;

    const ref = useRef<HTMLSpanElement>(null);
    const onHandleOutside = () => {
      setOpen(false);
    };

    useOutsideClick(ref, onHandleOutside);

    const { x, y } = position;

    return (
      <span style={{ position: "relative", display: "inline-block" }} ref={ref}>
        <span ref={dropdownRef}>{render()}</span>
        <CSSTransition
          in={open}
          unmountOnExit
          timeout={200}
          classNames="dgenerate-dropdown"
        >
          <div
            style={{
              left: x,
              top: y - 10,
              ...dropdownStyles,
              position: "absolute",
              zIndex: 100,
            }}
          >
            {children}
          </div>
        </CSSTransition>
      </span>
    );
  },
);
