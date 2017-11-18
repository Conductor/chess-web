import { action, computed, extendObservable, observable, toJS } from 'mobx';
import CrudModel from '../../utils/CrudModel';
import { IChessBoard, IColorOfFigure } from '../../../types/chess';
import chessBoardGenerator from '../../utils/chessBoardGenerator';

interface IChestPositionResponse {
    currentPlayer: IColorOfFigure;
    inCheck: boolean;
    gameOver: boolean;
    positionToPieces: IChessBoard;
}

export class ChessStore {
    @observable
    public chessBoard: IChessBoard;

    @computed
    public get chessBoardData(): IChessBoard {
        if(!this.chessBoard) {
            return null;
        }
        const a = {a1: {isHighlighted: true}};


        return  Object.keys(a).reduce((res, key) => {
            Object.assign(res[key], a[key]);
            return res;
        }, toJS(this.chessBoard));
    }

    @action
    public startNewGame: () => void = () => {
        if(this.chessBoard && this.chessBoard.a1) {
            this.chessBoard.a1 = this.chessBoard.a1.owner === "White"
                ? {type: 'r' ,owner: 'Black'} : {type: 'r' ,owner: 'White'};
        }
    };

    @action
    public loadChessPosition: () => void = () => {
        CrudModel.request('chess', 'GET')
            .then((res: IChestPositionResponse) => {
                this.chessBoard = Object.assign(chessBoardGenerator(), res.positionToPieces);
            });
    };
}

const instance: ChessStore = new ChessStore();
export default {
    chessBoardStore: instance
};