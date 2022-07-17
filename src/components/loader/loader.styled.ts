import styled from 'styled-components';
import { getLightDarkColor } from '../../utils';
import { LoaderDescriptionProps } from './loader.type';

const LoaderContainer = styled.div`
  font-family: Inter;
  position: relative;
  overflow: hidden;
`;

const LoaderChildren = styled.div``;

const LoaderContent = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  // backdrop-filter: blur(1px);
  flex-direction: column;
`;

const LoaderDescription = styled.div<LoaderDescriptionProps>`
  font-size: ${({ size }) => (size * 3) / 5 + `px`};
  color: ${({ color }) => getLightDarkColor(0.2, color)};
  margin-top: 10px;
`;

export { LoaderContainer, LoaderChildren, LoaderContent, LoaderDescription };
