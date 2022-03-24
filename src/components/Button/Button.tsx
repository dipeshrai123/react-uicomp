import * as React from 'react';
import { AnimatedBlock, interpolate, useMountedValue } from 'react-ui-animate';
import styled from 'styled-components';

import { LoadingIndicator } from '../../commons';
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
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  loading?: boolean;
  disabled?: boolean;
}

const getVariantStyle = ({
  backgroundColor,
  hoverColor,
  textColor,
  disabled,
}: {
  backgroundColor: string;
  hoverColor: string;
  textColor: string;
  disabled?: boolean;
}) => {
  return `
    border: 1px solid ${colors.light.grey200};
    color: ${textColor};
    background-color: ${backgroundColor};

    ${
      !disabled &&
      `
      &:hover {
        background-color: ${hoverColor};
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
      }
      `
    }
  `;
};

const handleVariant = ({
  variant,
  disabled,
}: Pick<ButtonProps, 'variant' | 'disabled'>) => {
  switch (variant) {
    case 'primary':
      return getVariantStyle({
        backgroundColor: colors.light.primary100,
        hoverColor: colors.light.primary200,
        textColor: colors.light.white,
        disabled,
      });
    case 'danger':
      return getVariantStyle({
        backgroundColor: colors.light.red,
        hoverColor: colors.light.darkRed,
        textColor: colors.light.white,
        disabled,
      });
    case 'info':
      return getVariantStyle({
        backgroundColor: colors.light.teal,
        hoverColor: colors.light.darkTeal,
        textColor: colors.light.white,
        disabled,
      });
    case 'success':
      return getVariantStyle({
        backgroundColor: colors.light.green,
        hoverColor: colors.light.darkGreen,
        textColor: colors.light.white,
        disabled,
      });
    case 'warning':
      return getVariantStyle({
        backgroundColor: colors.light.orange,
        hoverColor: colors.light.darkOrange,
        textColor: colors.light.white,
        disabled,
      });
    case 'default':
    default:
      return getVariantStyle({
        backgroundColor: colors.light.white,
        hoverColor: colors.light.grey200,
        textColor: colors.light.black,
        disabled,
      });
  }
};

const StyledButton = styled.button<ButtonProps>`
  padding: 14px 18px;
  display: block;
  outline: none;
  border-radius: 10px;
  margin: 0px;
  cursor: pointer;
  position: relative;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.2s, background-color 0.3s;

  ${({ variant, disabled }) => handleVariant({ variant, disabled })}
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
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
      loading = false,
      disabled = false,
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
            if (!!containerRef.current && !loading) {
              const x = e.clientX - containerRef.current.offsetLeft;
              const y = e.clientY - containerRef.current.offsetTop;

              setRipples((prev) => {
                return [...prev, { x, y }];
              });
            }
          }}
          {...{ style, className, variant }}
          onClick={(e) => {
            if (!loading) {
              onClick && onClick(e);
            }
          }}
          variant={variant}
          disabled={loading || disabled}
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
            {loading ? (
              <LoadingIndicator
                color={
                  variant === undefined || variant === 'default'
                    ? colors.light.grey200
                    : colors.light.grey400
                }
              />
            ) : (
              <>
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
              </>
            )}
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
