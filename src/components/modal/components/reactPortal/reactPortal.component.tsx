import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
// import { uid } from '../../../../utils';
import { ReactPortalPropsType } from './reactPortal.type';

const createWrapperAndAppendToBody = (wrapperId: string) => {
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);

    return wrapperElement;
};

export const ReactPortal = ({ children, wrapperId = 'react-portal-wrapper' }: ReactPortalPropsType) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

    useLayoutEffect(() => {
        let element: HTMLElement | null = document.getElementById(wrapperId);
        let systemCreated = false;

        if (!element) {
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        }

        setWrapperElement(element);

        return () => {
            // delete the programatically created element
            if (systemCreated && element?.parentNode) {
                element.remove();
                console.log('return: ', element.parentNode.removeChild(element));
            }
        };
    }, [wrapperId]);

    if (wrapperElement === null) return null;

    return createPortal(children, wrapperElement);
};
