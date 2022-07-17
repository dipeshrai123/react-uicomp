import {
  useState,
  useContext,
  useRef,
  useCallback,
  useMemo,
  createContext,
} from 'react';
import {
  useOutsideClick,
  makeAnimatedComponent,
  useMountedValue,
  interpolate,
  AnimationConfigUtils,
  UseAnimatedValueConfig,
} from 'react-ui-animate';
import { useScrollDisable } from '../../hooks';

import {
  BodyPropsType,
  ConfirmationModalPropsType,
  ExtendedModalProps,
  FooterPropsType,
  HeaderPropsType,
  ModalProps,
  ModalSize,
} from './modal.type';
import {
  ContainerStyled,
  ModalHeaderStyled,
  CloseIconStyled,
  ModalContentStyled,
  ModalBodyContainerStyled,
  ModalFooterStyled,
  ButtonStyled,
  HeaderIconStyled,
} from './modal.styled';
import { ReactPortal } from './components';
import { CgClose } from 'react-icons/cg';
import { MdCheckCircle } from 'react-icons/md';
import { getNewChildren, hasInnerComponent } from '../../utils';

const Container = makeAnimatedComponent(ContainerStyled);
const ModalContent = makeAnimatedComponent(ModalContentStyled);
const ModalHeaderContainer = makeAnimatedComponent(ModalHeaderStyled);
const ModalBodyContainer = makeAnimatedComponent(ModalBodyContainerStyled);
const ModalFooterContainer = makeAnimatedComponent(ModalFooterStyled);
const CloseIcon = makeAnimatedComponent(CloseIconStyled);

export var ModalContext = createContext({ closeModal: () => {}, height: 0 });

const getAnimationConfig = (animationType: any) => {
  switch (animationType) {
    case 'elastic':
      return { ...AnimationConfigUtils.ELASTIC };
    case 'ease':
      return { ...AnimationConfigUtils.EASE_IN_OUT };
    case 'wooble':
      return { ...AnimationConfigUtils.WOOBLE };
    case 'bounce':
      return { ...AnimationConfigUtils.BOUNCE };

    default:
      return {};
  }
};

const getModalSize = (modalSize?: ModalSize, width?: number) => {
  switch (modalSize) {
    case 'full':
      return { width: width ? width : '100vw' };
    case 'xl':
      return { width: width ? width : '576px' };
    case 'lg':
      return { width: width ? width : '512px' };
    case 'md':
      return { width: width ? width : '448px' };
    case 'sm':
      return { width: width ? width : '384px' };
    case 'xs':
      return { width: width ? width : '320px' };
    default:
      return { width: width ? width : '448px' };
  }
};

const getOverlay = (
  overlay: boolean,
  overlayBlur: number,
  overlayDark: boolean
) => {
  const overlayStyle = overlay
    ? {
        backgroundColor: overlayDark
          ? `rgba(0, 0, 0, 0.4)`
          : `rgba(255,255,255, 0.4)`,
        backdropFilter: `blur(${overlayBlur}px)`,
      }
    : {
        backgroundColor: 'transparent',
        backdropFilter: `blur(0px)`,
      };

  return overlayStyle;
};

export const ModalContainer = ({
  children,
  visible,
  onOutsideClick = () => true,
  style,
  isAnimated = true,
  animationType = 'ease',
  disableScroll = true,
  modalContainerStyle,
  closeModal,
  modalSize = 'sm',
  width,
  height = 0,
  overlay = true,
  overlayBlur = 5,
  overlayDark = true,
}: ModalProps) => {
  const modalRef = useRef<HTMLElement>(null);

  const modalOverlayStyle = getOverlay(overlay, overlayBlur, overlayDark);

  const size = useMemo(() => {
    return getModalSize(modalSize, width);
  }, [modalSize, width]);

  const animationConfig = getAnimationConfig(animationType);

  const config: UseAnimatedValueConfig = isAnimated
    ? animationConfig
    : { immediate: true };

  const transitions = useMountedValue(!!visible, {
    from: 0,
    enter: 1,
    exit: 0,
    config: {
      ...config,
      duration: 250,
    },
  });

  useOutsideClick(modalRef, (e) => {
    e.stopPropagation();
    if (onOutsideClick && visible) {
      onOutsideClick(e);
      closeModal();
    }
  });

  useScrollDisable(disableScroll && !!visible);

  return (
    <ModalContext.Provider value={{ closeModal, height }}>
      {transitions(
        (animated, mounted) =>
          mounted && (
            <Container
              style={{
                opacity: animated.value,
                ...modalContainerStyle,
                ...modalOverlayStyle,
              }}
            >
              <ModalContent
                ref={modalRef}
                style={{
                  scale: interpolate(animated.value, [0, 1], [0.8, 1]),
                  height: 'auto',
                  ...size,
                  ...style,
                }}
              >
                {children}
              </ModalContent>
            </Container>
          )
      )}
    </ModalContext.Provider>
  );
};

