/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { animated, useTransition, to } from "react-spring";
import styled from "styled-components";
import { AnimationType, getAnimationConfig, useOutsideClick } from "../modules";

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

const Container = animated(ContainerStyled);
const ModalContent = animated(ModalContentStyled);

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onOutsideClick?: () => void;
  style?: Omit<React.CSSProperties, "transform">;
  isAnimated?: boolean;
  animationType?: AnimationType;
}

export const Modal = ({
  children,
  visible,
  onOutsideClick,
  style,
  isAnimated = true,
  animationType = "expand",
}: ModalProps) => {
  const modalRef = useRef<HTMLElement>(null);
  const transitions = useTransition(visible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, config: { duration: isAnimated ? 100 : 0 } },
    config: isAnimated ? getAnimationConfig(animationType) : { duration: 0 },
  });

  // Handle outside click
  if (onOutsideClick) useOutsideClick(modalRef, onOutsideClick);

  return (
    <div>
      {transitions(
        (props, item) =>
          item && (
            <Container style={props}>
              <ModalContent
                ref={modalRef}
                style={{
                  ...style,
                  transform: to(
                    [
                      props.opacity.to({
                        range: [0, 1],
                        output: [0.9, 1],
                      }),
                      props.opacity.to({
                        range: [0, 1],
                        output: [-50, 0],
                      }),
                    ],
                    (scale, translateY) =>
                      `scale(${scale}) translateY(${translateY}px)`,
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
