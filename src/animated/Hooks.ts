/* eslint-disable no-unused-vars */
import { useRef, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { MeasurementType, WindowDimensionType, ScrollEventType } from "./Types";
import { clamp } from "./Math";

// Handles outside click of any element.
// callback is called when user clicks outside the reference element.
// Usage:
// useOutsideClick(elementRef, () => {...})
export const useOutsideClick = (
  elementRef: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void,
) => {
  const callbackRef = useRef<(e: MouseEvent) => void>(null);

  if (!callbackRef.current) {
    callbackRef.current = callback;
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        !elementRef?.current?.contains(e.target as Element) &&
        callbackRef.current
      ) {
        callbackRef.current(e);
      }
    };

    if (callbackRef.current) {
      document.addEventListener("click", handleOutsideClick, true);
    }

    return () => {
      if (callbackRef.current) {
        document.addEventListener("click", handleOutsideClick, true);
      }
    };
  }, [callbackRef.current, elementRef]);
};

// Measure any HTMLElement renderered in DOM.
// callback is called in first layout render & when element size is changed.
// Usage:
// useMeasure(({ left, top, width, height, vLeft, vTop }) => {...})
// left and top accounts horizontal and vertical scrolled amount
// vLeft and vTop gives relative to viewport
export const useMeasure = (callback: (event: MeasurementType) => void) => {
  const ref = useRef(null);
  const callbackRef = useRef<(event: MeasurementType) => void>(null);
  const measurementRef = useRef<MeasurementType>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    vLeft: 0,
    vTop: 0,
  });

  if (!callbackRef.current) {
    callbackRef.current = callback;
  }

  const handleCallback: () => void = () => {
    if (callbackRef.current) {
      callbackRef.current({
        ...measurementRef.current,
      });
    }
  };

  useEffect(() => {
    const _refElement = ref.current || document.documentElement;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { left, top, width, height } = entry.target.getBoundingClientRect();
      const { pageXOffset, pageYOffset } = window;

      measurementRef.current = {
        left: left + pageXOffset,
        top: top + pageYOffset,
        width,
        height,
        vLeft: left,
        vTop: top,
      };

      handleCallback();
    });

    if (_refElement) {
      resizeObserver.observe(_refElement);
    }

    return () => {
      if (_refElement) {
        resizeObserver.observe(_refElement);
      }
    };
  }, []);

  return () => ({ ref }); // ...bind()
};

// Gives width and height of viewport in callback
// Resizeobserver for watching window resize
// Usage:
// useWindowDimension(({width, height}) => {...})
export const useWindowDimension = (
  callback: (event: WindowDimensionType) => void,
) => {
  const windowDimensionsRef = useRef<WindowDimensionType>({
    width: 0,
    height: 0,
  });
  const callbackRef = useRef<(event: WindowDimensionType) => void>(null);

  if (!callbackRef.current) {
    callbackRef.current = callback;
  }

  const handleCallback: () => void = () => {
    if (callbackRef.current) {
      callbackRef.current({
        ...windowDimensionsRef.current,
      });
    }
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { clientWidth, clientHeight } = entry.target;

      windowDimensionsRef.current = {
        width: clientWidth,
        height: clientHeight,
      };

      handleCallback();
    });

    resizeObserver.observe(document.documentElement);

    return () => resizeObserver.unobserve(document.documentElement);
  }, []);
};

// Used to define the current scrolling direction with enums
// Usage:
// ScrollDirectionState.[UP, DOWN, LEFT, RIGHT, UNDETERMINED] === event.scrollDirection
export enum ScrollDirectionState {
  UP = -1,
  DOWN = 1,
  UNDETERMINED = 0,
  RIGHT = 2,
  LEFT = -2,
}

// Gives scrolling measurement through callback.
// Usage:
// bind = useScroll(({isScrolling, scrollX, scrollY, scrollDirection}) => {...})
// if bind() spread over any HTMLElement then element scrolling is measured else window's
export const useScroll = (callback: (event: ScrollEventType) => void) => {
  const ref = useRef(null);

  const scrollXY = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const previousScrollXY = useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const isScrolling = useRef<boolean>(false);
  const scrollDirection = useRef<number>(ScrollDirectionState.UNDETERMINED);
  const _isScrolling = useRef<number>(-1); // For checking scrolling and add throttle

  const lastTimeStamp = useRef<number>(0);
  const velocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const callbackRef = useRef<(event: ScrollEventType) => void>(null);

  if (!callbackRef.current) {
    callbackRef.current = callback;
  }

  const handleCallback: () => void = () => {
    if (callbackRef.current) {
      callbackRef.current({
        isScrolling: isScrolling.current,
        scrollX: scrollXY.current.x,
        scrollY: scrollXY.current.y,
        velocityX: velocity.current.x,
        velocityY: velocity.current.y,
        scrollDirection: scrollDirection.current,
      });
    }
  };

  useEffect(() => {
    const _refElement = ref.current;

    const scrollCallback = ({ x, y }: { x: number; y: number }) => {
      const now: number = Date.now();
      const deltaTime = Math.min(now - lastTimeStamp.current, 64);
      lastTimeStamp.current = now;
      const t = deltaTime / 1000; // seconds

      scrollXY.current = { x, y };

      // Clear if scrolling
      if (_isScrolling.current !== -1) {
        isScrolling.current = true;
        clearTimeout(_isScrolling.current);
      }

      _isScrolling.current = setTimeout(() => {
        isScrolling.current = false;
        scrollDirection.current = ScrollDirectionState.UNDETERMINED;

        // Reset Velocity
        velocity.current = { x: 0, y: 0 };

        handleCallback(); // Throttle 250milliseconds
      }, 250);

      const diffX = scrollXY.current.x - previousScrollXY.current.x;
      const diffY = scrollXY.current.y - previousScrollXY.current.y;

      if (diffX > 0) {
        scrollDirection.current = ScrollDirectionState.RIGHT;
      } else {
        scrollDirection.current = ScrollDirectionState.LEFT;
      }

      if (diffY > 0) {
        scrollDirection.current = ScrollDirectionState.DOWN;
      } else {
        scrollDirection.current = ScrollDirectionState.UP;
      }

      velocity.current = {
        x: clamp(diffX / t / 1000, -5, 5),
        y: clamp(diffY / t / 1000, -5, 5),
      };

      previousScrollXY.current = {
        x: scrollXY.current.x,
        y: scrollXY.current.y,
      };

      handleCallback();
    };

    const scrollListener: () => void = () => {
      const { pageYOffset: y, pageXOffset: x } = window;
      scrollCallback({ x, y });
    };

    const scrollElementListener: () => void = () => {
      const { scrollTop: y, scrollLeft: x } = ref.current;
      scrollCallback({ x, y });
    };

    if (_refElement) {
      ref.current.addEventListener("scroll", scrollElementListener);
    } else {
      window.addEventListener("scroll", scrollListener);
    }

    return () => {
      if (_refElement) {
        ref.current.removeEventListener("scroll", scrollElementListener);
      } else {
        window.removeEventListener("scroll", scrollListener);
      }
    };
  }, []);

  return () => ({ ref }); // ...bind()
};
