import { action, autorun, computed, observable, toJS } from 'mobx';
import CrudModel from '../../utils/CrudModel';
import { IChessBoard, IColorOfFigure, IMovePosition } from '../../../types/chess';
import chessBoardGenerator from '../../utils/chessBoardGenerator';
import PopUpStore from '../PopUp/PopUpStore';

interface IChestPositionResponse {
    currentPlayer: IColorOfFigure;
    inCheck: boolean;
    gameOver: boolean;
    positionToPieces: IChessBoard;
}

export class ChessStore {
    @observable
    public chessBoard: IChessBoard;

    @observable
    public gameOver: boolean;

    @observable
    public inCheck: boolean;

    @observable
    public currentFigure: string = null;

    @observable
    public currentPlayer: IColorOfFigure = null;

    @observable
    public arrayOfFiguresAvailableToMove: IMovePosition[] = null;

    @observable
    public arrayOfHighlightedCells: string[] = null;

    public constructor() {
        autorun(() => {
            if(this.chessBoard) {
                this._getAvailableMoves();
            }
        });

        autorun(() => {
            if(this.currentFigure) {
                this._getHighlightedCells();
            } else {
                this.arrayOfHighlightedCells = null;
            }
        });

        autorun(() => {
            if(this.gameOver) {
                PopUpStore.open({
                    content: `Our congratulations! Player ${this.currentPlayer} is win! Do you want to start new game?`,
                    showCancelButton: true,
                    showFooter: true,
                    successText: 'yes',
                    cancelText: 'no',
                    onSuccessHandler: this.startNewGame
                });
            }
        });
    }

    @computed
    public get chessBoardData(): IChessBoard {
        const chessBoard: IChessBoard = this.chessBoard;
        if(!chessBoard) {
            return null;
        }

        if(!this.arrayOfFiguresAvailableToMove) {
            return chessBoard;
        }

        const arr: string[] = this.arrayOfFiguresAvailableToMove.map((item: IMovePosition) => item.origin);

        return this._getChessBoardData(chessBoard, arr, this.arrayOfHighlightedCells);
    }

    @action
    public chooseOfFigure: (target: HTMLButtonElement) => void = (target) => {
        this.currentFigure = target.id;
    };

    @action
    public startNewGame: () => void = () => {
        CrudModel.request('chess', 'POST')
            .then((res: IChestPositionResponse) => {
                this._initOfChessBoard(res);
            });
    };

    @action
    public loadChessPosition: () => void = () => {
        CrudModel.request('chess', 'GET')
            .then((res: IChestPositionResponse) => {
                this._initOfChessBoard(res);
            });
    };

    @action
    public moveFigure: (target: HTMLButtonElement) => void = (target) => {
        this._moveFigureRequest(this.currentFigure, target.id);
    };

    @action
    private _initOfChessBoard: (res: IChestPositionResponse) => void = (res) => {
        this.chessBoard = Object.assign(chessBoardGenerator(), res.positionToPieces);
        this.gameOver = res.gameOver;
        if(!this.gameOver) {
            this.currentPlayer = res.currentPlayer;
            this.inCheck = res.inCheck;
        }
    };

    @action
    private _getAvailableMoves: () => void = () => {
        CrudModel.request('chess/moves', 'GET')
            .then((res: IMovePosition[]) => {
                this.arrayOfFiguresAvailableToMove = res;
            });
    };

    @action
    private _getHighlightedCells: () => void = () => {
        this.arrayOfHighlightedCells = this.arrayOfFiguresAvailableToMove
            .filter((item: IMovePosition) => item.origin === this.currentFigure)
            .map((item: IMovePosition) => item.destination);
    };

    @action
    private _getChessBoardData: (
        chessBoard: IChessBoard,
        arrOfAvailableFigures: string[],
        arrOfHighlightedCells: string[]
    ) => IChessBoard = (chessBoard, arrFigures, arrCells) => {
        return Object.keys(chessBoard).reduce((res, key) => {
            if(!res[key].type) {
                if(arrCells && arrCells.includes(key)) {
                    Object.assign(res[key], { isHighlighted: true }, { onClick: this.moveFigure } );
                }
            } else {
                const isHighlighted: boolean = arrCells && arrCells.includes(key);
                const isDisabled: boolean = !arrFigures.includes(key) && !isHighlighted;
                let onClick: { onClick: (target: HTMLButtonElement) => void } = null;
                if(!isDisabled) {
                    onClick = { onClick: this.chooseOfFigure };
                }
                if(isHighlighted) {
                    onClick = { onClick: this.moveFigure };
                }
                Object.assign(res[key], { isDisabled }, { isHighlighted }, onClick);
            }

            return res;
        }, toJS(chessBoard));
    };

    @action
    private _moveFigureRequest: (startPosition: string, endPosition: string) => void = (start, end) => {
        CrudModel.request('chess/moves', 'POST', { origin: start, destination: end })
            .then((res: IChestPositionResponse) => {
                this._initOfChessBoard(res);
                this.currentFigure = null;
            });
    }
}

const instance: ChessStore = new ChessStore();
export default {
    chessBoardStore: instance,
    startNewGame: instance.startNewGame
};