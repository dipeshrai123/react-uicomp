import styled from 'styled-components';
import { DropdownMenuItem } from './dropdown.type';

const MenuStyled = styled.div`
  padding: 8px 0;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  flex-wrap: nowrap;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  box-shadow: 0px 6px 16px 0 rgba(0, 0, 0, 0.2);
  max-width: 280px;
  min-width: 120px;
  background: #ffffff;
`;
const MenuItemStyled = styled.div<DropdownMenuItem>`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 8px 24px;
  height: 48px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease-in-out;
  &:hover {
    background-color: ${({ hoverColor }: any) => hoverColor};
  }
`;

const MenuBreakStyled = styled.div`
  width: 100%;
  margin: 8px 0;
  border-bottom: 1px solid #e1e1e1;
`;

const MenuIconStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-right: 20px;
`;

export { MenuStyled, MenuItemStyled, MenuBreakStyled, MenuIconStyled };
