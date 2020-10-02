/* eslint-disable no-unused-vars */
import React from "react";
import { useOutsideClick } from "../animated";
import { animated, useTransition } from "react-spring";
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "./DropdownMenu";
import { AnimationType, getAnimationConfig } from "./Modules";

type triggerElementArgType = {
  active: boolean;
};

type placementType =
  | "bottomleft"
  | "bottomright"
  | "bottommiddle"
  | "topleft"
  | "topright"
  | "topmiddle";

type DropdownOptions = Array<{ title?: string; onClick?: () => void; danger?: boolean; style?: React.CSSProperties, type?: "item" | "separator", className?: string }>;

interface DropdownProps {
  children?: React.ReactNode;
  triggerElement: (elementArg: triggerElementArgType) => React.ReactNode;
  active?: boolean;
  isAnimated?: boolean;
  animationType?: AnimationType;
  dropdownStyle?: Omit<
    React.CSSProperties,
    "transform" | "position" | "opacity"
  >;
  placement?: placementType;
  dismissOnOutsideClick?: boolean;
  dismissOnInsideClick?: boolean;
  toggleOnTriggerElementClick?: boolean;
  options?: DropdownOptions;
  containerStyle?: React.CSSProperties;
  containerClassName?: string;
}

export const Dropdown = ({
  children,
  triggerElement,
  active = false,
  isAnimated = true,
  animationType = "expand",
  dropdownStyle,
  placement = "bottomleft",
  dismissOnOutsideClick = true,
  toggleOnTriggerElementClick = false,
  dismissOnInsideClick = false,
  options,
  containerStyle,
  containerClassName,
}: DropdownProps) => {
  const containerRef: React.RefObject<HTMLDivElement> = React.useRef<
    HTMLDivElement
  >(null);

  const [dropdownActive, setDropdownActive] = React.useState<boolean>(active);

  const dropdownAnimation = useTransition(dropdownActive, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: isAnimated ? getAnimationConfig(animationType) : { duration: 0 },
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
        return { left: 0, top: "100%" };
      case "bottommiddle":
        return { left: "50%", top: "100%" };
      case "bottomright":
        return { right: 0, top: "100%" };
      case "topleft":
        return { left: 0, bottom: "100%" };
      case "topmiddle":
        return { left: "50%", bottom: "100%" };
      case "topright":
        return { right: 0, bottom: "100%" };
    }
  };

  // Transform origin of dropdown animation
  const getTransformOrigin: (pm: placementType) => React.CSSProperties = (
    pm: placementType,
  ) => {
    switch (pm) {
      case "bottomleft":
        return { transformOrigin: "0% 0%" };
      case "bottommiddle":
        return { transformOrigin: "0% 0%" };
      case "bottomright":
        return { transformOrigin: "100% 0%" };
      case "topleft":
        return { transformOrigin: "0% 100%" };
      case "topmiddle":
        return { transformOrigin: "0% 100%" };
      case "topright":
        return { transformOrigin: "100% 100%" };
    }
  };

  const dropdownElementStyles: React.CSSProperties = {};
  const dropdownMenuStyles: React.CSSProperties = {
    zIndex: 100,
    whiteSpace: "nowrap",
    ...getDirectionStyles(placement),
    ...getTransformOrigin(placement),
    ...dropdownStyle,
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
      {dropdownAnimation((props, item) => {
        return (
          item && (
            <animated.div
              onClick={() => (dismissOnInsideClick ? closeDropdown() : false)}
              style={{
                ...dropdownMenuStyles,
                position: "absolute",
                opacity: props.opacity,
                transform: props.opacity
                  .to({
                    range: [0, 1],
                    output: [0.6, 1],
                  })
                  .to((s: any) => {
                    // Calculation for position
                    if (placement === "bottommiddle") {
                      return `scale(${animationType !== "fade" ? s : 1
                        }) translateX(-50%)`;
                    } else if (placement === "topmiddle") {
                      return `scale(${animationType !== "fade" ? s : 1
                        }) translateX(-50%)`;
                    } else {
                      return `scale(${animationType !== "fade" ? s : 1
                        }) translateX(0%)`;
                    }
                  }),
              }}
            >
              { options ?
                <DropdownMenu style={containerStyle} className={containerClassName}>
                  {
                    options.map(({ title, onClick, danger, style, type, className }, index) => {
                      if (type === "separator") {
                        return (<DropdownMenuSeparator key={index} />)
                      } else {
                        return (
                          <DropdownMenuItem key={index} {...{ onClick, danger, style, className }}>{title}</DropdownMenuItem>
                        )
                      }
                    })
                  }
                </DropdownMenu>
                : children
              }
            </animated.div>
          )
        );
      })}
    </span>
  );
};