export const ConfirmationModalContainer = ({
  onOk = {
    title: 'Ok',
    style: {},
    action: () => {},
    closeModalOnClick: false,
  },
  onCancel = {
    title: 'Cancel',
    style: {},
    action: () => {},
    closeModalOnClick: true,
  },
  children,
  visible,
  onOutsideClick = () => true,
  style,
  isAnimated = true,
  animationType = 'ease',
  disableScroll = false,
  modalContainerStyle,
  closeModal,
  modalSize = 'sm',
  headerTitle,
  width,
  height = 0,
  icon,
}: ModalProps) => {
  const modalRef = useRef<HTMLElement>(null);

  const {
    title: okTitle,
    style: okStyle,
    action: okAction,
    color: okColor,
    closeModalOnClick: closeModalOnClickOk,
  } = onOk;
  const {
    title: cancelTitle,
    style: cancelStyle,
    action: cancelAction,
    color: cancelColor,
    closeModalOnClick: closeModalOnClickCancel,
  } = onCancel;

  const header = hasInnerComponent(children, ModalHeader);
  const body = hasInnerComponent(children, ModalBody);
  const footer = hasInnerComponent(children, ModalFooter);

  const size = useMemo(() => {
    return getModalSize(modalSize, width);
  }, [modalSize, width]);

  const animationConfig = getAnimationConfig(animationType);

  const config: UseAnimatedValueConfig = isAnimated
    ? animationConfig
    : { immediate: true };

  const transitions = useMountedValue(!!visible, {
    from: 0,
    enter: 1,
    exit: 0,
    config: {
      ...config,
      duration: 250,
    },
  });

  // Handle outside click
  useOutsideClick(modalRef, (e) => {
    e.stopPropagation();
    if (onOutsideClick && visible) {
      onOutsideClick(e);
      closeModal();
    }
  });

  const okClicked = (e: any) => {
    e.preventDefault();
    if (okAction) {
      okAction(e);
    }
    closeModalOnClickOk && closeModal();
  };

  const cancelClicked = (e: any) => {
    e.preventDefault();
    if (cancelAction) cancelAction(e);
    closeModalOnClickCancel && closeModal();
  };

  useScrollDisable(disableScroll && !!visible);

  return (
    <ModalContext.Provider value={{ closeModal, height }}>
      {transitions(
        (animated, mounted) =>
          mounted && (
            <Container
              style={{
                opacity: animated.value,
                ...modalContainerStyle,
              }}
            >
              <ModalContent
                ref={modalRef}
                style={{
                  ...size,
                  ...style,
                  scale: interpolate(animated.value, [0, 1], [0.8, 1]),
                }}
              >
                {header ? (
                  header
                ) : (
                  <ModalHeader>
                    {typeof icon === 'boolean'
                      ? icon && (
                          <HeaderIconStyled>
                            <MdCheckCircle />
                          </HeaderIconStyled>
                        )
                      : icon}

                    {headerTitle ? headerTitle : `Confirmation Modal`}
                  </ModalHeader>
                )}
                {body ? (
                  body
                ) : (
                  <ModalBody>
                    {getNewChildren(children, [
                      ModalHeader,
                      ModalBody,
                      ModalFooter,
                    ])}
                  </ModalBody>
                )}
                {footer ? (
                  footer
                ) : (
                  <ModalFooterContainer>
                    {onCancel && (
                      <ButtonStyled
                        onClick={(e: any) => cancelClicked(e)}
                        color={cancelColor ? cancelColor : '#a1a1a1'}
                        style={cancelStyle}
                      >
                        {cancelTitle}
                      </ButtonStyled>
                    )}
                    {onOk && (
                      <ButtonStyled
                        onClick={(e: any) => okClicked(e)}
                        color={okColor ? okColor : '#008ecc'}
                        // color={okColor ? okColor : 'rgba(048,22,233,0.9)'}
                        // color="green"
                        style={okStyle}
                      >
                        {okTitle}
                      </ButtonStyled>
                    )}
                  </ModalFooterContainer>
                )}
              </ModalContent>
            </Container>
          )
      )}
    </ModalContext.Provider>
  );
};

