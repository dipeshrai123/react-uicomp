import React, { useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useOutsideClick } from "../../hooks";
import { CSSTransition } from "react-transition-group";
import "./dropdown.css";

// Open and toggle menu
export const useDropdown = (elementRef) => {
  const [open, setOpen] = useState(() => false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const toggleOpen = useCallback(() => {
    const measurement = elementRef?.current?.getBoundingClientRect();
    setPosition({ x: measurement.x, y: measurement.y + window.scrollY });
    setOpen((prev) => !prev);
  }, [elementRef]);

  return {
    dropdownHandlers: { open, setOpen, position }, // Handler passed down to <Dropdown>...</Dropdown>
    toggle: toggleOpen, // Toggle function
    position, // Exact position of toggle element
  };
};

const DropdownPortal = (props) => {
  const { open, children } = props;
  const dropdownRoot = document.getElementById("dropdown-root");

  const dropdownMarkup = (
    <CSSTransition
      in={open}
      unmountOnExit
      timeout={200}
      classNames="dgenerate-dropdown">
      {children}
    </CSSTransition>
  );

  return ReactDOM.createPortal(dropdownMarkup, dropdownRoot);
};

export const Dropdown = React.forwardRef((props, dropdownRef) => {
  const { open, setOpen, position, render, children, dropdownStyles } = props;

  const ref = useRef();
  const onHandleOutside = () => {
    setOpen(false);
  };

  useOutsideClick(ref, onHandleOutside);

  const { x, y } = position;

  return (
    <>
      <span style={{ position: "relative", display: "inline-block" }} ref={ref}>
        <span ref={dropdownRef}>{render()}</span>
        <DropdownPortal {...{ open }}>
          <div
            style={{
              left: x,
              top: y - 10,
              ...dropdownStyles,
              // Cannot modify position and zIndex
              position: "absolute",
              zIndex: 100,
            }}>
            {children}
          </div>
        </DropdownPortal>
      </span>
    </>
  );
});

Dropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  dropdownStyles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
