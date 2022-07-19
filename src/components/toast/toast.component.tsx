import { useState, useEffect, useRef } from 'react';
import {
  useMountedValue,
  makeAnimatedComponent,
  AnimationConfigUtils,
  useMeasure,
  useAnimatedValue,
} from 'react-ui-animate';
import {
  ItemObject,
  ToastObject,
  ToastItemProps,
  ToastItem,
} from './toast.type';
import './toast.css';
import {
  MasterContainer,
  MessageContainer,
  Message,
  CloseIconContainer,
  ToastIconContainer,
  ToastIndicator,
  MessageHeader,
  MessageContent,
} from './toast.styled';
import { MdClose, MdInfo } from 'react-icons/md';
import { RiCheckboxCircleFill, RiErrorWarningFill } from 'react-icons/ri';

export { ToastContainer } from './toast.styled';

const MasterContainerAnimated = makeAnimatedComponent(MasterContainer);
const MessageContainerAnimated = makeAnimatedComponent(MessageContainer);

const Box = ({
  message,
  type,
  style,
  timeout,
  closeToast,
  closeIcon = true,
  dark,
  header,
  noHeader,
}: ToastItem) => {
  const [open, setOpen] = useState(true);

  const [height, setHeight] = useState<any>(0);
  const heightAnimation = useAnimatedValue(open ? height : 0);

  const bind = useMeasure(({ height }: any) => {
    height <= 50 ? setHeight(90) : setHeight(height + 50);
  });

  const [messageHeader, setMessageHeader] = useState('');

  const mv = useMountedValue(open, {
    from: 0,
    enter: 1,
    exit: 0,
    config: {
      ...AnimationConfigUtils.POWER2,
    },
  });

  const [toastProperties, setToastProperties] = useState({
    iconColor: '#5cb85c',
  });

  useEffect(() => {
    switch (type) {
      case 'success':
        setMessageHeader('Success!');
        setToastProperties({
          iconColor: '#5cb85c',
        });
        break;
      case 'error':
        setMessageHeader(`Something's wrong!`);
        setToastProperties({
          iconColor: '#ff2400',
        });
        break;
      case 'info':
        setMessageHeader('Did you know?');
        setToastProperties({
          iconColor: '#008ecc',
        });
        break;
      case 'warning':
        setMessageHeader('Watch Out!');
        setToastProperties({
          iconColor: '#ffa500',
        });
        break;
      default:
        setMessageHeader('Toast!');
        setToastProperties({
          iconColor: '#5cb85c',
        });
    }

    setTimeout(() => {
      setOpen(false);
    }, timeout);
  }, [setOpen, type, timeout]);

  return (
    <div>
      {mv(
        (a, m) =>
          m && (
            <MasterContainerAnimated
              style={{
                height: heightAnimation.value,
                opacity: a.value,
              }}
            >
              <MessageContainerAnimated
                style={{
                  ...style,
                  height: height - 20,
                  border: dark ? `none` : ``,
                  backgroundColor: dark ? `black` : `white`,
                }}
                onClick={() => closeToast && setOpen(false)}
              >
                <ToastIndicator
                  style={{ background: toastProperties.iconColor }}
                />
                <ToastIconContainer>
                  {type === 'success' && (
                    <RiCheckboxCircleFill
                      size={20}
                      style={{ color: toastProperties.iconColor }}
                    />
                  )}
                  {type === 'error' && (
                    <RiErrorWarningFill
                      size={20}
                      style={{ color: toastProperties.iconColor }}
                    />
                  )}
                  {type === 'warning' && (
                    <RiErrorWarningFill
                      size={20}
                      style={{ color: toastProperties.iconColor }}
                    />
                  )}
                  {type === 'info' && (
                    <MdInfo
                      size={20}
                      style={{ color: toastProperties.iconColor }}
                    />
                  )}
                </ToastIconContainer>
                <Message
                  {...bind()}
                  style={{ color: dark ? `white` : `black`, width: 180 }}
                >
                  {!noHeader && (
                    <MessageHeader>
                      {header ? header : messageHeader}
                    </MessageHeader>
                  )}
                  {message && <MessageContent>{message}</MessageContent>}
                </Message>
                {closeIcon && (
                  <CloseIconContainer>
                    <MdClose />
                  </CloseIconContainer>
                )}
              </MessageContainerAnimated>
            </MasterContainerAnimated>
          )
      )}
    </div>
  );
};

export const Toast = ({
  child,
  timeout = 5000,
  style,
  dark,
  closeIcon,
  dismissOnClick = true,
  noHeader,
}: ToastItemProps) => {
  const toastId = useRef(0);
  const [items, setItems] = useState<Array<ItemObject>>([]);

  const onRest = (keyValue: number) => {
    setItems((prev) => prev.filter((each) => each.key !== keyValue));
  };

  useEffect(() => {
    child((toastObj: ToastObject) => {
      setItems((prev: any) => [
        ...prev,
        {
          key: toastId.current++,
          message: toastObj.message,
          type: toastObj.type,
          header: toastObj.header,
        },
      ]);
    });
  }, [child]);

  return (
    <div>
      {items.map((item, i) => (
        <Box
          key={i}
          keyValue={item.key}
          message={item.message}
          type={item.type}
          timeout={timeout}
          onRest={() => onRest(item.key)}
          closeIcon={closeIcon}
          closeToast={dismissOnClick}
          style={style}
          dark={dark}
          header={item.header}
          noHeader={noHeader}
        />
      ))}
    </div>
  );
};

export const useToast = () => {
  let someFn: any;

  return {
    handler: {
      child: (fn: (toastObj: ToastObject) => void) => (someFn = fn),
    },
    toast: {
      success: (message?: string, header?: string) =>
        someFn({ message, type: 'success', header }),
      error: (message?: string, header?: string) =>
        someFn({ message, type: 'error', header }),
      warning: (message?: string, header?: string) =>
        someFn({ message, type: 'warning', header }),
      info: (message?: string, header?: string) =>
        someFn({ message, type: 'info', header }),
    },
  };
};
