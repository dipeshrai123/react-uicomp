import React from "react";
import { animated } from "react-spring";

interface AnimatedBlockProps {
  children?: React.ReactNode;
  [name: string]: any; // ACCEPT ANY PROPS
}

// Animated Block - can receive all props from useAnimatedValue() hook
export const AnimatedBlock = React.forwardRef(
  (
    { children, ...rest }: AnimatedBlockProps,
    ref: React.RefObject<HTMLDivElement>,
  ) => (
    <animated.div ref={ref} {...rest}>
      {children}
    </animated.div>
  ),
);
