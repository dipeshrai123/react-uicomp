import React from "react";
import styled from "styled-components";
import { colors, fonts } from "./Constants";

// Menu
interface DropdownMenuProps {
  children: React.ReactNode;
}

const MenuContainer = styled.ul`
  background-color: $white;
  padding: 6px 0px;
  list-style-type: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
  border: 1px solid ${colors.light.defaultBorderColor};
  border-radius: 4px;
  margin: 0px;
`;

export const DropdownMenu = (props: DropdownMenuProps) => {
  const { children } = props;
  return <MenuContainer>{children}</MenuContainer>;
};

// Menu Item
interface DropdownMenuItemProps {
  children: React.ReactNode;
  danger?: boolean;
}

const Item = styled.li<Pick<DropdownMenuItemProps, "danger">>`
  padding: 10px 20px;
  font-family: ${fonts.family.arial};
  cursor: pointer;
  color: ${(props) =>
    props.danger ? colors.light.highlightColor : colors.light.defaultTextColor};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.light.backgroundColor};
  }

  &.danger {
    color: ${colors.light.highlightColor};
  }
`;

export const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  const { children, danger = false } = props;
  return <Item {...{ danger }}>{children}</Item>;
};

// Menu Item Separator
const Separator = styled.div`
  width: 100%;
  border-bottom: 1px solid ${colors.light.backgroundColor};
  margin: 5px 0px;
`;

export const DropdownMenuSeparator = () => {
  return <Separator />;
};
