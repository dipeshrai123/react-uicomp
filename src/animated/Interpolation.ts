/* eslint-disable no-unused-vars */
import { processColor, rgbaToHex } from "./Colors";
import { SpringValue } from "react-spring";

export const mix = (perc: number, val1: number, val2: number) => {
  return val1 * (1 - perc) + val2 * perc;
};

type ExtrapolateType = "identity" | "extend" | "clamp";

const _internalInterpolate = (
  val: number,
  arr: any,
  extrapolateLeft: ExtrapolateType,
  extrapolateRight: ExtrapolateType,
) => {
  const [inputMin, inputMax, outputMin, outputMax] = arr;
  let result: number = val;

  // EXTRAPOLATE
  if (result < inputMin) {
    if (extrapolateLeft === "identity") {
      return result;
    } else if (extrapolateLeft === "clamp") {
      result = inputMin;
    } else if (extrapolateLeft === "extend") {
      // noop
    }
  }

  if (result > inputMax) {
    if (extrapolateRight === "identity") {
      return result;
    } else if (extrapolateRight === "clamp") {
      result = inputMax;
    } else if (extrapolateRight === "extend") {
      // noop
    }
  }

  if (outputMin === outputMax) {
    return outputMin;
  }

  if (inputMin === inputMax) {
    if (val <= inputMin) {
      return outputMin;
    }
    return outputMax;
  }

  // Input Range
  if (inputMin === -Infinity) {
    result = -result;
  } else if (inputMax === Infinity) {
    result = result - inputMin;
  } else {
    result = (result - inputMin) / (inputMax - inputMin);
  }

  // Output Range
  if (outputMin === -Infinity) {
    result = -result;
  } else if (outputMax === Infinity) {
    result = result + outputMin;
  } else {
    result = result * (outputMax - outputMin) + outputMin;
  }

  return result;
};

const _getNarrowedInputArray = function (
  x: number,
  input: number[],
  output: Array<number | string>,
): Array<number | string> {
  const length = input.length;
  let narrowedInput: Array<number | string> = [];

  // Boundaries
  if (x < input[0]) {
    narrowedInput = [input[0], input[1], output[0], output[1]];
  } else if (x > input[length - 1]) {
    narrowedInput = [
      input[length - 2],
      input[length - 1],
      output[length - 2],
      output[length - 1],
    ];
  }

  // Narrow the input and output ranges
  for (let i = 1; i < length; ++i) {
    if (x <= input[i]) {
      narrowedInput = [input[i - 1], input[i], output[i - 1], output[i]];
      break;
    }
  }

  return narrowedInput;
};

interface ExtrapolateConfig {
  extrapolate?: ExtrapolateType;
  extrapolateRight?: ExtrapolateType;
  extrapolateLeft?: ExtrapolateType;
}

export const interpolate = (
  value: SpringValue<number> | number,
  inputRange: Array<number>,
  outputRange: Array<number | string>,
  extrapolateConfig?: ExtrapolateConfig,
) => {
  if (value instanceof SpringValue) {
    // Animated Value
    return value.interpolate({
      range: inputRange,
      output: outputRange,
      ...extrapolateConfig,
    });
  } else {
    const {
      extrapolate,
      extrapolateLeft,
      extrapolateRight,
    } = extrapolateConfig;

    const narrowedInput = _getNarrowedInputArray(
      value,
      inputRange,
      outputRange,
    );

    let _extrapolateLeft: ExtrapolateType = "extend";
    if (extrapolateLeft !== undefined) {
      _extrapolateLeft = extrapolateLeft;
    } else if (extrapolate !== undefined) {
      _extrapolateLeft = extrapolate;
    }

    let _extrapolateRight: ExtrapolateType = "extend";
    if (extrapolateRight !== undefined) {
      _extrapolateRight = extrapolateRight;
    } else if (extrapolate !== undefined) {
      _extrapolateRight = extrapolate;
    }

    if (outputRange.length) {
      if (typeof outputRange[0] === "number") {
        return _internalInterpolate(
          value,
          narrowedInput,
          _extrapolateLeft,
          _extrapolateRight,
        );
      } else {
        // If outputRange is in string then is must be color otherwise.
        const [inputMin, inputMax, outputMin, outputMax] = narrowedInput;

        const outputMinProcessed = processColor(outputMin);
        const outputMaxProcessed = processColor(outputMax);

        const red = _internalInterpolate(
          value,
          [inputMin, inputMax, outputMinProcessed.r, outputMaxProcessed.r],
          "clamp",
          "clamp",
        );

        const green = _internalInterpolate(
          value,
          [inputMin, inputMax, outputMinProcessed.g, outputMaxProcessed.g],
          "clamp",
          "clamp",
        );

        const blue = _internalInterpolate(
          value,
          [inputMin, inputMax, outputMinProcessed.b, outputMaxProcessed.b],
          "clamp",
          "clamp",
        );

        const alpha = _internalInterpolate(
          value,
          [inputMin, inputMax, outputMinProcessed.a, outputMaxProcessed.a],
          "clamp",
          "clamp",
        );

        return rgbaToHex({ r: red, g: green, b: blue, a: alpha });
      }
    } else {
      console.error(new Error("Output Range Cannot be Empty"));
    }
  }
};
