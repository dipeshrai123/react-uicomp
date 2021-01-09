import * as React from "react";

import {
  AnimatedBlock,
  useMeasure,
  interpolate,
  useAnimatedValue,
} from "react-ui-animate";

interface CollapseProps {
  children?: React.ReactNode;
  expand: boolean;
  timeout?: number;
}
export function Collapse({ children, expand, timeout = 300 }: CollapseProps) {
  const [divheight, setDivheight] = React.useState<any>(0);
  const dimension = useMeasure(({ height }) => {
    setDivheight(height);
  });

  const open = useAnimatedValue(expand, {
    duration: timeout,
  });

  return (
    <div>
      <AnimatedBlock
        style={{
          height: interpolate(open.value, [0, 1], [0, divheight]),
          overflow: "hidden",
        }}
      >
        <div style={{ overflow: "hidden" }} {...dimension(null)}>
          {children}
        </div>
      </AnimatedBlock>
    </div>
  );
}
