/* eslint-disable no-unused-vars */
import { useRef, useEffect } from "react";
import { useSpring, config as springConfig, useTransition } from "react-spring";
import { bin } from "./Math";

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
