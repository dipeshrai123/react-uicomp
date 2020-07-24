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
  const _prevValue = useRef(_initialValue);

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

  useEffect(() => {
    if (initialValue !== _prevValue.current) {
      _update(_initialValue);
      _prevValue.current = _initialValue;
    }
  }, [initialValue]);

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

// TODO : Handler for HTMLElement, Scroll Direction
export const useScroll = (): {
  scrollX: number;
  scrollY: number;
} => {
  const [scroll, setScroll] = useState({ scrollX: 0, scrollY: 0 });

  const scrollListener = () => {
    const { pageYOffset, pageXOffset } = window;
    setScroll({
      scrollX: pageXOffset,
      scrollY: pageYOffset,
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return scroll;
};

// Todo: Implementation of ResizeObserver
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
  const [measurement, setMeasurement] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    viewportLeft: 0,
    viewportTop: 0,
  });

  useEffect(() => {
    const _refElement = ref.current ? ref.current : document.documentElement;

    const _resizeObserver = function () {
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

export const useWindowDimension = () => {
  const [measurement, setMeasurement] = useState({ width: 0, height: 0 });
  const [ro] = useState(
    () =>
      new ResizeObserver(([entry]) =>
        setMeasurement({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        }),
      ),
  );

  useEffect(() => {
    ro.observe(document.documentElement);

    return () => ro.disconnect;
  }, []);

  return measurement; // { width, height }
};
