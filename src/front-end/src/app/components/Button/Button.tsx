import * as React from 'react';
import * as classNames from 'classnames';
import { observer } from 'mobx-react';

const styles: any = require('./button.scss');
const cx: any = classNames.bind(styles);

export interface IButtonProps {
    type?: string;
    text?: string;
    buttonClass?: string;
    onClick?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
    children?: any;
    disabled?: boolean;
}

const Button: (props: IButtonProps) => JSX.Element = (props) => {
    const { text, buttonClass, children, disabled } = props;
    const type: string = props.type || 'button';
    const buttonStyles: string = cx({[styles.button]: true, [buttonClass]: !!buttonClass});
    const onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void = (e) => {
        e.stopPropagation(); props.onClick && props.onClick(e);
    };

    return (
        <button
            type={ type }
            onClick={ onClick }
            disabled={ disabled }
            className={ buttonStyles }>
            { text }
            { children }
        </button>
    );
};

export default observer(Button);
