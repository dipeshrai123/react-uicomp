import styled, { css, keyframes } from 'styled-components';
import { colors, variables } from '../../constants';

import { BoxProps } from './select.type';

const colorOptions = {
  default: {
    fillColor: `transparent`,
    color: `${colors.default.color}`,
    active: `${colors.default.active}`,
  },
  primary: {
    fillColor: 'transparent',
    color: `${colors.primary.color}`,
    active: `${colors.primary.active}`,
  },
  secondary: {
    fillColor: 'transparent',
    color: `${colors.secondary.color}`,
    active: `${colors.secondary.active}`,
  },
  info: {
    fillColor: 'transparent',
    color: `${colors.info.color}`,
    rippleColor: `${colors.info.rippleColor}`,
    active: `${colors.info.active}`,
  },
  success: {
    fillColor: 'transparent',
    color: `${colors.success.color}`,
    active: `${colors.success.active}`,
  },
  warning: {
    fillColor: 'transparent',
    color: `${colors.warning.color}`,
    active: `${colors.warning.active}`,
  },
  error: {
    fillColor: 'transparent',
    color: `${colors.error.color}`,
    active: `${colors.error.active}`,
  },
  defaultFill: {
    fillColor: `${colors.default.fillColor}`,
    color: `${colors.default.color}`,
    active: `${colors.default.active}`,
  },
  primaryFill: {
    fillColor: `${colors.primary.fillColor}`,
    color: `${colors.primary.color}`,
    active: `${colors.primary.active}`,
  },
  secondaryFill: {
    fillColor: `${colors.secondary.fillColor}`,
    color: `${colors.secondary.color}`,
    active: `${colors.secondary.active}`,
  },
  infoFill: {
    fillColor: `${colors.info.fillColor}`,
    color: `${colors.info.color}`,
    rippleColor: `${colors.info.rippleColor}`,
    active: `${colors.info.active}`,
  },
  successFill: {
    fillColor: `${colors.success.fillColor}`,
    color: `${colors.success.color}`,
    active: `${colors.success.active}`,
  },
  warningFill: {
    fillColor: `${colors.warning.fillColor}`,
    color: `${colors.warning.color}`,
    active: `${colors.warning.active}`,
  },
  errorFill: {
    fillColor: `${colors.error.fillColor}`,
    color: `${colors.error.color}`,
    active: `red`,
  },
};

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  border: 2px solid #e1e1e1;
  border-top: 2px solid #a1a1a1;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spinner} 1s ease-in-out infinite;
  margin: 0 5px;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  font-smooth: 10em;
  // overflow: hidden;
`;

const Box = styled.div<BoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 5px;
  position: relative;
  border-radius: 8px;
  ${({ color }) =>
    color &&
    colorOptions[color] &&
    css`
      border: 1px solid ${colorOptions[color].color};
    `}
  // padding: 0px 10px;
    font-smooth: 10em;
  font-family: ${variables.avertaSemiBold};
  color: ${variables.defaulttextcolor};
  transition: border 0.2s, background 0.2s;
  // overflow: hidden;
  input,
  select,
  textarea {
    resize: none;
    padding: 10px 8px;
    width: 100%;
    font-size: ${variables.extrathin};
    outline: none;
    border: none;
    ${({ color }) =>
      color &&
      colorOptions[color] &&
      css`
        background-color: ${colorOptions[color].fillColor};
      `}

    font-family: ${variables.avertaSemiBold};
  }

  &::placeholder {
    font-family: ${variables.avertaSemiBold};
    color: ${variables.grey100};
    font-size: ${variables.text};
  }

  &:hover {
    background-color: ${variables.grey400};
    ${({ color }) =>
      color &&
      colorOptions[color] &&
      css`
        border: 1px solid ${colorOptions[color].active};
      `}
  }

  &:focus {
    background-color: ${variables.white};
    outline-offset: 0px;
    outline: none;
    // border: 2px solid ${variables.primary200};
  }
`;

const Label = styled.div`
  padding: 5px;
  label {
    font-size: ${variables.thin};
    font-weight: 500;
    font-family: ${variables.avertaSemiBold};
    font-smooth: 10em;
  }
`;

const InputBox = styled.input`
  resize: none;
  padding: 10px 8px;
  width: 100%;
  font-size: ${variables.extrathin};
  outline: none;
  border: none;
  background-color: transparent;
  font-smooth: 10em;
  font-family: ${variables.avertaSemiBold};
`;

const BorderLessBox = styled(Box)`
  border: none;
  outline: none;
  background-color: #fafafa;

  &:focus {
    outline-offset: 0px;
    background-color: #fafafa;
    outline: none;
    border: none;
  }

  &:hover {
    border: none;
  }
`;

const InputLength = styled.span`
  position: absolute;
  margin-top: 20px;
  bottom: -5px;
  right: 10px;
  font-size: 9px;
  border-radius: 4px;
  background-color: white;
  padding: 0 2px;
  color: ${variables.grey100};
`;

const RequiredSign = styled.span`
  position: absolute;
  top: -10px;
  right: 15px;
  border-radius: 50%;
  background-color: white;
  padding: 0 3px;
`;

const Title = styled.div`
  font-size: ${variables.text};

  font-family: ${variables.avertaSemiBold};
  display: inline-block;
`;

const EndAdornment = styled.div`
  margin: 0 6px 0 0;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-smooth: 10em;
  font-family: ${variables.avertaSemiBold};
  font-size: ${variables.extrathin};
  color: ${variables.defaulttextcolor};

  &:hover {
    background-color: ${variables.grey300};
  }
  &:focus {
    background-color: ${variables.grey200};
    outline-offset: 0px;
    outline: none;
  }
`;

const LeftAdornment = styled(EndAdornment)`
  padding: 0;
  margin: 0 8px;
  width: 100%;
  cursor: default;
  &:hover {
    background: transparent;
  }
`;
const RightAdornment = styled(EndAdornment)`
  margin: 0 8px;
  width: 100%;
  cursor: default;
  padding: 0;
  &:hover {
    background: transparent;
  }
`;

export {
  InputContainer,
  Label,
  Box,
  InputLength,
  Title,
  LeftAdornment,
  RightAdornment,
  BorderLessBox,
  InputBox,
  EndAdornment,
  RequiredSign,
  Loader,
};
