import * as React from "react";
import { animate, Presence, useValue, withSpring } from "react-ui-animate";
import { clsx } from "../../shared/clsx";
import styles from "./StepperWizard.module.css";

export interface WizardStep {
  key: string;
  label: string;
  content: React.ReactNode;
}

export interface StepperWizardProps {
  steps: WizardStep[];
  activeIndex: number;
  className?: string;
  style?: React.CSSProperties;
}

const STEP_SPRING = { stiffness: 420, damping: 34 };

function StepIndicator({ steps, activeIndex }: { steps: WizardStep[]; activeIndex: number }) {
  const dotRefs = React.useRef(new Map<number, HTMLDivElement>());
  const [dotX, setDotX] = useValue(0);
  const [fillWidth, setFillWidth] = useValue(0);
  const hasMountedRef = React.useRef(false);

  React.useLayoutEffect(() => {
    const node = dotRefs.current.get(activeIndex);
    if (!node) return;

    const center = node.offsetLeft + node.offsetWidth / 2;

    if (!hasMountedRef.current) {
      setDotX(center);
      setFillWidth(center);
      hasMountedRef.current = true;
      return;
    }

    setDotX(withSpring(center, STEP_SPRING));
    setFillWidth(withSpring(center, STEP_SPRING));
  }, [activeIndex, setDotX, setFillWidth]);

  return (
    <div className={styles.track}>
      <div className={styles.rail} />
      <animate.div className={styles.fill} style={{ width: fillWidth }} />
      {steps.map((step, index) => (
        <div
          key={step.key}
          ref={(node) => {
            if (node) dotRefs.current.set(index, node);
            else dotRefs.current.delete(index);
          }}
          className={styles.step}
        >
          <div className={clsx(styles.dot, index <= activeIndex && styles.dotDone)}>
            {index + 1}
          </div>
          <div className={styles.stepLabel}>{step.label}</div>
        </div>
      ))}
      <animate.div className={styles.indicator} style={{ translateX: dotX }} aria-hidden="true" />
    </div>
  );
}

function StepContent({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: number;
}) {
  return (
    <animate.div
      className={styles.stepContent}
      style={{ opacity: 0, translateX: 24 * direction }}
      animate={{ opacity: withSpring(1, STEP_SPRING), translateX: withSpring(0, STEP_SPRING) }}
      exit={{
        opacity: withSpring(0, STEP_SPRING),
        translateX: withSpring(-24 * direction, STEP_SPRING),
      }}
    >
      {children}
    </animate.div>
  );
}

/**
 * A multi-step wizard whose progress indicator slides between steps and
 * whose content slides/fades in the direction of travel — forward or back —
 * instead of just swapping panels.
 */
export function StepperWizard({ steps, activeIndex, className, style }: StepperWizardProps) {
  const prevIndexRef = React.useRef(activeIndex);
  const direction = activeIndex >= prevIndexRef.current ? 1 : -1;
  prevIndexRef.current = activeIndex;

  const activeStep = steps[activeIndex];

  return (
    <div className={clsx(styles.wizard, className)} style={style}>
      <StepIndicator steps={steps} activeIndex={activeIndex} />
      <div className={styles.stage}>
        <Presence mode="popLayout">
          {activeStep && (
            <StepContent key={activeStep.key} direction={direction}>
              {activeStep.content}
            </StepContent>
          )}
        </Presence>
      </div>
    </div>
  );
}
