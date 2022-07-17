import { ReactNode, CSSProperties } from 'react';

export interface LoaderProps {
  children?: ReactNode;
  variant?: VariantType;
  color?: string;
  size?: number;
  type?: 'rotate' | 'flow';
  loading?: boolean;
  description?: string;
  style?: CSSProperties;
  background?: BackgroundType;
}

type VariantType = 'three' | 'four';

export type LoaderContentStyle = Pick<CSSProperties, 'borderRadius'>;

export type LoaderDescriptionProps = {
  color: string;
  size: number;
};

type BackgroundType = {
  backgroundColor?: string;
  blur?: number;
  opacity?: number;
  shade?: number;
};
