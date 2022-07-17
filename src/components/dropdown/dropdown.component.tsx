import * as React from 'react';
import {
  useOutsideClick,
  AnimatedBlock,
  useMountedValue,
  interpolate,
  AnimationConfigUtils,
} from 'react-ui-animate';
import {
  MenuBreakStyled,
  MenuIconStyled,
  MenuItemStyled,
  MenuStyled,
} from './dropdown.styled';

import {
  DropdownMenuItem,
  DropdownProps,
  placementType,
} from './dropdown.type';

const getAnimationConfig = (animationType: any) => {
  switch (animationType) {
    case 'elastic':
      return { ...AnimationConfigUtils.ELASTIC };
    case 'fade':
      return { ...AnimationConfigUtils.EASE_IN_OUT };
    case 'ease':
      return { ...AnimationConfigUtils.EASE };

    default:
      return { ...AnimationConfigUtils.ELASTIC };
  }
};

export const Dropdown = ({
  children,
  trigger,
  triggerElement,
  active = false,
  isAnimated = true,
  animationType = 'elastic',
  style,
  placement = 'bottomleft',
  outDismiss = true,
  inDismiss = false,
  triggerToggle = false,
  containerClass,
}: DropdownProps) => {
  const containerRef: React.RefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null);

  const [dropdownActive, setDropdownActive] = React.useState<boolean>(active);

  const config = isAnimated
    ? getAnimationConfig(animationType)
    : { duration: 1 };

  const dropdownAnimation = useMountedValue(dropdownActive, {
    from: 0,
    enter: 1,
    exit: 0,
    config,
  });

  // Open dropdown method
  const openDropdown: () => void = React.useCallback(() => {
    if (!dropdownActive) {
      setDropdownActive(true);
    }
  }, [dropdownActive]);

  // Open dropdown method
  const closeDropdown: () => void = () => {
    setDropdownActive(false);
  };

  // Toggle dropdown
  const toggleDropdown: () => void = React.useCallback(() => {
    if (dropdownActive) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }, [dropdownActive, openDropdown]);

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  };

  // Direction of dropdown menu
  const getDirectionStyles: (pm: placementType) => React.CSSProperties = (
    pm: placementType
  ) => {
    switch (pm) {
      case 'bottomleft':
        return { left: 0, top: '100%' };
      case 'bottommiddle':
        return { left: '50%', top: '100%' };
      case 'bottomright':
        return { right: 0, top: '100%' };
      case 'topleft':
        return { left: 0, bottom: '100%' };
      case 'topmiddle':
        return { left: '50%', bottom: '100%' };
      case 'topright':
        return { right: 0, bottom: '100%' };
    }
  };

  // Transform origin of dropdown animation
  const getTransformOrigin: (pm: placementType) => React.CSSProperties = (
    pm: placementType
  ) => {
    switch (pm) {
      case 'bottomleft':
        return { transformOrigin: '0% 0%' };
      case 'bottommiddle':
        return { transformOrigin: '0% 0%' };
      case 'bottomright':
        return { transformOrigin: '100% 0%' };
      case 'topleft':
        return { transformOrigin: '0% 100%' };
      case 'topmiddle':
        return { transformOrigin: '0% 100%' };
      case 'topright':
        return { transformOrigin: '100% 100%' };
    }
  };

  const dropdownElementStyles: React.CSSProperties = {};
  const dropdownMenuStyles: any = {
    zIndex: 3,
    whiteSpace: 'nowrap',
    ...getDirectionStyles(placement),
    ...getTransformOrigin(placement),
    ...style,
  };

  // DismissOnElementClick
  const onClick = triggerToggle ? toggleDropdown : openDropdown;

  // INTERPOLATION
  const minScale = animationType === 'fade' ? 0 : 0.6;
  const maxScale = 1;

  let translateX: number;
  if (placement === 'bottommiddle' || placement === 'topmiddle') {
    translateX = -50;
  } else {
    translateX = 0;
  }

  // Handle outside click on container
  // if (outDismiss) {
  useOutsideClick(containerRef, () => {
    outDismiss && closeDropdown();
  });
  // }

  return (
    <span ref={containerRef} style={{ ...containerStyles }}>
      <span {...{ onClick }} style={{ ...dropdownElementStyles }}>
        {trigger
          ? trigger({
              active: dropdownActive,
            })
          : triggerElement}
      </span>
      {dropdownAnimation((animation, mounted) => {
        return (
          mounted && (
            <AnimatedBlock
              onClick={() => (inDismiss ? closeDropdown() : false)}
              style={{
                ...dropdownMenuStyles,
                display: 'flex',
                justifyContent: 'flex-start',
                justifyItems: 'center',
                alignItems: 'flex-start',
                alignContent: 'center',
                flexDirection: 'column',
                position: 'absolute',
                opacity: animation.value,
                pointerEvents: dropdownActive ? 'auto' : 'none',
                transform: interpolate(
                  animation.value,
                  [0, 1],
                  [
                    `scale(${minScale}) translateX(${translateX}%)`,
                    `scale(${maxScale}) translateX(${translateX}%)`,
                  ]
                ),
                ...containerClass,
              }}
            >
              {children}
            </AnimatedBlock>
          )
        );
      })}
    </span>
  );
};

export const Menu = ({ children, style, className }: any) => {
  return (
    <MenuStyled style={style} className={className}>
      {children}
    </MenuStyled>
  );
};
export const MenuItem = ({
  title,
  children,
  style,
  className,
  icon,
  hoverColor = '#f1f1f1',
  onClick,
  danger,
}: DropdownMenuItem) => {
  return (
    <MenuItemStyled
      style={{
        color: danger
          ? typeof danger === 'boolean'
            ? 'red'
            : danger
          : 'black',
        ...style,
      }}
      className={className}
      hoverColor={hoverColor}
      onClick={onClick}
    >
      {icon && <MenuIconStyled>{icon}</MenuIconStyled>}

      {title}
      {children}
    </MenuItemStyled>
  );
};

export const MenuBreak = ({ style, className }: any) => {
  return <MenuBreakStyled style={style} className={className} />;
};

Dropdown.Menu = Menu;
Dropdown.Item = MenuItem;
Dropdown.Break = MenuBreak;
