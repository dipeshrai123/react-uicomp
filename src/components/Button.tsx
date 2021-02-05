import * as React from "react";
import styled from "styled-components";
import { colors, fonts } from "../constants";

const StyledButton = styled.button`
  padding: 14px 24px;
  display: block;
  background-color: white;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);
  border: 2px solid ${colors.light.lightBorderColor};
  outline: none;
  border-radius: 10px;
  margin: 0px;
  font-family: ${fonts.family.arial};
  font-weight: bold;
  cursor: pointer;
  color: ${colors.light.defaultTextColor};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.light.backgroundColor};
  }

  &:active {
    background-color: ${colors.light.defaultBorderColor};
  }

  &:focus {
    border: 2px solid ${colors.light.defaultBorderColor};
  }
`;

interface ButtonProps {
  title: string;
}

export const Button = React.forwardRef(
  (props: ButtonProps, ref: React.RefObject<HTMLButtonElement>) => {
    const { title } = props;

    return <StyledButton ref={ref}>{title}</StyledButton>;
  },
);