export const Modal = (props: ExtendedModalProps) => {
  const {
    triggerElement,
    active,
    containerStyle,
    triggerToggle,
    children,
    withPortal = true,
    size = 'lg',
  } = props;
  const [isModalActive, setModalActive] = useState<boolean>(!!active);

  // Open Modal method
  const openModal: () => void = useCallback(() => {
    if (!isModalActive) {
      setModalActive(true);
    }
  }, [isModalActive]);

  // Open Modal method
  const closeModal: () => void = () => {
    setModalActive(false);
  };

  // Toggle Modal
  const toggleModal: () => void = useCallback(() => {
    if (isModalActive) {
      closeModal();
    } else {
      openModal();
    }
  }, [isModalActive, openModal]);

  const onClick = triggerToggle ? toggleModal : openModal;

  return (
    <div style={{ ...containerStyle, position: 'relative' }}>
      <span {...{ onClick }}>{triggerElement}</span>
      {withPortal ? (
        <ReactPortal>
          <ModalContainer
            {...props}
            visible={isModalActive}
            closeModal={closeModal}
            modalSize={size}
          >
            {children}
          </ModalContainer>
        </ReactPortal>
      ) : (
        <ModalContainer
          {...props}
          visible={isModalActive}
          closeModal={closeModal}
          modalSize={size}
        >
          {children}
        </ModalContainer>
      )}
    </div>
  );
};

export const ConfirmationModal = (props: ConfirmationModalPropsType) => {
  const {
    triggerElement,
    active,
    containerStyle,
    triggerToggle,
    children,
    onOk,
    onCancel,
    withPortal = true,
    size = 'xs',
  } = props;
  const [isModalActive, setModalActive] = useState<boolean>(!!active);

  // Open Modal method
  const openModal: () => void = useCallback(() => {
    if (!isModalActive) {
      setModalActive(true);
    }
  }, [isModalActive]);

  // Open Modal method
  const closeModal: () => void = () => {
    setModalActive(false);
  };

  // Toggle Modal
  const toggleModal: () => void = useCallback(() => {
    if (isModalActive) {
      closeModal();
    } else {
      openModal();
    }
  }, [isModalActive, openModal]);

  const onClick = triggerToggle ? toggleModal : openModal;

  return (
    <div style={{ ...containerStyle, position: 'relative' }}>
      <span {...{ onClick }}>{triggerElement}</span>
      {withPortal ? (
        <ReactPortal>
          <ConfirmationModalContainer
            visible={isModalActive}
            closeModal={closeModal}
            modalSize={size}
            {...props}
            onOk={onOk}
            onCancel={onCancel}
          >
            {children}
          </ConfirmationModalContainer>
        </ReactPortal>
      ) : (
        <ModalContainer
          visible={isModalActive}
          closeModal={closeModal}
          modalSize={size}
          {...props}
          onOk={onOk}
          onCancel={onCancel}
        >
          {children}
        </ModalContainer>
      )}
    </div>
  );
};

export const ModalHeader = ({
  children,
  style,
  className,
  closeIcon = true,
}: HeaderPropsType) => {
  var { closeModal } = useContext(ModalContext);
  return (
    <ModalHeaderContainer style={style} className={className}>
      {children}
      {closeIcon && (
        <CloseIcon onClick={() => closeModal()}>
          <CgClose />
        </CloseIcon>
      )}
    </ModalHeaderContainer>
  );
};

export const ModalBody = ({
  children,
  style,
  className,
  align = 'left',
}: BodyPropsType) => {
  var { height } = useContext(ModalContext);

  const alignStyle = useMemo(() => {
    switch (align) {
      case 'center':
        return {
          alignItems: 'center',
        };

      case 'left':
        return {
          alignItems: 'start',
        };

      case 'right':
        return {
          alignItems: 'end',
        };

      default:
        return {
          alignItems: 'start',
        };
    }
  }, [align]);

  return (
    <ModalBodyContainer
      style={{
        height: height === 0 ? 'auto' : height,
        ...style,
        ...alignStyle,
      }}
      className={className}
    >
      {children}
    </ModalBodyContainer>
  );
};

export const ModalFooter = ({
  children,
  style,
  className,
  align = 'right',
}: FooterPropsType) => {
  const alignStyle = useMemo(() => {
    switch (align) {
      case 'center':
        return {
          justifyContent: 'center',
        };

      case 'left':
        return {
          justifyContent: 'start',
        };

      case 'right':
        return {
          justifyContent: 'end',
        };

      default:
        return {
          justifyContent: 'end',
        };
    }
  }, [align]);
  return (
    <ModalFooterContainer
      style={{ ...style, ...alignStyle }}
      className={className}
    >
      {children}
    </ModalFooterContainer>
  );
};
