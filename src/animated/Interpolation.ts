// AnimatedValue Interpolation
interface ConfigParams {
  inputRange: Array<any>;
  outputRange: Array<any>;
  extrapolate?: "identity" | "clamp" | "extend";
  extrapolateRight?: "identity" | "clamp" | "extend";
  extrapolateLeft?: "identity" | "clamp" | "extend";
}

export const interpolateValues = (animatedValue: any, config: ConfigParams) => {
  const { inputRange, outputRange, ...rest } = config;
  return animatedValue.interpolate({
    range: inputRange,
    output: outputRange,
    ...rest,
  });
};
