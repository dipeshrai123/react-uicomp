import { useCallback, useEffect, useState } from 'react';
import {
  TransitionBlock,
  interpolate,
  makeAnimatedComponent,
  useAnimatedValue,
  useMeasure,
} from 'react-ui-animate';

import { IoIosArrowForward } from 'react-icons/io';

import {
  AccordionContainer,
  AccordionContent,
  AccordionBody,
  AccordionHeader,
  AccordionIcon,
  AccordionHeaderContent,
  AccordionBodyContent,
} from './accordion.styled';
import { AccordionProps, AccordionItemProps } from './accordion.type';

const AccordionContentAnimated = makeAnimatedComponent(AccordionContent);
const AccordionHeaderAnimated = makeAnimatedComponent(AccordionHeader);
const AccordionBodyAnimated = makeAnimatedComponent(AccordionBody);
const AccordionIconAnimated = makeAnimatedComponent(AccordionIcon);

export const AccordionItem = ({
  content,
  header,
  children,
  globalHeight,
  itemHeight,
  iconVisible,
  handleClick,
  clicked,
}: AccordionItemProps) => {
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
    clicked ? setOpen(true) : setOpen(false);
  }, [clicked]);

  const handleItemClick = useCallback(() => {
    handleClick(header);
  }, [handleClick, header]);

  return (
    <>
      <TransitionBlock state={open}>
        {(animation) => (
          <AccordionContentAnimated>
            <AccordionHeaderAnimated
              onClick={() => {
                handleItemClick();
              }}
            >
              {iconVisible && (
                <AccordionIconAnimated
                  style={{
                    rotateZ: interpolate(animation.value, [0, 1], [0, 90]),
                  }}
                >
                  <IoIosArrowForward />
                </AccordionIconAnimated>
              )}
              <AccordionHeaderContent>
                {header ? header : `Header`}
              </AccordionHeaderContent>
            </AccordionHeaderAnimated>
            <AccordionBodyAnimated
              style={{
                height: heightAnimation.value,
                opacity: interpolate(animation.value, [0, 1], [0, 1]),
                overflowY: !!itemHeight || !!globalHeight ? 'auto' : 'hidden',
              }}
            >
              <AccordionBodyContent {...bind()}>
                <>
                  {content}
                  {children}
                </>
              </AccordionBodyContent>
            </AccordionBodyAnimated>
          </AccordionContentAnimated>
        )}
      </TransitionBlock>
    </>
  );
};

export const Accordion = ({
  children,
  accordionList,
  globalHeight,
  iconVisible = true,
  style,
}: AccordionProps) => {
  const accordionArrayMapping = accordionList.map((listItem) => {
    return { ...listItem, clicked: listItem.clicked };
  });
  const [accordionArray, setAccordionArray] = useState(accordionArrayMapping);

  const handleClick = useCallback(
    (headerReceived: string) => {
      const arrayBuffer = accordionArray.map((obj) => {
        if (obj.header === headerReceived) {
          return { ...obj, clicked: !obj.clicked };
        }
        return { ...obj, clicked: false };
      });

      setAccordionArray(arrayBuffer);
    },
    [accordionArray]
  );

  return (
    <>
      <AccordionContainer style={style}>
        {accordionArray?.map(({ header, content, itemHeight, clicked }, i) => {
          return (
            <AccordionItem
              key={i}
              header={header}
              content={content}
              globalHeight={globalHeight}
              itemHeight={itemHeight}
              iconVisible={iconVisible}
              handleClick={handleClick}
              clicked={clicked}
            />
          );
        })}
        {children}
      </AccordionContainer>
    </>
  );
};
