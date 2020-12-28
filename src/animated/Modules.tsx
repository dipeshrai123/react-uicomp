/* eslint-disable no-unused-vars */
import React from "react";
import { animated, AnimatedProps } from "react-spring";
import { useAnimatedValue } from "./Animation";

// Animated Block - can receive all props from useAnimatedValue() hook
export const AnimatedBlock = React.forwardRef(
  (
    { children, ...rest }: AnimatedProps<any>,
    ref: React.RefObject<HTMLDivElement>,
  ) => (
    <animated.div ref={ref} {...rest}>
      {children}
    </animated.div>
  ),
);

// ScrollableBlock
interface UseAnimatedValueConfig {
  onAnimationEnd?: (value: number) => void;
  listener?: (value: number) => void;
  animationType?: "ease" | "elastic";
  duration?: number;
  [prop: string]: any;
}

interface ScrollableBlockProps {
  children?: (animation: any) => React.ReactNode;
  direction?: "single" | "both";
  animationConfig?: UseAnimatedValueConfig;
}

export const ScrollableBlock: React.FC<ScrollableBlockProps> = (props) => {
  const { children, direction = "single", animationConfig } = props;
  const scrollableBlockRef = React.useRef(null);
  const animation = useAnimatedValue(0, animationConfig); // 0: not intersecting | 1: intersecting

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      function ([entry]) {
        const { isIntersecting } = entry;

        if (isIntersecting) {
          animation.value = 1;
        } else {
          if (direction === "both") animation.value = 0;
        }
      },
      {
        root: null, // FOR VIEWPORT ONLY
        rootMargin: "0px",
        threshold: [0, 0.8],
      },
    );

    if (scrollableBlockRef.current) {
      observer.observe(scrollableBlockRef.current);
    }

    return () => {
      if (scrollableBlockRef.current) {
        observer.unobserve(scrollableBlockRef.current);
      }
    };
  }, []);

  return <div ref={scrollableBlockRef}>{children(animation)}</div>;
};
