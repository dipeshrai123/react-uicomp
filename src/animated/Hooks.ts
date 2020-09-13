/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect, useMemo } from "react";
import { useSpring, config as springConfig, useTransition } from "react-spring";
import ResizeObserver from "resize-observer-polyfill";

// boolean to binary
const bin = (booleanValue: boolean) => {
  return booleanValue ? 1 : 0;
};

export const useOutsideClick = (
  elementRef: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void,
) => {
  const callbackMemo = useMemo(() => callback, [callback]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!elementRef?.current?.contains(e.target as Element) && callbackMemo) {
        callbackMemo(e);
      }
    };

    document.addEventListener("click", handleOutsideClick, true);

    return document.addEventListener("click", handleOutsideClick, true);
  }, [callbackMemo, elementRef]);
};

interface UseAnimatedValueConfig {
  onAnimationEnd?: (value: number) => void;
  listener?: (value: number) => void;
  animationType?: "ease" | "elastic";
  duration?: number;
  [prop: string]: any;
}

export const useAnimatedValue = (
  initialValue: number | boolean,
  config?: UseAnimatedValueConfig,
) => {
  const _initialValue: number =
    typeof initialValue === "boolean" ? bin(initialValue) : initialValue;
  const _prevValue = useRef(_initialValue);

  // Different internal config configs
  const { onAnimationEnd, animationType = "ease", listener, ...restConfig } =
    config !== undefined && config;
  const _config =
    animationType === "ease"
      ? springConfig.default
      : { mass: 1, friction: 18, tension: 250 };

  const [props, set] = useSpring(() => ({
    value: _initialValue,
    config: { ..._config, ...restConfig },
  }));

  const _update = (updatedValue: number) => {
    set({
      value: updatedValue,
      // Config for value update
      onRest: ({ value }: { value: any }) => {
        onAnimationEnd && onAnimationEnd(value);
      },
      onChange: function ({ value }: { value: number }) {
        listener && listener(value);
      },
    });
  };

  useEffect(() => {
    if (initialValue !== _prevValue.current) {
      _update(_initialValue);
      _prevValue.current = _initialValue;
    }
  }, [initialValue]);

  const _targetObject: { value: any } = { value: props.value };
  return new Proxy(_targetObject, {
    set: function (target: { value: any }, key, value) {
      if (key === "value") {
        target.value = value;
        _update(value);
        return true;
      }

      return false;
    },
    get: function (_target, key) {
      if (key === "value") {
        return props.value;
      }

      return false;
    },
  });
};

interface UseMountedValueConfig {
  animationType?: "ease" | "elastic";
  duration?: number;
  enterDuration?: number;
  exitDuration?: number;
}

export const useMountedValue = (
  initialState: boolean,
  phases: [number, number, number],
  config?: UseMountedValueConfig,
) => {
  const [from, enter, leave] = phases;

  const { animationType = "ease", enterDuration, exitDuration, ...restConfig } =
    config !== undefined && config;
  const _config =
    animationType === "ease"
      ? springConfig.default
      : { mass: 1, friction: 18, tension: 250 };

  const _enterConfig = enterDuration ? { duration: enterDuration } : null;
  const _exitConfig = exitDuration ? { duration: exitDuration } : null;

  const transition = useTransition(initialState, {
    from: { value: from },
    enter: { value: enter, config: _enterConfig },
    leave: { value: leave, config: _exitConfig },
    config: { ..._config, ...restConfig },
  });

  return transition;
};

export enum ScrollState {
  UP = -1,
  DOWN = 1,
  UNDETERMINED = 0,
}

