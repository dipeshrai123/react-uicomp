// AnimatedValue Interpolation
interface InterpolateValuesConfigParams {
  inputRange: Array<number>;
  outputRange: Array<any>;
  extrapolate?: "identity" | "clamp" | "extend";
  extrapolateRight?: "identity" | "clamp" | "extend";
  extrapolateLeft?: "identity" | "clamp" | "extend";
}

export const interpolateValues = (
  animatedValue: any,
  config: InterpolateValuesConfigParams,
) => {
  const { inputRange, outputRange, ...rest } = config;
  return animatedValue.interpolate({
    range: inputRange,
    output: outputRange,
    ...rest,
  });
};

interface InterpolateNumbersConfigParams {
  inputRange: Array<number>;
  outputRange: Array<any>;
  extrapolate?: "identity" | "extend" | "clamp";
}

// Generic 0 - 1 Interpolation
const mix = (perc: number, val1: number, val2: number) => {
  return val1 * (1 - perc) + val2 * perc;
};

const _internalInterpolate = (
  val: number,
  arr: number[],
  type: "identity" | "extend" | "clamp",
) => {
  const [val1, val2, val3, val4] = arr;
  const perc = (val1 - val) / (val1 - val2);
  const output = mix(perc, val3, val4);
  const isPositive = val4 >= val3 ? 1 : -1;

  switch (type) {
    case "clamp":
      if (isPositive * output < isPositive * val3) {
        return val3;
      } else if (isPositive * output > isPositive * val4) {
        return val4;
      } else {
        return output;
      }
    case "identity":
      return val;
    case "extend":
    default:
      return output;
  }
};

const _getNarrowedInputArray = function (
  x: number,
  input: number[],
  output: number[],
): number[] {
  const length = input.length;
  let narrowedInput: number[] = [];

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

export const interpolateNumbers = (
  value: number,
  config: InterpolateNumbersConfigParams,
): number => {
  const { inputRange, outputRange, extrapolate = "extend" } = config;
  const narrowedInput = _getNarrowedInputArray(value, inputRange, outputRange);
  return _internalInterpolate(value, narrowedInput, extrapolate);
};
