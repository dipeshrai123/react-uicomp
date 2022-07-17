import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../../../constants';
import { LoaderProps } from '../../button.type';

const { variantOptions, colorOptions } = colors;

const bouncer = keyframes`
    0%, 80%, 100%{
        transform: scale(0)
    }
    40%{
        transform: scale(1)
    }
`;

const Loader = styled.div`
  margin: 2px auto;
  width: 80px;
  text-align: center;
`;

const BounceDiv = styled.div<LoaderProps>`
  width: 6px;
  height: 6px;
  background-color: #fff;
  margin: 0 1px;
  ${({ color, variant, disabled }) =>
    disabled
      ? variant &&
        variantOptions[variant] &&
        css`
          background-color: ${variant === 'contained'
            ? `${variantOptions[variant].disabledBg}`
            : `${variantOptions[variant].disabledColor}`};
        `
      : variant && (variant === 'text' || variant === 'outlined')
      ? color &&
        colorOptions[color] &&
        css`
          background-color: ${colorOptions[color].color};
        `
      : color &&
        colorOptions[color] &&
        css`
          background-color: ${colorOptions[color].backgroundColor};
        `}
  border-radius: 100%;
  display: inline-block;
  animation: ${bouncer} 1.4s infinite ease-in-out both;
`;

const Bounce1 = styled(BounceDiv)`
  animation-delay: -0.32s;
`;
const Bounce2 = styled(BounceDiv)`
  animation-delay: -0.16s;
`;
const Bounce3 = styled(BounceDiv)``;

export { Loader, Bounce1, Bounce2, Bounce3 };
