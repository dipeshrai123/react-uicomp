// import { Dispatch, SetStateAction } from 'react';

import { ReactNode } from 'react';

export interface TabContextType {
  tabHeader: string;
}

export type TabPanePropsType = {
  title: ReactNode;
  children: ReactNode;
  id: string;
};

export interface TabPropsType {
  children: ReactNode;
  trigger?: (fn: (id: string) => void) => void;
  activeId?: string;
  onTabChange?: (arg: TabChangeType) => void;
}

type TabChangeType = { activeTabId: string };
