/* eslint-disable no-unused-vars */
import * as React from "react";
import {
  useOutsideClick,
  makeAnimatedComponent,
  useMountedValue,
  interpolate,
} from "react-ui-animate";
import styled from "styled-components";
import { AnimationType, getAnimationConfig } from "../modules";
import { useScrollDisable } from "../hooks";

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
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContentStyled = styled.div`
  min-width: 400px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 6px 46px rgba(0, 0, 0, 0.08);
  font-family: Arial;
`;

const Container = makeAnimatedComponent(ContainerStyled);
const ModalContent = makeAnimatedComponent(ModalContentStyled);

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onOutsideClick?: () => void;
  style?: Omit<React.CSSProperties, "transform">;
  isAnimated?: boolean;
  animationType?: AnimationType;
  disableScroll?: boolean;
}

export const Modal = ({
  children,
  visible,
  onOutsideClick,
  style,
  isAnimated = true,
  animationType = "expand",
  disableScroll = false,
}: ModalProps) => {
  const modalRef = React.useRef<HTMLElement>(null);
  const initialConfig = isAnimated
    ? getAnimationConfig(animationType)
    : {
        enterDuration: 0.001,
        exitDuration: 0.001,
      };
  const config = { exitDuration: isAnimated ? 100 : 0, ...initialConfig };

  const transitions = useMountedValue(visible, [0, 1, 0], config);

  // Handle outside click
  if (onOutsideClick) useOutsideClick(modalRef, onOutsideClick);

  useScrollDisable(disableScroll && visible);

  return (
    <div>
      {transitions(
        (animated, mounted) =>
          mounted && (
            <Container
              style={{
                opacity: animated.value,
              }}
            >
              <ModalContent
                ref={modalRef}
                style={{
                  ...style,
                  transform: interpolate(
                    animated.value,
                    [0, 1],
                    [
                      `scale(${0.9}) translateY(${-50}px)`,
                      `scale(${1}) translateY(${0}px)`,
                    ],
                  ),
                }}
              >
                {children}
              </ModalContent>
            </Container>
          ),
      )}
    </div>
  );
};
