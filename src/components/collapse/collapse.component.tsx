import { useEffect, useState } from 'react';
import {
  TransitionBlock,
  interpolate,
  makeAnimatedComponent,
  useMeasure,
  useAnimatedValue,
  AnimatedBlock,
} from 'react-ui-animate';

import { IoIosArrowForward } from 'react-icons/io';

import {
  CollapseContainer,
  CollapseContent,
  CollapseBody,
  CollapseHeader,
  CollapseIcon,
  CollapseHeaderContent,
  CollapseBodyContent,
} from './collapse.styled';
import {
  CollapseProps,
  CollapseItemProps,
  CustomCollapseItemProps,
} from './collapse.type';

const CollapseContentAnimated = makeAnimatedComponent(CollapseContent);
const CollapseHeaderAnimated = makeAnimatedComponent(CollapseHeader);
const CollapseBodyAnimated = makeAnimatedComponent(CollapseBody);
const CollapseIconAnimated = makeAnimatedComponent(CollapseIcon);

export const CollapseItem = ({
  content,
  header,
  children,
  globalHeight,
  trigger,
  itemHeight,
  iconVisible,
  triggerToggle = true,
}: CollapseItemProps) => {
  const [open, setOpen] = useState(false);

  const [height, setHeight] = useState<any>(0);
  const heightAnimation = useAnimatedValue(open ? height : 0);

  const bind = useMeasure(({ height }: any) => {
    setHeight(height);
    if (globalHeight) {
      setHeight(globalHeight);
    }
    if (itemHeight) {
      setHeight(itemHeight);
    }
  });

  useEffect(() => {
    setOpen(!!trigger);
  }, [trigger]);

  return (
    <>
      <TransitionBlock state={open}>
        {(animation) => (
          <CollapseContentAnimated>
            <CollapseHeaderAnimated
              onClick={() => {
                triggerToggle && setOpen((prev) => !prev);
              }}
            >
              {iconVisible && (
                <CollapseIconAnimated
                  style={{
                    rotateZ: interpolate(animation.value, [0, 1], [0, 90]),
                  }}
                >
                  <IoIosArrowForward />
                </CollapseIconAnimated>
              )}
              <CollapseHeaderContent className="w-full">
                {header ? header : 'Header'}
              </CollapseHeaderContent>
            </CollapseHeaderAnimated>
            <CollapseBodyAnimated
              style={{
                height: heightAnimation.value,
                opacity: interpolate(animation.value, [0, 1], [0, 1]),
                overflowY: !!itemHeight || !!globalHeight ? 'auto' : 'hidden',
              }}
            >
              <CollapseBodyContent {...bind()}>
                <>
                  {content}
                  {children}
                </>
              </CollapseBodyContent>
            </CollapseBodyAnimated>
          </CollapseContentAnimated>
        )}
      </TransitionBlock>
    </>
  );
};

export const Collapse = ({
  children,
  collapseList,
  multiple,
  header,
  content,
  globalHeight,
  style,
  trigger,
  triggerToggle = true,
  iconVisible = false,
}: CollapseProps) => {
  return (
    <>
      <CollapseContainer style={style}>
        {multiple ? (
          <>
            {collapseList?.map(({ header, content, itemHeight }, i) => {
              return (
                <CollapseItem
                  key={i}
                  header={header}
                  content={content}
                  globalHeight={globalHeight}
                  itemHeight={itemHeight}
                  iconVisible={iconVisible}
                  trigger={trigger}
                  triggerToggle={triggerToggle}
                />
              );
            })}
            {children}
          </>
        ) : (
          <CollapseItem
            header={header ? header : 'Header'}
            content={content}
            globalHeight={globalHeight}
            iconVisible={iconVisible}
            trigger={trigger}
            triggerToggle={triggerToggle}
          >
            {children}
          </CollapseItem>
        )}
      </CollapseContainer>
    </>
  );
};

export const CustomCollapseItem = ({
  content,
  header,
  children,
  globalHeight,
  trigger,
  itemHeight,
  iconVisible,
  triggerToggle = true,
}: CustomCollapseItemProps) => {
  const [open, setOpen] = useState(false);

  const [height, setHeight] = useState<any>(0);
  const heightAnimation = useAnimatedValue(open ? height : 0);

  const bind = useMeasure(({ height }: any) => {
    setHeight(height);
    if (globalHeight) {
      setHeight(globalHeight);
    }
    if (itemHeight) {
      setHeight(itemHeight);
    }
  });

  return (
    <>
      <TransitionBlock state={open}>
        {(animation) => (
          <AnimatedBlock>
            <AnimatedBlock
              onClick={() => {
                triggerToggle && setOpen((prev) => !prev);
              }}
            >
              {iconVisible && (
                <AnimatedBlock
                  style={{
                    rotateZ: interpolate(animation.value, [0, 1], [0, 90]),
                  }}
                >
                  <IoIosArrowForward />
                </AnimatedBlock>
              )}
              <AnimatedBlock>{header ? header : 'Header'}</AnimatedBlock>
            </AnimatedBlock>
            <AnimatedBlock
              style={{
                height: heightAnimation.value,
                opacity: interpolate(animation.value, [0, 1], [0, 1]),
                overflowY: !!itemHeight || !!globalHeight ? 'auto' : 'hidden',
              }}
            >
              <AnimatedBlock {...bind()}>
                {content}
                {children}
              </AnimatedBlock>
            </AnimatedBlock>
          </AnimatedBlock>
        )}
      </TransitionBlock>
    </>
  );
};
