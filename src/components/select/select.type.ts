import { CSSProperties } from 'react';

export interface SelectFieldProps {
  name: string;
  // value: string;
  onInputChange: (e: any) => void;
  options: any;
  label?: string;
  height?: string | number;
  width?: string | number;
  containerStyle?: CSSProperties;
  placeholder?: string;
  fontStyle?: FontType;
  labelStyle?: CSSProperties;
  controlStyle?: CSSProperties;
  optionStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  placeholderStyle?: CSSProperties;
  singleValueStyle?: CSSProperties;
  multiValueStyle?: CSSProperties;
  multiValueLabelStyle?: CSSProperties;
  menuListStyle?: CSSProperties;
  menuStyle?: CSSProperties;
  color?: ColorType;
  isMulti?: boolean;
  isLoading?: boolean;
}

export type FontType = {
  fontFamily?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
};

export interface BoxProps {
  color?: ColorType;
}

type ColorType =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'defaultFill'
  | 'primaryFill'
  | 'secondaryFill'
  | 'infoFill'
  | 'successFill'
  | 'warningFill'
  | 'errorFill';
