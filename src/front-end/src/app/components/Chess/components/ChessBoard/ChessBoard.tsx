import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IChessBoardCell } from '../../../../../types/chess';
import ChessBoardCell from '../ChessBoardCell/ChessBoardCell';
import { ChessStore } from '../../ChessStore';
import { separatorOfArray } from '../../../../utils/helper';

interface IChessBoardProps extends React.ClassAttributes<Chessboard> {
    chessBoardStore?: ChessStore;
}

const styles: any = require('./chessBoard.scss');

@inject('chessBoardStore')
@observer
export default class Chessboard extends React.Component<IChessBoardProps, {}> {
    public componentDidMount(): void {
        this.props.chessBoardStore.loadChessPosition();
    }

    public render(): JSX.Element {

        return (
            <div className={ styles.boardBorder }>
                <div className={ styles.board }>
                    {
                        this._renderBoard()
                    }
                </div>
            </div>
        );
    }

    private _renderBoard(): JSX.Element[] {
        const { chessBoardData, startNewGame } = this.props.chessBoardStore;
        const arrayOfChessBoardData: string[] = chessBoardData ? Object.keys(chessBoardData) : [];
        if(!arrayOfChessBoardData.length) {
            return null;
        }

        return separatorOfArray(arrayOfChessBoardData).map((cellChunk: string[], index: number) => {

            return <div key={ index }>
                {
                    cellChunk.map((cellName: string, i: number) => {
                        const cell: IChessBoardCell = chessBoardData[cellName];
                        return <ChessBoardCell key={ i } cellName={ cellName } {...cell}  />;
                    })
                }
            </div>
        })
    }
}