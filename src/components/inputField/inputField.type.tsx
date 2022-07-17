import React, { CSSProperties, ReactNode } from 'react';

export interface InputFieldProps extends React.InputHTMLAttributes<any> {
  name: string;
  style?: CSSProperties;
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  loaderStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  color?: ColorType;
  onChange: React.FormEventHandler<HTMLInputElement>;
  leftAdorn?: ReactNode;
  rightAdorn?: ReactNode;
  leftStyle?: CSSProperties;
  rightStyle?: CSSProperties;
  inputCount?: boolean;
  clear?: () => void;
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  borderless?: boolean;
  max?: string | number;
  min?: string | number;
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<any> {
  name: string;
  style?: CSSProperties;
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  cols?: number;
  rows?: number;
  labelStyle?: CSSProperties;
  loaderStyle?: CSSProperties;
  color?: ColorType;
  onChange: React.FormEventHandler<HTMLTextAreaElement>;
  inputCount?: boolean;
  clear?: () => void;
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  borderless?: boolean;
  maxLength?: number;
  minLength?: number;
}

export interface SearchFieldProps extends React.InputHTMLAttributes<any> {
  name: string;
  style?: CSSProperties;
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  labelStyle?: CSSProperties;
  loaderStyle?: CSSProperties;
  color?: ColorType;
  onChange: React.FormEventHandler<HTMLInputElement>;
  right?: boolean;
  leftStyle?: CSSProperties;
  rightStyle?: CSSProperties;
  inputCount?: boolean;
  clear?: () => void;
  loading?: boolean;
  disabled?: boolean;
  borderless?: boolean;
  max?: string | number;
  min?: string | number;
}

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
