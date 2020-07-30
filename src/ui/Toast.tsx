import React, { useState, useEffect, useRef } from "react";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";
import { colors, fonts } from "./Constants";

const ToastContainer = styled.div`
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  right: 40px;
  bottom: 10px;
`;

const MasterContainer = styled.div`
  width: 200px;
  overflow: hidden;
`;

const MessageContainer = styled.div`
  padding: 6px 0px;
  position: relative;
`;

const Message = styled.div<{ type: "success" | "error" }>`
  background: ${(props) =>
    props.type === "success" ? "#68A362" : colors.light.highlightColor};
  padding: 6px 10px;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12);
  border: 1px solid ${colors.light.defaultBorderColor};
  color: #ffffff;
  font-family: ${fonts.family.arial};
  cursor: pointer;
`;

const MasterContainerAnimated = animated(MasterContainer);

type ToastObject = { message: string; type: "error" | "success" };
type ItemObject = { key: number; message: string; type: "error" | "success" };

interface ToastProps {
  child: (arg: (toastObj: ToastObject) => void) => void;
  timeout: number;
  style?: React.CSSProperties;
}

let id = 0;
export const Toast = ({ child, timeout = 4000, style }: ToastProps) => {
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
          setTimeout(() => onRest(item), timeout); // DELAY SOME TIME
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
    <ToastContainer>
      {transitions(
        (props, item) =>
          item && (
            <MasterContainerAnimated onClick={() => onRest(item)} style={props}>
              <MessageContainer ref={(elem) => elem && refMap.set(item, elem)}>
                <Message {...{ style }} type={item.type}>
                  {item.message}
                </Message>
              </MessageContainer>
            </MasterContainerAnimated>
          ),
      )}
    </ToastContainer>
  );
};

type ConfigProps = {
  timeout: number;
};

export const useToast = (config?: ConfigProps) => {
  const ref = useRef<any>();

  return {
    handler: {
      child: (fn: (toastObj: ToastObject) => void) => (ref.current = fn),
      ...config,
    },
    toast: (toastObj: ToastObject) => ref.current(toastObj),
  };
};
