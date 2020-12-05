/* eslint-disable no-unused-vars */
export type MeasurementType = {
  left: number;
  top: number;
  width: number;
  height: number;
  vLeft: number;
  vTop: number;
};

export type WindowDimensionType = { width: number; height: number };

export type ScrollEventType = {
  isScrolling: boolean;
  scrollX: number;
  scrollY: number;
  scrollDirection: number;
};
