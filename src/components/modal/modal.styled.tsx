import styled from 'styled-components';
import { getLightDarkColor } from '../../utils';

const ContainerStyled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
`;

const ModalContentStyled = styled.div`
  background: #ffffff;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  box-shadow: 0px 6px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 8px 24px;
`;

const ModalHeaderStyled = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: end;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  height: 40px;
  margin-bottom: 12px;
`;

const HeaderIconStyled = styled.div`
  width: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  color: green;
  font-size: 20px;
`;

const ModalHeaderContentStyled = styled.div`
  width: 90%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const CloseIconStyled = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  padding: 5px;
  margin-left: auto;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 50%;
  &:hover {
    background: #e1e1e1;
  }
`;

const ModalBodyContainerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  width: 100%;
  margin: 12px 0 16px;
  font-size: 12px;
`;

const ModalBodyStyled = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

const ModalFooterStyled = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  margin: 12px 0 0;
`;

const ModalFooterContentStyled = styled.div`
  margin: 0;
  padding: 0;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterIconStyled = styled.div`
  padding: 2px;
  margin: 2px;
  box-shadow: 0px 6px 46px rgba(0, 0, 0, 0.08);
  font-size: 10px;
  height: 10px;
  width: 10px;
  border-radius: 7px;
`;

const ButtonSectionStyled = styled.div`
  width: 90%;
  padding: 2px 4px;
  margin: 2px 4px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  margin: 5px;
  padding: 8px 16px;
  min-width: 115px;
  height: 36px;
  background-color: ${({ color }) => color};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border: 1px solid ${({ color }) => color};
  outline: none;
  border-radius: 6px;
  font-family: Inter;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
  color: white;
  transition: all 0.3s;
  &:hover {
    background-color: ${({ color }) => getLightDarkColor(-0.22, color)};
    border: 1px solid ${({ color }) => getLightDarkColor(-0.22, color)};
  }
`;

export {
  ContainerStyled,
  ModalBodyStyled,
  ModalHeaderStyled,
  ModalHeaderContentStyled,
  HeaderIconStyled,
  CloseIconStyled,
  ModalContentStyled,
  ModalBodyContainerStyled,
  ModalFooterStyled,
  ModalFooterContentStyled,
  FooterIconStyled,
  ButtonSectionStyled,
  ButtonStyled,
};
