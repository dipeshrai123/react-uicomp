// Bolean to binary
export const bin = (booleanValue: boolean) => {
  return booleanValue ? 1 : 0;
};

// For clamping values
export const clamp = (
  value: number,
  lowerbound: number,
  upperbound: number,
) => {
  return Math.max(lowerbound, Math.min(value, upperbound));
};

// Linear Interpolation
export const mix = (perc: number, val1: number, val2: number) => {
  return val1 * (1 - perc) + val2 * perc;
};
