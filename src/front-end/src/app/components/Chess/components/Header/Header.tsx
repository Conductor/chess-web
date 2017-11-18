import * as React from 'react';
import { inject, observer } from 'mobx-react';
import Button from '../../../Button/Button';
import PopUpStore from '../../../PopUp/PopUpStore';
import { POP_UP_MESSAGE } from './HeaderConstants';

const styles: any = require('./header.scss');

const Header: (props: { startNewGame?: () => void, gameOver: boolean } ) => JSX.Element = (props) => {
    const newGame: () => void = () => {
        const { gameOver, startNewGame } = props;
        if(!gameOver) {
            PopUpStore.open({
                content: <h2>{ POP_UP_MESSAGE }</h2>,
                showCancelButton: true,
                showFooter: true,
                successText: 'yes',
                cancelText: 'no',
                onCancelHandler: startNewGame
            });
        } else {
            props.startNewGame && props.startNewGame();
        }
    };

    return (
        <header className={ styles.header }>
            <h2>Start new game:</h2>
            <Button onClick={ newGame }>Start</Button>
        </header>
    );
};

export default inject('startNewGame')(observer(Header));