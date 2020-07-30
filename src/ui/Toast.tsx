import React, { useState, useEffect, useRef } from "react";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";

const ToastContainer = styled.div`
  position: fixed;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  bottom: 0;
`;

const MasterContainer = styled.div`
  width: 200px;
  overflow: hidden;
`;

const MessageContainer = styled.div`
  padding: 5px 0px;
  position: relative;
`;

const Message = styled.div`
  background: #39f;
  color: #fff;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
`;

const MasterContainerAnimated = animated(MasterContainer);

type ItemObject = { key: number; message: string };

let id = 0;
export const Toast = ({
  child,
}: {
  child: (arg: (msg: string) => void) => void;
}) => {
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
          setTimeout(() => onRest(item), 3000); // DELAY SOME TIME
        },
      });
    },
    leave: () => async (next) => {
      await next({ opacity: 0, config: { duration: 250 } });
      await next({ height: 0 });
    },
  });

  useEffect(() => {
    child((msg) => {
      setItems((prev) => [...prev, { key: id++, message: msg }]);
    });
  }, [child]);

  return (
    <ToastContainer>
      {transitions(
        (props, item) =>
          item && (
            <MasterContainerAnimated onClick={() => onRest(item)} style={props}>
              <MessageContainer ref={(elem) => elem && refMap.set(item, elem)}>
                <Message>{item.message}</Message>
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
      child: (fn: (msg: string) => void) => (ref.current = fn),
    },
    toast: (message: string) => ref.current(message),
  };
};
