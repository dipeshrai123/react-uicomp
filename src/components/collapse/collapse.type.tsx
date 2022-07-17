import { CSSProperties, ReactNode } from 'react';

export interface CollapseProps {
  type?: 'accordion' | 'collapse' | 'details';
  children?: ReactNode;
  collapseList?: Array<CollapseItems>;
  style?: CSSProperties;
  multiple?: boolean;
  header?: ReactNode;
  iconVisible?: boolean;
  content?: ReactNode | string | number | Element;
  globalHeight?: number;
  trigger?: boolean;
  triggerToggle?: boolean;
}

export interface CollapseItemProps {
  children?: ReactNode;
  header: ReactNode;
  content?: ReactNode | string | number | Element;
  iconVisible?: boolean;
  itemHeight?: number;
  trigger?: boolean;
  triggerToggle?: boolean;
  globalHeight?: number;
}

export interface CustomCollapseItemProps extends CollapseItemProps {
  childrenClassName?: string;
}

export type CollapseItems = {
  itemHeight?: number;
  header: ReactNode;
  content: ReactNode | string | number | Element;
};
