export interface DropdownProps {
  children?: React.ReactNode;
  triggerElement?: React.ReactNode;
  trigger?: (elementArg: triggerElementArgType) => React.ReactNode;
  active?: boolean;
  isAnimated?: boolean;
  animationType?: 'elastic' | 'fade' | 'ease';
  style?: Omit<React.CSSProperties, 'transform' | 'position' | 'opacity'>;
  placement?: placementType;
  outDismiss?: boolean;
  inDismiss?: boolean;
  triggerToggle?: boolean;
  containerClass?: React.CSSProperties;
}

export type DropdownMenuList = Array<DropdownMenuList>;

export type DropdownMenuItem = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  title?: React.ReactNode;
  hoverColor?: string;
  onClick?: () => void;
  danger?: boolean | string;
};

export type triggerElementArgType = {
  active: boolean;
};

export type placementType =
  | 'bottomleft'
  | 'bottomright'
  | 'bottommiddle'
  | 'topleft'
  | 'topright'
  | 'topmiddle';
