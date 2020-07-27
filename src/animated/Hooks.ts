/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import { useSpring, config as springConfig } from "react-spring";
import ResizeObserver from "resize-observer-polyfill";

// boolean to binary
const bin = (booleanValue: boolean) => {
  return booleanValue ? 1 : 0;
};

interface UseAnimatedValueConfig {
  onAnimationEnd?: (value: number) => void;
  onAnimationListener?: (value: number) => void;
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

  // Different internal config configs
  const {
    onAnimationEnd,
    animationType = "ease",
    onAnimationListener,
    ...restConfig
  } = config !== undefined && config;
  const _config =
    animationType === "ease"
      ? springConfig.default
      : { mass: 1, friction: 18, tension: 250 };

  const [props, set] = useSpring(() => ({
    value: _initialValue,
    config: { ..._config, ...restConfig },
    onFrame: ({ value }: { value: number }) => {
      onAnimationListener && onAnimationListener(value);
    },
  }));

  const _update = (updatedValue: number) => {
    set({
      value: updatedValue,
      // Config for value update
      onRest: ({ value }: { value: number }) => {
        onAnimationEnd && onAnimationEnd(value);
      },
    });
  };

  const _targetObject: { value: number } = { value: props.value };
  return new Proxy(_targetObject, {
    set: function (target: { value: number }, key, value) {
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

export enum ScrollState {
  UP = -1,
  DOWN = 1,
  UNDETERMINED = 0,
}

// TODO : Handler for HTMLElement, isScrolling
type ScrollUseStateProp = { scrollX: number; scrollY: number };
export const useScroll = (): {
  scrollX: number;
  scrollY: number;
  scrollDirection: number;
  isScrolling: boolean;
} => {
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

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return {
    ...scroll,
    scrollDirection: _scrollDirection.current,
    isScrolling,
  };
};

// Todo: Implementation of ResizeObserver
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
