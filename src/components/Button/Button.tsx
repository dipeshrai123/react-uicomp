import * as React from 'react';
import { AnimatedBlock, interpolate, useMountedValue } from 'react-ui-animate';
import styled from 'styled-components';
import { colors, fonts } from '../../constants';

const StyledButton = styled.button`
  padding: 14px 24px;
  display: block;
  background-color: white;
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
}): any => {
  const [opened, setOpened] = React.useState(true);
  const openRipple = useMountedValue(opened, {
    from: 0,
    enter: 1,
    exit: 2,
    config: { duration: 400 },
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
            backgroundColor: '#a1a1a133',
            ...rippleStyle,
            position: 'absolute',
            left: x - 50,
            top: y - 50,
            width: 100,
            height: 100,
            borderRadius: '50%',
            scale: animation.value,
            opacity: interpolate(animation.value, [0, 1, 2], [0, 1, 0]),
          }}
        />
      )
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  titleStyle?: Omit<React.CSSProperties, 'zIndex' | 'position'>;
  rippleStyle?: Omit<
    React.CSSProperties,
    | 'position'
    | 'left'
    | 'top'
    | 'width'
    | 'height'
    | 'borderRadius'
    | 'transform'
  >;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef((props: ButtonProps, ref: any) => {
  const {
    title,
    style,
    className,
    titleStyle,
    rippleStyle,
    leftIcon,
    rightIcon,
    onClick,
    ...rest
  } = props;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number }>>(
    []
  );

  return (
    <div
      ref={containerRef}
      style={{
        display: 'inline-block',
      }}
    >
      <StyledButton
        ref={ref}
        {...rest}
        onMouseDown={(e) => {
          if (!!containerRef.current) {
            const x = e.clientX - containerRef.current.offsetLeft;
            const y = e.clientY - containerRef.current.offsetTop;

            setRipples((prev) => {
              return [...prev, { x, y }];
            });
          }
        }}
        {...{ style, className }}
        onClick={onClick}
      >
        <div
          style={{
            ...titleStyle,
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ marginRight: 10 }}>{leftIcon}</span>
          {title}
          <span style={{ marginLeft: 10 }}>{rightIcon}</span>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          {ripples.map(({ x, y }, index) => {
            return <Ripple {...{ x, y, rippleStyle }} key={index} />;
          })}
        </div>
      </StyledButton>
    </div>
  );
});
