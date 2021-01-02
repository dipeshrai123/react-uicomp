import React from "react";
import styled from "styled-components";
import { colors, fonts } from "../constants";

// Menu
interface DropdownMenuProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const MenuContainer = styled.div`
  background-color: #ffffff;
  padding: 6px 0px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid ${colors.light.lightBorderColor};
  border-radius: 10px;
  margin: 0px;
`;

const DropdownMenuContainer = (props: DropdownMenuProps) => {
  const { children, style, className } = props;
  return <MenuContainer {...{ style, className }}>{children}</MenuContainer>;
};

// Menu Item
interface DropdownMenuItemProps {
  children: React.ReactNode;
  danger?: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
  className?: string;
}

const Item = styled.button<Pick<DropdownMenuItemProps, "danger">>`
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

const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  const { children, danger = false, onClick, style, className } = props;
  return <Item {...{ danger, onClick, style, className }}>{children}</Item>;
};

// Menu Item Separator
const Separator = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.light.backgroundColor};
  margin: 5px 0px;
`;

const DropdownMenuSeparator = () => {
  return <Separator />;
};

export const DropdownMenu = {
  Container: DropdownMenuContainer,
  Item: DropdownMenuItem,
  Separator: DropdownMenuSeparator,
};
