import { useRef, useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { ScrollState } from "./Constants";

export const useOutsideClick = (
  elementRef: React.RefObject<HTMLElement>,
  callback: (event: MouseEvent) => void,
) => {
  const callbackRef = useRef<(e: MouseEvent) => void>(null);

  if (callbackRef.current === null) {
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

// Todo: Re-structure without re-rendering ( callbacks )
type UseMeasureMeasurement = {
  left: number;
  top: number;
  width: number;
  height: number;
  viewportLeft: number;
  viewportTop: number;
};

// Todo: Re-structure without re-rendering ( callbacks )
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

// Todo: Re-structure without re-rendering ( callbacks )
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

  return measurement;
};
