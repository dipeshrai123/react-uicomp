import React, { useState, useEffect, useRef } from "react";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";
import { colors, fonts } from "./Constants";

type MessageType = "success" | "error";

const ToastContainer = styled.div`
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 100;
  right: 40px;
  bottom: 10px;
`;

const MasterContainer = styled.div`
  overflow: hidden;
`;

const MessageContainer = styled.div`
  padding: 6px 0px;
  position: relative;
`;

interface MessageProps {
  type: MessageType;
  successColor?: string;
  errorColor?: string;
}

const Message = styled.div<MessageProps>`
  background: ${(props) =>
    props.type === "success"
      ? props.successColor || "#68A362"
      : props.errorColor || colors.light.highlightColor};
  padding: 6px 10px;
  padding-right: 20px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
  border: 1px solid ${colors.light.defaultBorderColor};
  color: #ffffff;
  font-family: ${fonts.family.arial};
  cursor: pointer;
  position: relative;
  width: 200px;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
`;

const MasterContainerAnimated = animated(MasterContainer);

type ToastObject = { message: string; type: MessageType };
type ItemObject = { key: number; message: string; type: MessageType };

interface ToastProps {
  child: (arg: (toastObj: ToastObject) => void) => void;
  timeout?: number;
  style?: React.CSSProperties;
  containerStyle?: Pick<React.CSSProperties, "right" | "bottom">;
  successColor?: string;
  errorColor?: string;
  closeIconColor?: string;
  closeIconVisible?: boolean;
  dismissOnClick?: boolean;
}

let id = 0;
export const Toast = ({
  child,
  timeout = 4000,
  style,
  containerStyle,
  successColor,
  errorColor,
  closeIconColor = "#ffffff",
  closeIconVisible = true,
  dismissOnClick = false,
}: ToastProps) => {
  const [items, setItems] = useState<Array<ItemObject>>([]);
  const [refMap] = useState(new WeakMap());

  const onRest = (item: ItemObject) => {
    setItems((prev) => prev.filter((each) => each.key !== item.key));
  };

  const transitions = useTransition(items, {
    keys: (item: ItemObject) => item.key,
    from: { opacity: 0, height: 0 },
    enter: (item) => async (next) => {
      await next({
        opacity: 1,
        height: refMap.get(item).offsetHeight,
        onRest: () => {
          setTimeout(() => onRest(item), timeout);
        },
      });
    },
    leave: () => async (next) => {
      await next({ opacity: 0, config: { duration: 250 } });
      await next({ height: 0 });
    },
  });

  useEffect(() => {
    child((toastObj: ToastObject) => {
      setItems((prev) => [
        ...prev,
        { key: id++, message: toastObj.message, type: toastObj.type },
      ]);
    });
  }, [child]);

  return (
    <ToastContainer style={containerStyle}>
      {transitions(
        (props, item) =>
          item && (
            <MasterContainerAnimated
              onClick={dismissOnClick ? () => onRest(item) : () => false}
              style={props}
            >
              <MessageContainer ref={(elem) => elem && refMap.set(item, elem)}>
                <Message
                  {...{ style, successColor, errorColor }}
                  type={item.type}
                >
                  {item.message}

                  {closeIconVisible && (
                    <IconContainer onClick={() => onRest(item)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={closeIconColor}
                        width="18px"
                        height="18px"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </IconContainer>
                  )}
                </Message>
              </MessageContainer>
            </MasterContainerAnimated>
          ),
      )}
    </ToastContainer>
  );
};

export const useToast = () => {
  const ref = useRef<any>();

  return {
    handler: {
      child: (fn: (toastObj: ToastObject) => void) => (ref.current = fn),
    },
    toast: (toastObj: ToastObject) => ref.current(toastObj),
  };
};
