import * as React from 'react';
import { AnimatedBlock, interpolate, useMountedValue } from 'react-ui-animate';
import styled from 'styled-components';
import { colors } from '../../constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
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
  variant?:
    | 'default'
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'ghost';
}

const handleVariant = ({ variant }: Pick<ButtonProps, 'variant'>) => {
  switch (variant) {
    case 'primary':
      return `
        background-color: ${colors.light.primary100};
        border: 1px solid ${colors.light.primary100};
        color: ${colors.light.white};

        &:focus {
          border: 1px solid ${colors.light.primary100};
        }
      
        &:hover {
          background-color: ${colors.light.primary200};
        }
      
        &:active {
          background-color: ${colors.light.primary200};
        }
      `;
    case 'danger':
      return `
        background-color: ${colors.light.red};
        border: 1px solid ${colors.light.red};
        color: ${colors.light.white};

        &:focus {
          border: 1px solid ${colors.light.red};
        }
      
        &:hover {
          background-color: ${colors.light.darkRed};
        }
      
        &:active {
          background-color: ${colors.light.darkRed};
        }
      `;
    case 'info':
      return `
        background-color: ${colors.light.teal};
        border: 1px solid ${colors.light.teal};
        color: ${colors.light.white};

        &:focus {
          border: 1px solid ${colors.light.teal};
        }
      
        &:hover {
          background-color: ${colors.light.darkTeal};
        }
      
        &:active {
          background-color: ${colors.light.darkTeal};
        }
      `;
    case 'success':
      return `
        background-color: ${colors.light.green};
        border: 1px solid ${colors.light.green};
        color: ${colors.light.white};
      
        &:hover {
          background-color: ${colors.light.darkGreen};
        }
      
        &:active {
          background-color: ${colors.light.darkGreen};
        }
      
        &:focus {
          border: 1px solid ${colors.light.green};
        }
      `;
    case 'warning':
      return `
        background-color: ${colors.light.orange};
        border: 1px solid ${colors.light.orange};
        color: ${colors.light.white};

        &:focus {
          border: 1px solid ${colors.light.orange};
        }
      
        &:hover {
          background-color: ${colors.light.darkOrange};
        }
      
        &:active {
          background-color: ${colors.light.darkOrange};
        }
      `;
    case 'ghost':
      return `
        background-color: rgba(255, 255, 255, 0);
        border: 1px solid rgba(255, 255, 255, 0);
        color: ${colors.light.black};
        box-shadow: none;

        &:focus {
          border: 1px solid ${colors.light.grey300};
        }
      
        &:hover {
          background-color: ${colors.light.grey300};
        }
      
        &:active {
          background-color: ${colors.light.grey300};
        }
      `;
    case 'default':
    default:
      return `
        background-color: ${colors.light.white};
        border: 1px solid ${colors.light.grey200};
        color: ${colors.light.black100};
      
        &:hover {
          background-color: ${colors.light.grey200};
        }
      
        &:active {
          background-color: ${colors.light.grey200};
        }
      
        &:focus {
          border: 1px solid ${colors.light.grey200};
        }
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  padding: 10px 14px;
  display: block;
  outline: none;
  border-radius: 4px;
  margin: 0px;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);

  ${({ variant }) => handleVariant({ variant })}
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
    config: {
      duration: 400,
    },
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
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            ...rippleStyle,
            position: 'absolute',
            left: x - 40,
            top: y - 40,
            width: 80,
            height: 80,
            borderRadius: '50%',
            scale: animation.value,
            opacity: interpolate(animation.value, [0, 1, 2], [0, 1, 0]),
          }}
        />
      )
  );
};

export const Button = React.forwardRef(
  (
    {
      title,
      style,
      className,
      titleStyle,
      rippleStyle,
      leftIcon,
      rightIcon,
      onClick,
      variant,
      ...rest
    }: ButtonProps,
    ref: any
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [ripples, setRipples] = React.useState<
      Array<{ x: number; y: number }>
    >([]);

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
          {...{ style, className, variant }}
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
            <span>{leftIcon}</span>
            {title && (
              <span
                style={{
                  marginLeft: leftIcon ? 10 : 0,
                  marginRight: rightIcon ? 10 : 0,
                }}
              >
                {title}
              </span>
            )}
            <span>{rightIcon}</span>
          </div>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              borderRadius: 4,
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
  }
);
