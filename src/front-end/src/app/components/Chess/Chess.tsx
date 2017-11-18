import * as React from 'react';
import Header from './components/Header/Header';
import ChessBoard from './components/ChessBoard/ChessBoard';

const Chess: () => JSX.Element = () => (
    <div>
        <Header />
        <ChessBoard />
    </div>
);

export default Chess;