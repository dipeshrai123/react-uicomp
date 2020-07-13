import React from "react";
import { useOutsideClick } from "../core/Hooks";
import { animated, useTransition } from "react-spring";

type triggerElementArgType = {
  active: boolean;
};

type placementType = "bottomleft" | "bottomright" | "bottommiddle";

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
  placement?: placementType;
  dismissOnOutsideClick?: boolean;
  dismissOnInsideClick?: boolean;
  toggleOnTriggerElementClick?: boolean;
}

export const Dropdown = ({
  children,
  triggerElement,
  active = false,
  isAnimated = false,
  animationType = "expand",
  dropdownStyles,
  placement = "bottomleft",
  dismissOnOutsideClick = true,
  toggleOnTriggerElementClick = false,
  dismissOnInsideClick = false,
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
  const getDirectionStyles: (pm: placementType) => React.CSSProperties = (
    pm: placementType,
  ) => {
    switch (pm) {
      case "bottomleft":
        return { left: 0 };
      case "bottommiddle":
        return { left: "50%" };
      case "bottomright":
      default:
        return { right: 0 };
    }
  };

  const dropdownElementStyles: React.CSSProperties = {};
  const dropdownMenuStyles: React.CSSProperties = {
    ...getDirectionStyles(placement),
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
              onClick={() => (dismissOnInsideClick ? closeDropdown() : false)}
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
                          if (placement === "bottommiddle") {
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
