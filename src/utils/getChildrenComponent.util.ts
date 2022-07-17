import { Children, Key, ReactChildren, ReactElement, ReactNode } from 'react';

const isObject = <T extends object>(value: unknown): value is T => typeof value === 'object' && value !== null;

export const reactNodeIsOfType = <P extends object, T extends { (props: P): ReactElement | null | undefined }>(
    node: ReactNode,
    type: T
): node is { key: Key | null; type: T; props: Parameters<T>[0] } => isObject<ReactElement>(node) && node.type === type;

export const hasInnerComponent = (children: any, Component: any) => {
    let childrenElement;
    Children.forEach(children, (child) => {
        if (reactNodeIsOfType(child, Component)) {
            childrenElement = child;
        }
    });

    return childrenElement;
};

export const getNewChildren = (children: any, components: any[] | any) => {
    var newChildren = children;

    components.map((component: any, index: number) => {
        const getNewChildrenWithin = (children: any) => {
            newChildren = Children.toArray(children).filter((child) => {
                return !reactNodeIsOfType(child, component);
            });
        };
        return index < components.length && getNewChildrenWithin(newChildren);
    });

    return newChildren;
};

export const getNewChild = (children: ReactChildren | ReactNode, value: string) => {
    return Children.toArray(children).filter((child: any) => child.props.id === value);
};

export const getListOfAttribute = (
    children: ReactChildren | ReactNode,
    attribute: string,
    defaultAttribute?: string
) => {
    let listOfAttribute: any = [],
        defaultFlag: boolean = false;

    Children.forEach(children, (child: any, index: number) => {
        if (defaultAttribute) {
            if (child.props['id'] === defaultAttribute) {
                listOfAttribute.push({
                    header: child.props[attribute],
                    id: child.props['id'] ? child.props['id'] : `id${index + 1}`,
                    active: true,
                });
            } else {
                listOfAttribute.push({
                    header: child.props[attribute],
                    id: child.props['id'] ? child.props['id'] : `id${index + 1}`,
                    active: false,
                });
            }
        } else {
            listOfAttribute.push({
                header: child.props[attribute],
                id: child.props['id'] ? child.props['id'] : `id${index + 1}`,
                active: index === 0 && !defaultFlag,
            });
            defaultFlag = true;
        }
    });

    return listOfAttribute;
};
