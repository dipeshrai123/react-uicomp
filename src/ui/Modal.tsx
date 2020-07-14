import React, { useRef } from "react";
import { useOutsideClick } from "../core";
import styled from "styled-components";
import { animated, useTransition, interpolate } from "react-spring";

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
  dismissOnOutsideClick?: boolean;
  style?: Omit<React.CSSProperties, "transform">;
}

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
  border-radius: 4px;
  box-shadow: 0px 6px 46px rgba(0, 0, 0, 0.08);
  font-family: Arial;
`;

const Container = animated(ContainerStyled);
const ModalContent = animated(ModalContentStyled);

export const Modal = ({
  children,
  visible,
  onClose,
  dismissOnOutsideClick = true,
  style,
}: ModalProps) => {
  const modalRef = useRef<HTMLElement>(null);
  const transitions = useTransition(visible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      mass: 1,
      tension: 250,
      friction: 18,
    },
  });

  // Handle outside click
  if (dismissOnOutsideClick) {
    useOutsideClick(modalRef, onClose);
  }

  return (
    <div>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <Container key={key} style={props}>
              <ModalContent
                ref={modalRef}
                style={{
                  ...style,
                  transform: interpolate(
                    [
                      props.opacity.interpolate({
                        range: [0, 1],
                        output: [0.9, 1],
                      }),
                      props.opacity.interpolate({
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
