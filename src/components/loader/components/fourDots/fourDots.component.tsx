import { Rotater, Rotate1, Rotate2, Rotate3, Rotate4 } from './fourDots.styled';
import { FourDotsProps } from './fourDots.type';

export const FourDotsLoader = (props: FourDotsProps) => {
    return (
        <Rotater {...props}>
            <Rotate1 {...props} />
            <Rotate2 {...props} />
            <Rotate3 {...props} />
            <Rotate4 {...props} />
        </Rotater>
    );
};
