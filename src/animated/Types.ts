/* eslint-disable no-unused-vars */
export type MeasurementType = {
  left: number | Array<number>;
  top: number | Array<number>;
  width: number | Array<number>;
  height: number | Array<number>;
  vLeft: number | Array<number>;
  vTop: number | Array<number>;
};

export type WindowDimensionType = { width: number; height: number };

export type ScrollEventType = {
  isScrolling: boolean;
  scrollX: number;
  scrollY: number;
  velocityX: number;
  velocityY: number;
  scrollDirection: number;
};
