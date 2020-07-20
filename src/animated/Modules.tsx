import React from "react";
import { animated } from "react-spring";

interface AnimatedBlockProps {
  children?: React.ReactNode;
  [name: string]: any; // ACCEPT ANY PROPS
}

// Animated Block - can receive all props from useAnimatedValue() hook
export const AnimatedBlock = ({ children, ...rest }: AnimatedBlockProps) => {
  return <animated.div {...rest}>{children}</animated.div>;
};
