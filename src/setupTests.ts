import '@testing-library/jest-dom';

// jsdom has no PointerEvent constructor at all, so without this,
// @testing-library/dom's fireEvent.pointerDown/Move/Up (and Gesture.Pan,
// which reads `pointerId`/`button` off the event) fall back to dispatching
// a bare `Event` with none of the init properties applied — every gesture
// interaction in a test silently becomes a no-op with no error, since
// listener exceptions/no-ops don't fail the synchronous fireEvent call.
if (typeof window.PointerEvent === 'undefined') {
  class PointerEventPolyfill extends MouseEvent {
    public pointerId: number;
    public pointerType: string;
    public isPrimary: boolean;

    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 0;
      this.pointerType = params.pointerType ?? 'mouse';
      this.isPrimary = params.isPrimary ?? true;
    }
  }
  // @ts-expect-error jsdom's lib.dom types don't know about this shim
  window.PointerEvent = PointerEventPolyfill;
  // @ts-expect-error same as above
  global.PointerEvent = PointerEventPolyfill;
}

// jsdom doesn't implement the Pointer Capture API. react-ui-animate's Pan
// gesture recognizer calls `setPointerCapture`/`releasePointerCapture` on
// every pointer move, so without this stub it throws inside the event
// listener on every simulated drag — silently, since fireEvent doesn't
// surface listener exceptions as a test failure — leaving assertions that
// only check "didn't throw" green while nothing about the drag actually ran.
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = () => {};
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {};
}
if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
}

// Mock IntersectionObserver globally
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver globally — jsdom doesn't implement it, and SplitPane
// uses it to re-clamp pane widths when its container resizes.
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;
