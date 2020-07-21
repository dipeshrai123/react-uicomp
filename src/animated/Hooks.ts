/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSpring, config as springConfig, SpringConfig } from "react-spring";

// Memoized Inititializer
// export const useValue = <T>(initialValue: T) => {
//   const ref = useRef<T>();
//   if (ref.current === undefined) {
//     ref.current = initialValue;
//   }
//   return ref.current;
// };

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
