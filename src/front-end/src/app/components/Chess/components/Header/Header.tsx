import * as React from 'react';
import { inject, observer } from 'mobx-react';

const Header: (props: { startNewGame?: () => void} ) => JSX.Element = (props) => (
    <header>
        <h2>Start new game:</h2>
        <button onClick={ props.startNewGame }>Start</button>
    </header>
);

export default (observer(Header));