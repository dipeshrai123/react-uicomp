/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect, useMemo } from "react";
import ResizeObserver from "resize-observer-polyfill";

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

export enum ScrollState {
  UP = -1,
  DOWN = 1,
  UNDETERMINED = 0,
}

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
