import { useRef, useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { ScrollState } from "./Constants";
// eslint-disable-next-line no-unused-vars
import { MeasurementType, WindowDimensionType } from "./Types";

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

// Todo: Re-structure without re-rendering ( callbacks )
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