// TODO : Handler for HTMLElement
type ScrollUseStateProp = { scrollX: number; scrollY: number };
export const useScroll = (): {
  handler: { ref: React.RefObject<any> };
  scrollX: number;
  scrollY: number;
  scrollDirection: number;
  isScrolling: boolean;
} => {
  const ref = useRef<any>(null);
  const [scroll, setScroll] = useState<ScrollUseStateProp>({
    scrollX: 0,
    scrollY: 0,
  });
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const _isScrolling = useRef<number>(-1);
  const _scrollDirection = useRef<number>(ScrollState.UNDETERMINED);
  const _prevScrollY = useRef<number>(0);

  const scrollListener: () => void = () => {
    const { pageYOffset, pageXOffset } = window;
    setScroll({ scrollX: pageXOffset, scrollY: pageYOffset });

    // Clear if scrolling
    if (_isScrolling.current !== -1) {
      setIsScrolling(true);
      clearTimeout(_isScrolling.current);
    }

    _isScrolling.current = setTimeout(() => {
      setIsScrolling(false);
      _scrollDirection.current = ScrollState.UNDETERMINED; // reset
    }, 250);

    const diff = pageYOffset - _prevScrollY.current;
    if (diff > 0) {
      _scrollDirection.current = ScrollState.DOWN;
    } else {
      _scrollDirection.current = ScrollState.UP;
    }
    _prevScrollY.current = pageYOffset;
  };

  const scrollElementListener: () => void = () => {
    const { scrollTop, scrollLeft } = ref.current;
    setScroll({ scrollX: scrollLeft, scrollY: scrollTop });

    // Clear if scrolling
    if (_isScrolling.current !== -1) {
      setIsScrolling(true);
      clearTimeout(_isScrolling.current);
    }

    _isScrolling.current = setTimeout(() => {
      setIsScrolling(false);
      _scrollDirection.current = ScrollState.UNDETERMINED; // reset
    }, 250);

    const diff = scrollTop - _prevScrollY.current;
    if (diff > 0) {
      _scrollDirection.current = ScrollState.DOWN;
    } else {
      _scrollDirection.current = ScrollState.UP;
    }
    _prevScrollY.current = scrollTop;
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("scroll", scrollElementListener);
    } else {
      window.addEventListener("scroll", scrollListener);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", scrollElementListener);
      } else {
        window.removeEventListener("scroll", scrollListener);
      }
    };
  }, []);

  return {
    handler: { ref },
    ...scroll,
    scrollDirection: _scrollDirection.current,
    isScrolling,
  };
};

type UseMeasureMeasurement = {
  left: number;
  top: number;
  width: number;
  height: number;
  viewportLeft: number;
  viewportTop: number;
};

export const useMeasure = (): {
  handler: { ref: React.RefObject<any> };
  left: number;
  top: number;
  width: number;
  height: number;
  viewportLeft: number;
  viewportTop: number;
} => {
  const ref = useRef<any>(null);
  const [measurement, setMeasurement] = useState<UseMeasureMeasurement>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    viewportLeft: 0,
    viewportTop: 0,
  });

  useEffect(() => {
    const _refElement = ref.current ? ref.current : document.documentElement;

    const _resizeObserver: () => void = function () {
      // Only gives relative to viewport
      const { left, top, width, height } = _refElement.getBoundingClientRect();
      const { pageXOffset, pageYOffset } = window;
      setMeasurement({
        left: left + pageXOffset,
        top: top + pageYOffset,
        width,
        height,
        viewportLeft: left,
        viewportTop: top,
      });
    };
    _resizeObserver(); // Init
    window.addEventListener("resize", _resizeObserver);

    return () => window.removeEventListener("resize", _resizeObserver);
  }, []);

  return { handler: { ref }, ...measurement };
};

type useWindowDimensionMeasurement = { width: number; height: number };
export const useWindowDimension = (): useWindowDimensionMeasurement => {
  const [measurement, setMeasurement] = useState<useWindowDimensionMeasurement>(
    { width: 0, height: 0 },
  );
  const [ro] = useState(
    () =>
      new ResizeObserver(([entry]) => {
        const { clientWidth, clientHeight } = entry.target;
        setMeasurement({
          width: clientWidth,
          height: clientHeight,
        });
      }),
  );

  useEffect(() => {
    ro.observe(document.documentElement);

    return () => ro.disconnect;
  }, []);

  return measurement; // { width, height }
};

export enum DirectionState {
  UP = -1,
  DOWN = 1,
  RIGHT = 2,
  LEFT = -2,
  UNDETERMINED = 0,
}

type UseMouseMoveState = { mouseX: number; mouseY: number };
export const useMouseMove = (): {
  mouseX: number;
  mouseY: number;
  isMoving: boolean;
} => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const _isMoving = useRef<number>(-1);
  const [pointerPosition, setPointerPosition] = useState<UseMouseMoveState>({
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    const moveHandler = function (event: MouseEvent) {
      if (_isMoving.current !== -1) {
        setIsMoving(true);
        clearTimeout(_isMoving.current);
      }

      _isMoving.current = setTimeout(() => {
        setIsMoving(false);
      }, 250);

      setPointerPosition({
        mouseX: event.clientX,
        mouseY: event.clientY,
      });
    };

    document.addEventListener("mousemove", moveHandler);

    return () => document.removeEventListener("mousemove", moveHandler);
  }, []);

  return { ...pointerPosition, isMoving };
};

