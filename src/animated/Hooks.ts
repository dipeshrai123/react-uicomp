/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { useSpring, config as springConfig, SpringConfig } from "react-spring";

interface UseAnimatedValueConfig extends SpringConfig {
  onAnimationEnd?: (value: number) => void;
}

export const useAnimatedValue = (
  initialValue: number,
  config?: UseAnimatedValueConfig,
) => {
  const { onAnimationEnd, ...restConfig } = config !== undefined && config;
  const [props, set] = useSpring(() => ({
    value: initialValue,
    config: { ...springConfig.default, ...restConfig },
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

// useScroll() Hook for body
// TODO : Handler for HTMLElement, Scroll Direction
export const useScroll = (): {
  x: number;
  y: number;
} => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const scrollListener = () => {
    const { pageYOffset, pageXOffset } = window;
    setScrollX(pageXOffset);
    setScrollY(pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  return { x: scrollX, y: scrollY };
};

// useMeasure() hook
export const useMeasure = (): [
  object,
  {
    left: number;
    top: number;
    width: number;
    height: number;
  },
] => {
  const ref = useRef();
  const [measurement, setMeasurement] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [ro] = useState(
    () =>
      new ResizeObserver(([entry]) =>
        setMeasurement({
          left: entry.contentRect.left,
          top: entry.contentRect.top,
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        }),
      ),
  );

  useEffect(() => {
    if (ref.current) {
      ro.observe(ref.current);
    } else {
      ro.observe(document.documentElement);
    }

    return ro.disconnect;
  }, []);

  return [{ ref }, measurement];
};
