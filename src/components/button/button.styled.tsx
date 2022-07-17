import styled, { css } from 'styled-components';
import { colors, fonts } from '../../constants';

import { StyledButtonProps } from './button.type';

const { colorOptions, variantOptions } = colors;

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  margin: 5px;
  padding: 8px 16px;
  min-width: 115px;
  height: 36px;
  background-color: ${colors.default.backgroundColor};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border: 1px solid ${colors.light.lightBorderColor};
  outline: none;
  border-radius: 6px;
  font-family: ${fonts.family.arial};
  font-weight: bold;
  cursor: pointer;
  color: ${colors.light.defaultTextColor};
  transition: background-color 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 9;
  //swapping the main color to background color from colorOptions
  //for text and oultined variant
  ${({ color, variant }) =>
    variant && (variant === 'text' || variant === 'outlined')
      ? color &&
        colorOptions[color] &&
        css`
          background-color: ${colorOptions[color].backgroundColor};
          color: ${colorOptions[color].active};
          &:hover {
            background-color: ${colorOptions[color].hover};
          }
        `
      : color &&
        colorOptions[color] &&
        css`
          background-color: ${colorOptions[color].color};
          color: ${colorOptions[color].backgroundColor};
          &:hover {
            background-color: ${colorOptions[color].darkHover};
          }
        `}

  ${({ variant, color }) =>
    variant && variantOptions[variant] && variant === 'outlined'
      ? css`
          border: 1px solid ${colorOptions[color || 'primary'].color};
        `
      : css`
          border: none;
        `}

    ${({ variant }) =>
    variant &&
    variantOptions[variant] &&
    variant === 'text' &&
    css`
      box-shadow: 0 0 0 0;
    `}
`;

const DisabledStyledButton = styled(StyledButton)<StyledButtonProps>`
  background-color: ${variantOptions['contained'].disabledColor};
  border: 1px solid ${variantOptions['contained'].disabledColor};

  color: ${variantOptions['contained'].disabledBg};
  &:hover {
    background-color: ${variantOptions['contained'].disabledColor};
    border: 1px solid ${variantOptions['contained'].disabledColor};

    color: ${variantOptions['contained'].disabledBg};
  }

  ${({ variant }) =>
    variant &&
    variantOptions[variant] &&
    css`
      background-color: ${variant === 'contained'
        ? `${variantOptions[variant].disabledColor}`
        : `${variantOptions[variant].disabledBg}`};

      color: ${variant === 'contained'
        ? `${variantOptions[variant].disabledBg}`
        : `${variantOptions[variant].disabledColor}`};
      border: ${variant === 'outlined'
        ? `1px solid ${variantOptions[variant].disabledColor}`
        : `none`};
      &:hover {
        background-color: ${variant === 'contained'
          ? `${variantOptions[variant].disabledColor}`
          : `${variantOptions[variant].disabledBg}`};

        color: ${variant === 'contained'
          ? `${variantOptions[variant].disabledBg}`
          : `${variantOptions[variant].disabledColor}`};
        border: ${variant === 'outlined'
          ? `1px solid ${variantOptions[variant].disabledColor}`
          : `none`};
      }
    `}
`;

const IconStyledButton = styled.button<StyledButtonProps>`
  padding: 10px;
  margin: 10px;
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border: none;
  outline: none;
  border-radius: 50%;
  font-family: ${fonts.family.arial};
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  color: ${colors.light.defaultTextColor};
  transition: background-color 0.3s;
  position: relative;
  overflow: hidden;
  ${({ color, variant }) =>
    variant && (variant === 'text' || variant === 'outlined')
      ? color &&
        colorOptions[color] &&
        css`
          background-color: ${colorOptions[color].backgroundColor};
          color: ${colorOptions[color].color};
        `
      : color &&
        colorOptions[color] &&
        css`
          background-color: ${colorOptions[color].color};
          color: ${colorOptions[color].backgroundColor};
        `}

  ${({ variant, color }) =>
    variant && variantOptions[variant] && variant === 'outlined'
      ? css`
          border: 1px solid ${colorOptions[color || 'primary'].color};
        `
      : css`
          border: none;
        `}
`;

const DisabledIconStyledButton = styled(IconStyledButton)<StyledButtonProps>`
  padding: 0px;
  ${({ variant }) =>
    variant &&
    variantOptions[variant] &&
    css`
      background-color: ${variant === 'contained'
        ? `${variantOptions[variant].disabledColor}`
        : `${variantOptions[variant].disabledBg}`};
      color: ${variant === 'contained'
        ? `${variantOptions[variant].disabledBg}`
        : `${variantOptions[variant].disabledColor}`};
      border: ${variant === 'outlined'
        ? `1px solid ${variantOptions[variant].disabledBg}`
        : `none`};
    `}
`;

const ButtonText = styled.div`
  position: relative;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-smooth: 10em;
  // font-family: Inter;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const IconContainer = styled.div`
  position: relative;
  zindex: 10;
  display: flex;
  alignitems: center;
  justifycontent: center;
  fontsmooth: 10em;
  fontsize: 25px;
`;

const RippleContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointerevents: none;
  borderradius: 50%;
  overflow: hidden;
  z-index: 9;
`;

const RippleItem = styled.div<StyledButtonProps>`
  ${({ color, variant }) =>
    color &&
    colorOptions[color] &&
    css`
      background-color: ${variant === 'text' || variant === 'outlined'
        ? colorOptions[color].color
        : colorOptions[color].backgroundColor};
    `}
`;

export {
  StyledButton,
  DisabledStyledButton,
  IconStyledButton,
  ButtonText,
  DisabledIconStyledButton,
  IconContainer,
  RippleContainer,
  RippleItem,
};
