import styled from 'styled-components';
import { fonts } from '../../constants';

const ToastContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 100;
  right: 10px;
  bottom: 10px;
  width: 275px;
`;

const MasterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 95px;
`;

const MessageContainer = styled.div`
  position: relative;
  background: white;
  padding: 9px;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.08);
  color: #ffffff;
  font-family: ${fonts.family.arial};
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  height: 70px;
`;

const ToastIndicator = styled.div`
  height: 100%;
  width: 3px;
  border-radius: 2px;
  background: red;
`;

const Message = styled.div`
  font-size: 14px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 4px;
  flex-direction: column;
`;

const MessageHeader = styled.div`
  font-size: 12px;
`;

const MessageContent = styled.div`
  font-size: 10px;
  font-weight: 300;
  color: #919191;
`;

const ToastIconContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  color: red;
  font-size: 24px;
  width: 44px;
  height: 24px;
`;
const CloseIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  font-size: 12px;
  margin-left: auto;
  border-radius: 50%;
  color: #a1a1a1;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #717171;
    background: #f1f1f1;
  }
`;

export {
  ToastContainer,
  MasterContainer,
  MessageContainer,
  ToastIndicator,
  MessageHeader,
  MessageContent,
  Message,
  ToastIconContainer,
  CloseIconContainer,
};
