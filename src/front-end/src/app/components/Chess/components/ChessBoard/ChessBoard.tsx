import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { IChessBoardCell } from '../../../../../types/chess';
import ChessBoardCell from '../ChessBoardCell/ChessBoardCell';
import { ChessStore } from '../../ChessStore';
import { separatorOfArray } from '../../../../utils/helper';
import RenderIf from '../../../RenderIf';
import { arrayOfChar } from '../../../../utils/chessBoardGenerator';

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
        const { currentPlayer, inCheck } = this.props.chessBoardStore;
        const numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
        return (
            <div className={ styles.boardBorder }>
                <RenderIf condition={ currentPlayer === 'Black' }>
                    <span className={ styles. black }>
                        Black's move
                        <RenderIf condition={ inCheck }>
                            <span className={ styles.check }>Check!</span>
                        </RenderIf>
                    </span>
                </RenderIf>
                <div className={ styles.numbers }>
                    {
                        numbers.map((item: string, i: number) => <span key={ i }>{ item }</span>)
                    }
                </div>

                <div className={ styles.board }>
                    {
                        this._renderBoard()
                    }
                </div>

                <div className={ styles.chars }>
                    {
                        arrayOfChar.map((item: string, i: number) => <span key={ i }>{ item }</span>)
                    }
                </div>
                <RenderIf condition={ currentPlayer === 'White' }>
                    <span className={ styles.white }>
                        White's move
                        <RenderIf condition={ inCheck }>
                            <span className={ styles.check }>Check!</span>
                        </RenderIf>
                    </span>

                </RenderIf>
            </div>
        );
    }

    private _renderBoard(): JSX.Element[] {
        const { chessBoardData } = this.props.chessBoardStore;
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
            </div>;
        });
    }
}