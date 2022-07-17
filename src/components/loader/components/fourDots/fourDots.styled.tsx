import styled, { css, keyframes } from 'styled-components';
import { getLightDarkColor } from '../../../../utils';
import { FourDotsProps } from './fourDots.type';
// import { colors } from '../../../constants';

// const { variantOptions, colorOptions } = colors;

const rotater = keyframes`
    0%{
        transform: rotate(0);
    }
    
    25%{
        transform: rotate(90deg)
    }
    
    50%{
        transform: rotate(180deg)
    }
   
    75%{
        transform: rotate(270deg)
    }
    
    100%{
        transform: rotate(360deg)
    }
`;

const colorFlow = (setColor: string) => keyframes`
    0%{
        background-color:${getLightDarkColor(0.2, setColor)};
    }
    
    33%{
        background-color:${getLightDarkColor(0.4, setColor)};
    }
    
    66%{
        background-color:${getLightDarkColor(0.6, setColor)};
    }
    
    100%{
        background-color:${getLightDarkColor(0.8, setColor)};
    }
`;

const Rotater = styled.div<FourDotsProps>`
    width: ${({ size }) => (size ? size + 'px' : '15px')};
    aspect-ratio: 1;
    position: relative;
    box-sizing: border-box;
    ${({ type }) =>
        type === 'rotate'
            ? css`
                  animation: ${rotater} 1.2s infinite linear both;
              `
            : css`
                  transform: rotate(45deg);
              `};
`;

const RotateDiv = styled.div<FourDotsProps>`
    position: absolute;
    width: ${({ size }) => (size ? size / 3 + 'px' : '15px')};
    aspect-ratio: 1;
    background-color: #fff;
    border-radius: 100%;
    display: inline-block;
`;

const Rotate1 = styled(RotateDiv)`
    background-color: ${({ color }) => getLightDarkColor(0.2, color)};
    ${({ type, color }) =>
        type === 'flow' &&
        css`
            animation: ${colorFlow(color)} 1.2s infinite ease-in-out;
            animation-delay: -1.2s;
        `};
`;
const Rotate2 = styled(RotateDiv)`
    background-color: ${({ color }) => getLightDarkColor(0.35, color)};
    ${({ type, color }) =>
        type === 'flow' &&
        css`
            animation: ${colorFlow(color)} 1.2s infinite ease-in-out;
            animation-delay: -0.9s;
        `};
    right: 0;
`;
const Rotate3 = styled(RotateDiv)`
    background-color: ${({ color }) => getLightDarkColor(0.5, color)};
    ${({ type, color }) =>
        type === 'flow' &&
        css`
            animation: ${colorFlow(color)} 1.2s infinite ease-in-out;
            animation-delay: -0.6s;
        `};
    bottom: 0;
    right: 0;
`;
const Rotate4 = styled(RotateDiv)`
    background-color: ${({ color }) => getLightDarkColor(0.65, color)};
    ${({ type, color }) =>
        type === 'flow' &&
        css`
            animation: ${colorFlow(color)} 1.2s infinite ease-in-out;
            animation-delay: -0.3s;
        `};
    bottom: 0;
`;

export { Rotater, Rotate1, Rotate2, Rotate3, Rotate4 };
