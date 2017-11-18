import * as React from 'react';

interface IRenderIfProps {
    condition: boolean;
    children: JSX.Element;
}

const RenderIf: (props: IRenderIfProps) => JSX.Element = ({ condition, children }) => {
    return condition ? children : null;
};

export default RenderIf;