// TODO: Erros availabe for useDrag() hook. Need to be fixed
// type UseDragState = { x: number; y: number };
// export const useDrag = (): {
//   handler: { ref: React.RefObject<any> };
//   mouseX: number;
//   mouseY: number;
//   isDragging: boolean;
//   hDirection: number;
//   vDirection: number;
// } => {
//   const ref = useRef<any>();
//   const [position, setPosition] = useState<UseDragState>({ x: 0, y: 0 });
//   const _isDragging = useRef<boolean>(false);
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const prevPosition = useRef<UseDragState>({ x: 0, y: 0 });
//   const newPosition = useRef<UseDragState>({ x: 0, y: 0 });
//   const _elementOffset = useRef<UseDragState>({ x: 0, y: 0 });
//   const _hDragDirection = useRef<number>(DirectionState.UNDETERMINED);
//   const _vDragDirection = useRef<number>(DirectionState.UNDETERMINED);

//   useEffect(() => {
//     const _element = ref.current;

//     const _mouseUpHandler: () => void = function () {
//       _isDragging.current = false;

//       // Reset Positions
//       prevPosition.current.x = 0;
//       prevPosition.current.y = 0;
//       newPosition.current.x = 0;
//       newPosition.current.y = 0;

//       // Reset Direction
//       _hDragDirection.current = DirectionState.UNDETERMINED;
//       _vDragDirection.current = DirectionState.UNDETERMINED;

//       setIsDragging(false);
//     };

//     const _mouseMoveHandler: (event: MouseEvent) => void = function (
//       event: MouseEvent,
//     ) {
//       if (_isDragging.current) {
//         newPosition.current.x =
//           newPosition.current.x + (event.clientX - prevPosition.current.x);
//         newPosition.current.y =
//           prevPosition.current.y + (event.clientY - prevPosition.current.y);

//         // For horizontal direction
//         if (event.clientX > prevPosition.current.x) {
//           _hDragDirection.current = DirectionState.RIGHT;
//         } else if (event.clientX < prevPosition.current.x) {
//           _hDragDirection.current = DirectionState.LEFT;
//         } else {
//           _hDragDirection.current = DirectionState.UNDETERMINED;
//         }

//         // For vertical direction
//         if (event.clientY > prevPosition.current.y) {
//           _vDragDirection.current = DirectionState.DOWN;
//         } else if (event.clientY < prevPosition.current.y) {
//           _vDragDirection.current = DirectionState.UP;
//         } else {
//           _vDragDirection.current = DirectionState.UNDETERMINED;
//         }

//         prevPosition.current.x = newPosition.current.x;
//         prevPosition.current.y = newPosition.current.y;

//         setPosition({
//           x: newPosition.current.x - _elementOffset.current.x,
//           y: newPosition.current.y - _elementOffset.current.y,
//         });
//       }
//     };

//     const _mouseDownHandlerElement: (event: MouseEvent) => void = function (
//       event: MouseEvent,
//     ) {
//       _isDragging.current = true;
//       const _newOffsetX = event.pageX - _element.offsetLeft;
//       const _newOffsetY = event.pageY - _element.offsetTop;
//       _elementOffset.current.x = _newOffsetX;
//       _elementOffset.current.y = _newOffsetY;
//       setIsDragging(true);
//     };

//     document.addEventListener("mouseup", _mouseUpHandler);
//     document.addEventListener("mousemove", _mouseMoveHandler);

//     if (_element) {
//       _element.addEventListener("mousedown", _mouseDownHandlerElement);
//     }

//     return () => {
//       document.removeEventListener("mouseup", _mouseUpHandler);
//       document.removeEventListener("mousemove", _mouseMoveHandler);
//     };
//   }, []);

//   return {
//     handler: { ref },
//     mouseX: position.x,
//     mouseY: position.y,
//     isDragging,
//     hDirection: _hDragDirection.current,
//     vDirection: _vDragDirection.current,
//   };
// };
