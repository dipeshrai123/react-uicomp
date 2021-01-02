import * as React from "react";
import {
  useOutsideClick,
  AnimatedBlock,
  useMountedValue,
  interpolate,
} from "react-ui-animate";
import { AnimationType, getAnimationConfig } from "../modules";

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

interface DropdownProps {
  children?: React.ReactNode;
  trigger: (elementArg: triggerElementArgType) => React.ReactNode;
  active?: boolean;
  isAnimated?: boolean;
  animationType?: AnimationType;
  style?: Omit<React.CSSProperties, "transform" | "position" | "opacity">;
  placement?: placementType;
  outDismiss?: boolean;
  inDismiss?: boolean;
  triggerToggle?: boolean;
}

export const Dropdown = ({
  children,
  trigger,
  active = false,
  isAnimated = true,
  animationType = "expand",
  style,
  placement = "bottomleft",
  outDismiss = true,
  inDismiss = false,
  triggerToggle = false,
}: DropdownProps) => {
  const containerRef: React.RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null,
  );

  const [dropdownActive, setDropdownActive] = React.useState<boolean>(active);

  const config = isAnimated
    ? getAnimationConfig(animationType)
    : { enterDuration: 0.001, exitDuration: 0.001 };

  const dropdownAnimation = useMountedValue(dropdownActive, [0, 1, 0], config);

  // Open dropdown method
  const openDropdown: () => void = React.useCallback(() => {
    if (!dropdownActive) {
      setDropdownActive(true);
    }
  }, [dropdownActive]);

  // Open dropdown method
  const closeDropdown: () => void = () => {
    setDropdownActive(false);
  };

  // Toggle dropdown
  const toggleDropdown: () => void = React.useCallback(() => {
    if (dropdownActive) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }, [dropdownActive]);

  // Handle outside click on container
  if (outDismiss) {
    useOutsideClick(containerRef, () => {
      closeDropdown();
    });
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
  const dropdownMenuStyles: any = {
    zIndex: 100,
    whiteSpace: "nowrap",
    ...getDirectionStyles(placement),
    ...getTransformOrigin(placement),
    ...style,
  };

  // DismissOnElementClick
  const onClick = triggerToggle ? toggleDropdown : openDropdown;

  // INTERPOLATION
  const minScale = animationType === "fade" ? 1 : 0.6;
  const maxScale = 1;

  let translateX: number;
  if (placement === "bottommiddle" || placement === "topmiddle") {
    translateX = -50;
  } else {
    translateX = 0;
  }

  return (
    <span ref={containerRef} style={containerStyles}>
      <span {...{ onClick }} style={dropdownElementStyles}>
        {trigger({
          active: dropdownActive,
        })}
      </span>
      {dropdownAnimation((animation, mounted) => {
        return (
          mounted && (
            <AnimatedBlock
              onClick={() => (inDismiss ? closeDropdown() : false)}
              style={{
                ...dropdownMenuStyles,
                position: "absolute",
                opacity: animation.value,
                transform: interpolate(
                  animation.value,
                  [0, 1],
                  [
                    `scale(${minScale}) translateX(${translateX}%)`,
                    `scale(${maxScale}) translateX(${translateX}%)`,
                  ],
                ),
              }}
            >
              {children}
            </AnimatedBlock>
          )
        );
      })}
    </span>
  );
};
