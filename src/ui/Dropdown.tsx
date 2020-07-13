import React from "react";
import { useOutsideClick } from "../core/Hooks";
import { animated, useTransition } from "react-spring";

type triggerElementArgType = {
  active: boolean;
};

type dropdownDirectionType = "bottomleft" | "bottomright" | "bottommiddle";

interface DropdownProps {
  children: React.ReactNode;
  triggerElement: (elementArg: triggerElementArgType) => React.ReactNode;
  active?: boolean;
  isAnimated?: boolean;
  animationType?: "fade" | "expand";
  dropdownStyles?: Omit<
    React.CSSProperties,
    "transform" | "position" | "opacity"
  >;
  dropdownDirection?: dropdownDirectionType;
  dismissOnOutsideClick?: boolean;
  toggleOnTriggerElementClick?: boolean;
}

export const Dropdown = ({
  children,
  triggerElement,
  active = false,
  isAnimated = false,
  animationType = "expand",
  dropdownStyles,
  dropdownDirection = "bottomright",
  dismissOnOutsideClick = true,
  toggleOnTriggerElementClick = false,
}: DropdownProps) => {
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
    } else {
      openDropdown();
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
  if (dismissOnOutsideClick) {
    useOutsideClick(containerRef, handleOutsideClick);
  }

  const containerStyles: React.CSSProperties = {
    position: "relative",
    display: "inline-block",
  };

  // Direction of dropdown menu
  const getDirectionStyles: (
    direction: dropdownDirectionType,
  ) => React.CSSProperties = (direction: dropdownDirectionType) => {
    switch (direction) {
      case "bottomleft":
        return { right: 0 };
      case "bottommiddle":
        return { left: "50%" };
      case "bottomright":
      default:
        return { left: 0 };
    }
  };

  const dropdownElementStyles: React.CSSProperties = {};
  const dropdownMenuStyles: React.CSSProperties = {
    ...getDirectionStyles(dropdownDirection),
    top: "100%",
    transformOrigin: "50% 0%",
    zIndex: 100,
    whiteSpace: "nowrap",
    ...dropdownStyles,
  };

  // DismissOnElementClick
  const onClick = toggleOnTriggerElementClick ? toggleDropdown : openDropdown;

  return (
    <span ref={containerRef} style={containerStyles}>
      <span {...{ onClick }} style={dropdownElementStyles}>
        {triggerElement({
          active: dropdownActive,
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
                        .interpolate((s) => {
                          // Calculation for position
                          if (dropdownDirection === "bottommiddle") {
                            return `scaleY(${s}) translateX(-50%)`;
                          } else {
                            return `scaleY(${s}) translateX(0)`;
                          }
                        })
                    : "scaleY(1)",
              }}
            >
              {children}
            </animated.div>
          ),
      )}
    </span>
  );
};
