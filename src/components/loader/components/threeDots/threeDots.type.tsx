export interface ThreeDotsProps {
    color: string;
    size?: number;
    type: ThreeDotsType;
}

export type ThreeDotsType = 'rotate' | 'flow';
