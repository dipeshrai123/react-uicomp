import * as React from "react";
import { AnimatedBlock, interpolate, useMountedValue } from "react-ui-animate";
import styled from "styled-components";
import { colors, fonts } from "../constants";

const StyledButton = styled.button`
  padding: 14px 24px;
  display: block;
  background-color: white;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid ${colors.light.lightBorderColor};
  outline: none;
  border-radius: 10px;
  margin: 0px;
  font-family: ${fonts.family.arial};
  font-weight: bold;
  cursor: pointer;
  color: ${colors.light.defaultTextColor};
  transition: background-color 0.3s;
  position: relative;

  &:hover {
    background-color: ${colors.light.backgroundColor};
  }

  &:active {
    background-color: ${colors.light.defaultBorderColor};
  }

  &:focus {
    border: 2px solid ${colors.light.defaultBorderColor};
  }
`;

const Ripple = ({
  x,
  y,
  rippleStyle,
  rippleClassName,
}: {
  x: number;
  y: number;
  rippleStyle?: React.CSSProperties;
  rippleClassName?: string;
}) => {
  const [opened, setOpened] = React.useState(true);
  const openRipple = useMountedValue(opened, [0, 1, 2], {
    duration: 400,
  });

  React.useEffect(() => {
    setOpened(false);
  }, []);

  return openRipple(
    (animation, mounted) =>
      mounted && (
        <AnimatedBlock
          className={rippleClassName}
          style={{
            backgroundColor: colors.light.darkBorderColor,
            ...rippleStyle,
            position: "absolute",
            left: x - 50,
            top: y - 50,
            width: 100,
            height: 100,
            borderRadius: "50%",
            scale: animation.value,
            opacity: interpolate(animation.value, [0, 1, 2], [0, 0.3, 0]),
          }}
        />
      ),
  );
};

interface ButtonProps {
  title: string;
  style?: React.CSSProperties;
  className?: string;
  textStyle?: Omit<React.CSSProperties, "zIndex" | "position">;
  textClassName?: string;
  rippleStyle?: Omit<
    React.CSSProperties,
    | "position"
    | "left"
    | "top"
    | "width"
    | "height"
    | "borderRadius"
    | "transform"
  >;
  rippleClassName?: string;
  leftIcon?: React.ReactNode;
  leftIconStyle?: React.CSSProperties;
  leftIconClassName?: string;
  rightIcon?: React.ReactNode;
  rightIconStyle?: React.CSSProperties;
  rightIconClassName?: string;
}

export const Button = React.forwardRef(
  (props: ButtonProps, ref: React.RefObject<HTMLButtonElement>) => {
    const {
      title,
      style,
      className,
      textStyle,
      textClassName,
      rippleStyle,
      rippleClassName,
      leftIcon,
      leftIconStyle,
      leftIconClassName,
      rightIcon,
      rightIconStyle,
      rightIconClassName,
    } = props;
    const containerRef = React.useRef<HTMLDivElement>();
    const [ripples, setRipples] = React.useState<
      Array<{ x: number; y: number }>
    >([]);

    return (
      <div ref={containerRef}>
        <StyledButton
          ref={ref}
          onClick={(e) => {
            if (!!containerRef.current) {
              const x = e.clientX - containerRef.current.offsetLeft;
              const y = e.clientY - containerRef.current.offsetTop;

              setRipples((prev) => {
                return [...prev, { x, y }];
              });
            }
          }}
          {...{ style, className }}
        >
          <div
            className={textClassName}
            style={{
              ...textStyle,
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className={leftIconClassName}
              style={{ marginRight: 10, ...leftIconStyle }}
            >
              {leftIcon}
            </span>
            {title}
            <span
              className={rightIconClassName}
              style={{ marginLeft: 10, ...rightIconStyle }}
            >
              {rightIcon}
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {ripples.map(({ x, y }, index) => {
              return (
                <Ripple
                  {...{ x, y, rippleStyle, rippleClassName }}
                  key={index}
                />
              );
            })}
          </div>
        </StyledButton>
      </div>
    );
  },
);
