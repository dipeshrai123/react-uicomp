import React from "react";
import { animated } from "react-spring";

interface AnimatedBlockProps {
  children?: React.ReactNode;
}

// Animated Block - can receive all props from useAnimatedValue() hook
export const AnimatedBlock = ({ children, ...rest }: AnimatedBlockProps) => {
  return <animated.div {...rest}>{children}</animated.div>;
};
