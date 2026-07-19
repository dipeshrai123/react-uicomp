import * as React from "react";
import {
  useScroll,
  clamp,
  useAnimatedValue,
  AnimatedBlock,
  useMeasure,
} from "react-ui-animate";

interface DiffHeaderProps {
  children?: React.ReactNode;
  animated?: boolean;
  style?: Omit<React.CSSProperties, "position" | "transform">;
}

export const DiffHeader: React.FC<DiffHeaderProps> = ({
  children,
  animated = true,
  style,
}: DiffHeaderProps) => {
  const upperValue = React.useRef<any>(0);
  const y = useAnimatedValue(0, {
    immediate: !animated,
  });

  const scrollY = React.useRef(0);
  const diff = React.useRef(0);
  const prevY = React.useRef(0);
  const currY = React.useRef(0);

  useScroll(({ scrollY: sy }) => {
    currY.current = sy;
    diff.current = currY.current - prevY.current;
    scrollY.current = clamp(
      scrollY.current + diff.current,
      0,
      upperValue.current,
    );
    prevY.current = currY.current;

    y.value = -scrollY.current;
  });

  const bind = useMeasure(({ height }) => {
    upperValue.current = height;
  });

  return (
    <AnimatedBlock
      {...bind(null)}
      style={{
        top: 0,
        left: 0,
        width: "100%",
        ...style,
        position: "fixed",
        translateY: y.value,
      }}
    >
      {children}
    </AnimatedBlock>
  );
};
