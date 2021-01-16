import * as React from "react";
import { useAnimatedValue, interpolate, AnimatedBlock } from "react-ui-animate";

import styled from "styled-components";
// import { colors } from "../constants";

interface CollapseTitleProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: any;
  expand?: boolean;
}

const TitleContainer = styled.div`
  padding: 6px 0px;
  border-radius: 10px;
  margin: 0px;
  cursor: pointer;
  display: flex;
  flexdirection: row;
  justify-content: space-between;
`;

const CollapseTitle = (props: CollapseTitleProps) => {
  const { children, style, className, onClick, expand } = props;

  const openAnimation = useAnimatedValue(expand);
  const diagonal = 12;
  const len = diagonal / Math.sqrt(2);

  const smallDiagonal = (diagonal / 20) * Math.sqrt(2);
  return (
    <TitleContainer {...{ style, className, onClick, expand }}>
      {children}
      <div
        style={{
          position: "relative",
          cursor: "pointer",
          marginLeft: 10,
          width: len * 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <AnimatedBlock
          style={{
            position: "absolute",
            transform: interpolate(
              openAnimation.value,
              [0, 1],
              [
                `translate(-${smallDiagonal / 2}px,0px)`,
                `translate(-${len / 2}px,0px)`,
              ],
            ),
          }}
        >
          <div
            style={{
              backgroundColor: "black",
              width: diagonal / 10,
              height: diagonal,
              transformOrigin: "bottom center",
              transform: ` rotate(45deg) `,
            }}
          ></div>
        </AnimatedBlock>

        <AnimatedBlock
          style={{
            position: "absolute",
            transform: interpolate(
              openAnimation.value,
              [0, 1],
              [
                `translate(${smallDiagonal / 2}px,0px)`,
                `translate(${len / 2}px,0px)`,
              ],
            ),
          }}
        >
          <div
            style={{
              backgroundColor: "black",
              width: diagonal / 10,
              height: diagonal,
              transformOrigin: "bottom center",
              transform: `rotate(-45deg) `,
            }}
          ></div>
        </AnimatedBlock>
      </div>
    </TitleContainer>
  );
};

interface CollapseBodyProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const BodyContainer = styled.div`
  background-color: #ffffff;
  padding: 6px 10px;
  border-radius: 10px;
  margin: 0px;
`;

const CollapseBody = (props: CollapseBodyProps) => {
  const { children, style, className } = props;
  return <BodyContainer {...{ style, className }}>{children}</BodyContainer>;
};

export const CollapseComp = {
  Title: CollapseTitle,
  Body: CollapseBody,
};
