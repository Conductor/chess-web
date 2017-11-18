import * as React from 'react';
import { render as ReactDomRender } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import './favicon.ico';
import Chess from './components/Chess/Chess';
import ChessStore from './components/Chess/ChessStore';
import { Provider } from 'mobx-react';

import './main.scss';

const root: HTMLElement = document.getElementById('root');

const MainComponent: JSX.Element = (
    <AppContainer>
        <Provider chessBoardStore={ ChessStore.chessBoardStore }
                  startNewGame={ ChessStore.startNewGame }
        >
            <Chess />
        </Provider>
    </AppContainer>
);

if(__DEBUG__) {
    if(module.hot) {
        module.hot.accept('./components/Chess/Chess', () => {
            ReactDomRender(MainComponent, root);
        });
    }
}

ReactDomRender(MainComponent, root);
