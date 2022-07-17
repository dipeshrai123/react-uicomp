import { CSSProperties, ReactNode } from 'react';

export interface AccordionProps {
    children?: ReactNode;
    accordionList: Array<AccordionItems>;
    style?: CSSProperties;
    iconVisible?: boolean;
    globalHeight?: number;
}

export interface AccordionItemProps {
    children?: ReactNode;
    header: string;
    content: ReactNode | string | number | Element;
    iconVisible?: boolean;
    itemHeight?: number;
    globalHeight?: number;
    clicked?: boolean;
    handleClick: Function;
}

export type AccordionItems = {
    itemHeight?: number;
    header: string;
    content: ReactNode | string | number | Element;
    clicked?: boolean;
};
