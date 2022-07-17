import { LoaderProps } from '../../button.type';
import { Bounce1, Bounce2, Bounce3, Loader } from './buttonLoader.styled';

export const ButtonLoader = ({ variant, color, disabled }: LoaderProps) => {
  return (
    <div>
      <Loader>
        <Bounce1 variant={variant} color={color} disabled={disabled} />
        <Bounce2 variant={variant} color={color} disabled={disabled} />
        <Bounce3 variant={variant} color={color} disabled={disabled} />
      </Loader>
    </div>
  );
};
