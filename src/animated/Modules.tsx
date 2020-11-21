import React from "react";
import { useAnimatedValue } from "./Animation";
import { animated } from "react-spring";

// Animated Block - can receive all props from useAnimatedValue() hook
interface AnimatedBlockProps {
  children?: React.ReactNode;
  [name: string]: any; // ACCEPT ANY PROPS
}

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

// ScrollableBlock - New AnimatedBLock
// TODO: Bidirectional Animation
// Container element
interface ScrollableBlockProps {
  children?: (animation: any) => React.ReactNode;
}

export const ScrollableBlock: React.FC<ScrollableBlockProps> = (props) => {
  const { children } = props;
  const scrollableBlockRef = React.useRef(null);
  const animation = useAnimatedValue(0); // 0: not intersecting | 1: intersecting

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      function ([entry]) {
        const { isIntersecting } = entry;

        if (isIntersecting) {
          animation.value = 1;
        } else {
          console.log(entry);
          animation.value = 0;
        }
      },
      {
        root: null, // FOR VIEWPORT ONLY
        rootMargin: "0px",
        threshold: [0, 0.8],
      },
    );

    observer.observe(scrollableBlockRef.current);

    return () => observer.unobserve(scrollableBlockRef.current);
  }, []);

  return <div ref={scrollableBlockRef}>{children(animation)}</div>;
};
