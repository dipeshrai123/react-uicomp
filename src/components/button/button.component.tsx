import { useState, useEffect, useRef, forwardRef } from 'react';
import {
  interpolate,
  makeAnimatedComponent,
  useMountedValue,
} from 'react-ui-animate';

import {
  StyledButton,
  DisabledStyledButton,
  ButtonText,
  RippleContainer,
  RippleItem,
} from './button.styled';

import { ButtonProps, RippleProps } from './button.type';
import { ButtonLoader } from './components';

const ButtonTextAnimated = makeAnimatedComponent(ButtonText);
const RippleItemAnimated: any = makeAnimatedComponent(RippleItem);

const ButtonTextContainer = (props: ButtonProps) => {
  const {
    title,
    textStyle,
    leftIcon,
    disabled,
    rightIcon,
    loading,
    variant,
    children,
    color = 'default',
  } = props;
  return (
    <ButtonTextAnimated
      style={{
        ...textStyle,
      }}
    >
      {loading ? (
        <ButtonLoader variant={variant} color={color} disabled={disabled} />
      ) : (
        <>
          {leftIcon}
          <span
            style={{
              padding: rightIcon || leftIcon ? '8px' : '',
            }}
          >
            {title}
            {children}
          </span>
          {rightIcon}
        </>
      )}
    </ButtonTextAnimated>
  );
};

export const Button = forwardRef((props: ButtonProps, ref: any) => {
  const {
    title,
    style,
    className,
    textStyle,
    leftIcon,
    rightIcon,
    rippleColor,
    onClick,
    loading,
    disabled,
    variant,
    children,
    color = 'default',
    ...rest
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'inline-block',
      }}
    >
      {disabled ? (
        <DisabledStyledButton
          style={{ ...style, cursor: disabled ? 'not-allowed' : 'default' }}
          variant={variant}
          color={color}
        >
          <ButtonTextContainer {...props} />
        </DisabledStyledButton>
      ) : (
        <StyledButton
          ref={ref}
          {...rest}
          onClick={onClick}
          {...{ style, className }}
          variant={variant}
          color={color}
        >
          <ButtonTextContainer {...props} />
        </StyledButton>
      )}
    </div>
  );
});

function Ripple({ x, y, color, variant, rippleColor }: RippleProps): any {
  const [opened, setOpened] = useState(true);
  const openRipple = useMountedValue(opened, {
    from: 0,
    enter: 1,
    exit: 2,
    config: { duration: 700 },
  });

  useEffect(() => {
    setOpened(false);
  }, []);

  return openRipple(
    (animation, mounted) =>
      mounted && (
        <RippleItemAnimated
          style={{
            position: 'absolute',
            zIndex: 10,
            width: 100,
            height: 100,
            borderRadius: '50%',
            left: x - 50,
            top: y - 50,
            backgroundColor: rippleColor,
            scale: animation.value,
            opacity: interpolate(animation.value, [0, 1, 2], [0, 0.3, 0]),
          }}
          color={color}
          variant={variant}
        />
      )
  );
}

export const RippleButton = forwardRef((props: ButtonProps, ref: any) => {
  const {
    title,
    style,
    className,
    textStyle,
    leftIcon,
    rightIcon,
    rippleColor,
    onClick,
    loading,
    disabled,
    variant,
    children,
    color = 'default',
    ...rest
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number }>>([]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'inline-block',
      }}
    >
      {disabled ? (
        <DisabledStyledButton
          style={{ ...style, cursor: disabled ? 'not-allowed' : 'default' }}
          variant={variant}
          color={color}
        >
          <ButtonTextContainer {...props} />
        </DisabledStyledButton>
      ) : (
        <StyledButton
          ref={ref}
          {...rest}
          onMouseDown={(e) => {
            if (containerRef.current) {
              const containerBounds =
                containerRef.current.getBoundingClientRect();

              const x = e.clientX - containerBounds.left;
              const y = e.clientY - containerBounds.top;

              setRipples((prev) => {
                return [...prev, { x, y }];
              });
            }
          }}
          onClick={onClick}
          {...{ style, className }}
          variant={variant}
          color={color}
        >
          <ButtonTextContainer {...props} />
          <RippleContainer>
            {ripples.map(({ x, y }, index) => {
              return (
                <Ripple
                  {...{ x, y }}
                  key={index}
                  rippleColor={rippleColor}
                  color={color}
                  variant={variant}
                />
              );
            })}
          </RippleContainer>
        </StyledButton>
      )}
    </div>
  );
});
