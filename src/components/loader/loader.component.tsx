import { useState } from 'react';
import { useMeasure } from 'react-ui-animate';
import { getLightDarkColor } from '../../utils';
import { ThreeDotsLoader, FourDotsLoader } from './components';

import {
  LoaderChildren,
  LoaderContainer,
  LoaderContent,
  LoaderDescription,
} from './loader.styled';
import { LoaderContentStyle, LoaderProps } from './loader.type';

export const Loader = ({
  variant = 'four',
  children,
  color = '#808080',
  size = 20,
  type = 'rotate',
  loading,
  style = { borderRadius: 0 },
  description,
  background = {
    blur: 0,
    backgroundColor: color,
    opacity: 0.9,
    shade: 1,
  },
}: LoaderProps) => {
  const { blur, backgroundColor, opacity, shade } = background;

  const [height, setHeight] = useState<any>(0);

  const bind = useMeasure(({ height }: any) => {
    setHeight(height);
  });

  const loaderContentStyle: LoaderContentStyle = style;

  return children ? (
    <LoaderContainer style={style}>
      <LoaderChildren {...bind()}>{children}</LoaderChildren>
      {loading && (
        <LoaderContent
          style={{
            ...loaderContentStyle,
            position: 'absolute',
            height,
            backgroundColor: getLightDarkColor(shade, backgroundColor, opacity),
            backdropFilter: `blur(${blur}px)`,
          }}
        >
          {variant === 'four' ? (
            <FourDotsLoader color={color} size={size} type={type} />
          ) : (
            <ThreeDotsLoader color={color} size={size} type={type} />
          )}
          {description && (
            <LoaderDescription color={color} size={size}>
              {description}
            </LoaderDescription>
          )}
        </LoaderContent>
      )}
    </LoaderContainer>
  ) : (
    <>
      {variant === 'four' ? (
        <FourDotsLoader color={color} size={size} type={type} />
      ) : (
        <ThreeDotsLoader color={color} size={size} type={type} />
      )}
      {description && (
        <LoaderDescription color={color} size={size}>
          {description}
        </LoaderDescription>
      )}
    </>
  );
};
