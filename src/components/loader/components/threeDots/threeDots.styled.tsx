import styled, { css, keyframes } from 'styled-components';
import { getLightDarkColor } from '../../../../utils';
import { ThreeDotsProps } from './threeDots.type';
// import { colors } from '../../../constants';

// const { variantOptions, colorOptions } = colors;

const sprinter = keyframes`
    0%, 80%, 100%{
        transform: scale(0)
    }
    40%{
        transform: scale(1)
    }
`;

const colorFlow = (setColor: any) => {
    return keyframes`
    0%{
        background-color:${getLightDarkColor(0, setColor)};
    }
    
    50%{
        background-color:${getLightDarkColor(0.5, setColor)};
    }
    
    100%{
        background-color:${getLightDarkColor(1, setColor)};
    }
    `;
};

const Sprinter = styled.div<ThreeDotsProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${({ size }) => (size ? size + 'px' : '20px')};
    aspect-ratio: 1/0.4;
`;

const SprinterDiv = styled.div<ThreeDotsProps>`
    width: ${({ size }) => (size ? (size * 6) / 20 + 'px' : '6px')};
    aspect-ratio: 1;
    background-color: ${({ color }) => color};
    border-radius: 100%;
    display: inline-block;
    ${({ type }) =>
        type === 'rotate' &&
        css`
            animation: ${sprinter} 1.4s infinite linear both;
        `};
`;

const Sprinter1 = styled(SprinterDiv)`
    animation-delay: -0.32s;

    ${({ type, color }) =>
        type === 'flow' &&
        css`
            animation: ${colorFlow(color)} 1.2s infinite ease-in-out both;
            animation-delay: -1.2s;
        `};
`;
const Sprinter2 = styled(SprinterDiv)`
    animation-delay: -0.16s;

    ${({ type, color }) =>
        type === 'flow' &&
        css`
            animation: ${colorFlow(color)} 1.2s infinite ease-in-out both;
            animation-delay: -0.8s;
        `};
`;
const Sprinter3 = styled(SprinterDiv)`
    ${({ type, color }) =>
        type === 'flow' &&
        css`
            animation: ${colorFlow(color)} 1.2s infinite ease-in-out both;
            animation-delay: -0.4s;
        `};
`;

export { Sprinter, Sprinter1, Sprinter2, Sprinter3 };
