import { Sprinter1, Sprinter2, Sprinter3, Sprinter } from './threeDots.styled';
import { ThreeDotsProps } from './threeDots.type';

export const ThreeDotsLoader = (props: ThreeDotsProps) => {
    return (
        <Sprinter {...props}>
            <Sprinter1 {...props} />
            <Sprinter2 {...props} />
            <Sprinter3 {...props} />
        </Sprinter>
    );
};
