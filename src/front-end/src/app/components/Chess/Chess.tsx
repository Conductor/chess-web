import * as React from 'react';
import Header from './components/Header/Header';
import ChessBoard from './components/ChessBoard/ChessBoard';
import PopUp from '../PopUp/PopUp';
import PopUpStore from '../PopUp/PopUpStore';
import RenderIf from '../RenderIf';
import { inject, observer } from 'mobx-react';
import { ChessStore } from './ChessStore';

const Chess: (props: { chessBoardStore?: ChessStore}) => JSX.Element = ({chessBoardStore}) => (
    <div>
        <Header gameOver={ chessBoardStore.gameOver }/>
        <ChessBoard />
        <RenderIf condition={PopUpStore.isOpen}>
            <PopUp />
        </RenderIf>
    </div>
);

export default inject('chessBoardStore')(observer(Chess));