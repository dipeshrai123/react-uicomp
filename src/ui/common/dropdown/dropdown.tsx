import React from "react";
import { useOutsideClick } from "../../hooks";
import { animated, useTransition } from "react-spring";

type elementArgType = {
  toggle: () => void;
};

interface DropdownParams {
  children: React.ReactNode;
  element: (elementArg: elementArgType) => React.ReactNode;
  active?: boolean;
  isAnimated?: boolean;
  animationType?: "fade" | "expand";
  menuStyles?: Omit<React.CSSProperties, "transform" | "position" | "opacity">;
}

export const Dropdown = ({
  children,
  element,
  active = false,
  isAnimated = true,
  animationType = "expand",
  menuStyles,
}: DropdownParams) => {
  const containerRef: React.RefObject<HTMLDivElement> = React.useRef<
    HTMLDivElement
  >(null);
  const [dropdownActive, setDropdownActive] = React.useState<boolean>(active);
  const dropdownAnimation = useTransition(dropdownActive, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: isAnimated ? 200 : 0,
    },
  });

  const toggleDropdown: () => void = React.useCallback(() => {
    if (dropdownActive) {
      closeDropdown();
    }
  }, [dropdownActive]);

  const openDropdown: () => void = React.useCallback(() => {
    if (!dropdownActive) {
      setDropdownActive(true);
    }
  }, [dropdownActive]);

  const closeDropdown: () => void = () => {
    setDropdownActive(false);
  };

  const handleOutsideClick: () => void = () => {
    closeDropdown();
  };

  // Handle outside click on container
  useOutsideClick(containerRef, handleOutsideClick);

  const containerStyles: React.CSSProperties = {
    position: "relative",
  };
  const dropdownElementStyles: React.CSSProperties = {};
  const dropdownMenuStyles: React.CSSProperties = {
    left: 0,
    top: 0,
    transformOrigin: "20% 20%",
    zIndex: 100,
    ...menuStyles,
  };

  return (
    <span ref={containerRef} style={containerStyles}>
      <span onClick={openDropdown} style={dropdownElementStyles}>
        {element({
          toggle: toggleDropdown,
        })}
      </span>
      {dropdownAnimation.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={{
                ...dropdownMenuStyles,
                position: "absolute",
                opacity: props.opacity,
                transform:
                  animationType === "expand"
                    ? props.opacity
                        .interpolate({
                          range: [0, 1],
                          output: [0.6, 1],
                        })
                        .interpolate((s) => `scale(${s})`)
                    : "scale(1)",
              }}
            >
              {children}
            </animated.div>
          ),
      )}
    </span>
  );
};
