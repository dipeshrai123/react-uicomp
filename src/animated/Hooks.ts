/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { useSpring, config as springConfig, SpringConfig } from "react-spring";

// Memoized Inititializer
export const useValue = <T>(initialValue: T) => {
  const ref = useRef<T>();
  if (ref.current === undefined) {
    ref.current = initialValue;
  }
  return ref.current;
};

interface UseAnimatedValueConfig extends SpringConfig {
  onAnimationEnd?: () => void;
}

export const useAnimatedValue = (
  initialValue: number,
  config: UseAnimatedValueConfig,
) => {
  const _initialValue = useValue(initialValue);
  const { onAnimationEnd, ...restConfig } = config !== undefined && config;
  const [props, set] = useSpring(() => ({
    value: _initialValue,
    onRest: ({ value }: { value: number }) => {
      if (value !== initialValue) {
        onAnimationEnd && onAnimationEnd();
      }
    },
    config: { ...springConfig.default, ...restConfig },
  }));

  const _update = (updatedValue: number) => {
    set({ value: updatedValue });
  };

  const _targetObject = {};
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
