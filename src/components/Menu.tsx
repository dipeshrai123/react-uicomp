import * as React from "react";
import styled from "styled-components";
import { colors, fonts } from "../constants";

// Menu
interface MenuProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const StyledMenuContainer = styled.div`
  background-color: #ffffff;
  padding: 6px 0px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid ${colors.light.lightBorderColor};
  border-radius: 10px;
  margin: 0px;
`;

const MenuContainer = (props: MenuProps) => {
  const { children, style, className } = props;
  return (
    <StyledMenuContainer {...{ style, className }}>
      {children}
    </StyledMenuContainer>
  );
};

// Menu Item
interface MenuItemProps {
  children: React.ReactNode;
  danger?: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
  className?: string;
}

const StyledMenuItem = styled.button<Pick<MenuItemProps, "danger">>`
  padding: 10px 24px;
  display: block;
  background-color: white;
  border: none;
  outline: none;
  font-family: ${fonts.family.arial};
  cursor: pointer;
  color: ${(props) =>
    props.danger ? colors.light.highlightColor : colors.light.defaultTextColor};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.light.backgroundColor};
  }

  &:active {
    background-color: ${colors.light.backgroundColor};
  }

  &:focus {
    outline: 1px solid ${colors.light.defaultBorderColor};
  }

  &.danger {
    color: ${colors.light.highlightColor};
  }
`;

const MenuItem = (props: MenuItemProps) => {
  const { children, danger = false, onClick, style, className } = props;
  return (
    <StyledMenuItem {...{ danger, onClick, style, className }}>
      {children}
    </StyledMenuItem>
  );
};

// Menu Item Separator
const StyledMenuSeparator = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.light.backgroundColor};
  margin: 5px 0px;
`;

const MenuSeparator = () => {
  return <StyledMenuSeparator />;
};

export const Menu = {
  Container: MenuContainer,
  Item: MenuItem,
  Separator: MenuSeparator,
};
